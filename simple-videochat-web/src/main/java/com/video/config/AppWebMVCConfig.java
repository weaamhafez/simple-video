package com.video.config;

import com.video.audit.SpringSecurityAuditorAware;
import com.video.model.um.user.*;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.ImprovedNamingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.*;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.apache.commons.dbcp.BasicDataSource;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import java.util.List;
import java.util.Locale;
import java.util.Properties;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = { "com.video" })
@EnableJpaRepositories(basePackages = { "com.video.repository" })
@EnableJpaAuditing(auditorAwareRef = "springSecurityAuditorAware")
@EnableSpringDataWebSupport
@EnableTransactionManagement
@PropertySource("classpath:config.properties")
public class AppWebMVCConfig extends WebMvcConfigurerAdapter {

	
	@Autowired
	Environment env;

	@Bean
	public InternalResourceViewResolver jspViewResolver() {
		InternalResourceViewResolver bean = new InternalResourceViewResolver();
		bean.setPrefix("/WEB-INF/pages/");
		bean.setSuffix(".jsp");
		bean.setOrder(1);
		return bean;
	}


	@Bean
	public static PropertyPlaceholderConfigurer placeHolderConfigurer() {
		PropertyPlaceholderConfigurer bean = new PropertyPlaceholderConfigurer();
		bean.setLocation(new ClassPathResource("config.properties"));
		bean.setIgnoreUnresolvablePlaceholders(true);
		return bean;
	}



	@Bean()
	public DataSource dataSource() {

		String driverClassName = env.getProperty("jdbc.driverClassName");
		String databaseurl = env.getProperty("jdbc.databaseurl");
		String dbUsername = env.getProperty("jdbc.username");
		String dbPassword = env.getProperty("jdbc.password");

		BasicDataSource bean = new BasicDataSource();
		bean.setDriverClassName(driverClassName);
		bean.setUrl(databaseurl);
		bean.setUsername(dbUsername);
		bean.setPassword(dbPassword);
		bean.setValidationQuery("SELECT 1");
		bean.setTestWhileIdle(true);
		bean.setTimeBetweenEvictionRunsMillis(1000000);
		return bean;
	}

	@Bean
	public Properties hibernateProperties() {
		String dialect = env.getProperty("jdbc.dialect");

		Properties hibernateProperties = new Properties();

		hibernateProperties.setProperty("hibernate.dialect", dialect);
		hibernateProperties.setProperty("hibernate.show_sql", "true");
		hibernateProperties.setProperty("hibernate.format_sql", "true");
		hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "validate");

		return hibernateProperties;
	}

	@Autowired
	@Bean(name = "sessionFactory")
	public SessionFactory sessionFactory(DataSource dataSource,
			Properties hibernateProperties) {
		LocalSessionFactoryBuilder sessionBuilder = new LocalSessionFactoryBuilder(
				dataSource);

		sessionBuilder.addAnnotatedClasses(
				User.class);

		sessionBuilder.addProperties(hibernateProperties);
		sessionBuilder.setNamingStrategy(ImprovedNamingStrategy.INSTANCE);
		return sessionBuilder.buildSessionFactory();
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(dataSource());
		em.setPackagesToScan("com.video.model");
		em.setPersistenceUnitName("videoPersistenceUnit");
		return em;
	}

	@Bean
	public PlatformTransactionManager transactionManager(
			EntityManagerFactory emf) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(emf);

		return transactionManager;
	}

	

	@Bean
	public SpringSecurityAuditorAware springSecurityAuditorAware() {
		return new SpringSecurityAuditorAware();
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		BCryptPasswordEncoder bean = new BCryptPasswordEncoder(10);
		return bean;
	}


	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/index").setViewName("index");
		registry.addViewController("/login").setViewName("login");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/css/**").addResourceLocations("/css/");
		registry.addResourceHandler("/js/**").addResourceLocations("/js/");
		registry.addResourceHandler("/images/**").addResourceLocations(
				"/images/");
		registry.addResourceHandler("/libs/**").addResourceLocations("/libs/");
		registry.addResourceHandler("/fonts/**")
				.addResourceLocations("/fonts/");
	}

	@Override
	public void configureDefaultServletHandling(
			DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
	
	@Bean(name = "messageSource")
	public ReloadableResourceBundleMessageSource getMessageSource() {
		ReloadableResourceBundleMessageSource resource = new ReloadableResourceBundleMessageSource();
		resource.setBasename("classpath:i18n/messages");
		resource.setDefaultEncoding("UTF-8");
		resource.setFallbackToSystemLocale(true);
		return resource;
	}

	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang");
		return localeChangeInterceptor;
	}

	@Bean(name = "localeResolver")
	public LocaleResolver localeResolver() {
		CookieLocaleResolver localeResolver = new CookieLocaleResolver();
		localeResolver.setDefaultLocale(Locale.ENGLISH);
		localeResolver.setCookieName("locale");
		localeResolver.setCookieMaxAge(Integer.MAX_VALUE);
		return localeResolver;
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
	}
}