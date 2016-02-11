package com.video.repository;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.video.model.um.user.User;


@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Integer>, QueryDslPredicateExecutor<User>{
	
	User findByUsername(String username);
	
}
