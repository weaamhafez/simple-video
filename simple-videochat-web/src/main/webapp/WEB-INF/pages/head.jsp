<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<link rel="shortcut icon" href="<c:url value="/images/favicon.ico"/>" type="image/x-icon">
<link rel="icon" href="<c:url value="/images/favicon.ico"/>" type="image/x-icon">

<link type="text/css" rel="stylesheet" href="<c:url value="/libs/bootstrap/css/bootstrap.min.css"/>" >
<link type="text/css" rel="stylesheet" href="<c:url value="/libs/font-awesome/css/font-awesome.css"/>" />
<link type="text/css" rel="stylesheet" href="<c:url value="/css/validation.css"/>" >
<link type="text/css" rel="stylesheet" href="<c:url value="/css/loading.css"/>" >


<c:set var="localeCode" value="${pageContext.response.locale}" />
<c:set var="rtl" value="${localeCode eq 'ar'}" />

<link href="<c:url value="/css/sb-admin.css"/>" rel="stylesheet">

<c:if test="${rtl}">
    <link href="<c:url value="/css/sb-admin-rtl.css"/>" rel="stylesheet">
</c:if>

<lang code="${pageContext.response.locale}"></lang>



<script type="text/javascript" src="<c:url value="/libs/jquery/jquery-1.11.1.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/libs/bootstrap/js/bootstrap.min.js"/>"></script>
<script src="<c:url value="/libs/jquery-validation/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/libs/jquery-validation/additional-methods.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/head.js"/>"></script>
<script type="text/javascript" src="<c:url value="/libs/bootstrap/js/bootbox.min.js"/>"></script>
<script language="JavaScript" src="<c:url value="/libs/jquery-ui/jquery-ui.min.js"/>"></script>
		<link href="<c:url value="/libs/jquery-ui/jquery-ui.min.css"/>" rel="stylesheet" type="text/css"/>
<script language="JavaScript" src="<c:url value="/libs/scriptcam/swfobject.js"/>"></script>
<script language="JavaScript" src="<c:url value="/libs/scriptcam/scriptcam.js"/>"></script>
