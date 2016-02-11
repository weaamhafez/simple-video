
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<html>
<head>
    <jsp:include page="./head.jsp"/>
    <script type="text/javascript" src="<c:url value="/js/modules/login/login.js"/>"></script>
    <style type="text/css">
   /*    --------------------------------------------------
	:: Login Section
	-------------------------------------------------- */
	#login {
	    padding-top: 50px
	}
	#login .form-wrap {
	    width: 30%;
	    margin: 0 auto;
	}
	#login h1 {
	    color: #1fa67b;
	    font-size: 18px;
	    text-align: center;
	    font-weight: bold;
	    padding-bottom: 20px;
	}
	#login .form-group {
	    margin-bottom: 25px;
	}
	#login .checkbox {
	    margin-bottom: 20px;
	    position: relative;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    -o-user-select: none;
	    user-select: none;
	}
	#login .checkbox.show:before {
	    content: '\e013';
	    color: #1fa67b;
	    font-size: 17px;
	    margin: 1px 0 0 3px;
	    position: absolute;
	    pointer-events: none;
	    font-family: 'Glyphicons Halflings';
	}
	#login .checkbox .character-checkbox {
	    width: 25px;
	    height: 25px;
	    cursor: pointer;
	    border-radius: 3px;
	    border: 1px solid #ccc;
	    vertical-align: middle;
	    display: inline-block;
	}
	#login .checkbox .label {
	    color: #6d6d6d;
	    font-size: 13px;
	    font-weight: normal;
	}
	#login .btn.btn-custom {
	    font-size: 14px;
		margin-bottom: 20px;
	}
	#login .forget {
	    font-size: 13px;
		text-align: center;
		display: block;
	}
	
	/*    --------------------------------------------------
		:: Inputs & Buttons
		-------------------------------------------------- */
	.form-control {
	    color: #212121;
	}
	.btn-custom {
	    color: #fff;
		background-color: #1fa67b;
	}
	.btn-custom:hover,
	.btn-custom:focus {
	    color: #fff;
	}
	
	/*    --------------------------------------------------
	    :: Footer
		-------------------------------------------------- */
	#footer {
	    color: #6d6d6d;
	    font-size: 12px;
	    text-align: center;
	}
	#footer p {
	    margin-bottom: 0;
	}
	#footer a {
	    color: inherit;
	}

		body {
			background-color: #fff !important;
		}
    </style>
</head>
<body>
	<section id="login">
    <div class="container">
     	<div class="row">
          <div class="col-lg-12">
            <h1 class="page-header">
            </h1>


          </div>
        </div>
    	<div class="row">
    	    <div class="col-xs-12">
        	    <div class="form-wrap">
                <h1><s:message code="login.subject"/></h1>
                    <form id="loginForm" action="<c:url value='/j_spring_security_check' />" method="POST" novalidate="novalidate" autocomplete="off">
                    	<c:if test="${error}">
	                    	<div class="alert alert-danger" role="alert">
							  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							  <span class="sr-only"><s:message code="login.error"/></span>
								<s:message code="login.invalid.username.or.password"/>
							</div>
						</c:if>
                        <div class="form-group">
                            <label for="email" class="sr-only"><s:message code="login.user.name"/></label>
                            <input type="text" name="j_username" id="username" class="form-control" placeholder="Username" name="j_username" required="">
                        </div>
                        <div class="form-group">
                            <label for="key" class="sr-only"><s:message code="login.password"/></label>
                            <input type="password" placeholder="Password" required="" class="form-control" id="password" name="j_password" />
                        </div>
                        <div class="checkbox">
                            <span class="character-checkbox" onclick="showPassword()"></span>
                            <span class="label"><s:message code="login.show.password"/></span>
                        </div>
                        <input type="submit" id="btn-login" class="btn btn-custom btn-lg btn-block" value="Log in">
                    </form>
                    <hr>
        	    </div>
    		</div> <!-- /.col-xs-12 -->
    	</div> <!-- /.row -->
    </div> <!-- /.container -->
</section>
</body>
</html>