<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<html>
<head>
  <jsp:include page="head.jsp"/>
  <script type="text/javascript">
  	var path = '<c:url value="/libs/scriptcam/"/>';
  	var userName = '<sec:authentication property="principal.username" />';
  </script>
  <script language="JavaScript" src="<c:url value="/js/modules/scriptcam/utils.js"/>"></script>
  
  	<style>
			#webcam {
				float:left;
			}
			#volumeMeter {
				background-image:url('<c:url value="/libs/scriptcam/ledsbg.png"/>');
				width:19px;
				height:133px;
				padding-top:5px;
			}
			#volumeMeter img {
				padding-left:4px;
				padding-top:1px;
				display:block;
			}
			.ui-slider {
				background:none;
				background-image:url('<c:url value="/libs/scriptcam/trackslider.png"/>');
				border:0;
				height:107px;
				margin-top:16px;
			}
			.ui-slider .ui-slider-handle {
				width:14px;
				height:32px;
				margin-left:7px;
				margin-bottom:-16px;
				background:url('<c:url value="/libs/scriptcam/volumeslider.png"/>') no-repeat; 
			}
			#volumePanel {
				-moz-border-radius: 0px 5px 5px 0px;
				border-radius: 0px 5px 5px 0px;
				background-color:#4B4B4B;
				width:55px;
				height:160px;
				-moz-box-shadow: 0px 3px 3px #333333;
				-webkit-box-shadow: 0px 3px 3px  #333333;
				shadow: 0px 3px 3px #333333;
			}
			#setupPanel {
				width:400px;
				height:30px;
				margin:5px;
			}
		</style>
</head>
<body>
  <div id="wrapper">
    <div id="page-wrapper">
      <div class="container-fluid">
        <!-- Page Heading -->
        <div class="row">
        	<div id="webcam">
		</div>
		<div id="volumePanel" style="float:left;position:relative;top:10px;">
			<div id="volumeMeter" style="position:absolute;top:10px;left:7px;float:left;">
				<img id="LedBar32" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar31" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar30" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar29" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar28" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar27" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar26" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar25" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar24" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar23" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar22" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar21" src="<c:url value="/libs/scriptcam/ledred.png"/>">
				<img id="LedBar20" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar19" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar18" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar17" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar16" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar15" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar14" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar13" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar12" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar11" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar10" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar9" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar8" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar7" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar6" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar5" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar4" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar3" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar2" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
				<img id="LedBar1" src="<c:url value="/libs/scriptcam/ledgreen.png"/>">
			</div>
			<div id="slider" style="position:absolute;top:10px;left:30px;">
			</div>
		</div>
		<br clear="both"/>
		<div id="setupPanel">
			<img src="<c:url value="/libs/scriptcam/webcamlogo.png"/>" style="vertical-align:text-top"/>
			<select id="cameraNames" size="1" onChange="changeCamera()" style="width:145px;font-size:10px;height:25px;">
			</select>
			<img src="<c:url value="/libs/scriptcam/miclogo.png"/>" style="vertical-align:text-top"/>
			<select id="microphoneNames" size="1" onChange="changeMicrophone()" style="width:128px;font-size:10px;height:25px;">
			</select>
		</div>
		<div id="chatWindow"></div>
		<input type="text" id="message" style="width:635px;">
          </div>
          <br/>
			<button id="recordStartButton" class="btn btn-small" onclick="startRecording()" disabled>Start Recording</button>&nbsp;
			<span style="padding-left:5px;padding-right:5px;">
			Time left:
			<input type="text" id="timeLeft" style="width:50px;font-size:10px;">&nbsp;
			</span>
			<button id="recordPauseResumeButton" class="btn btn-small" onclick="pauseResumeCamera()" disabled>Pause Recording</button>
			<button id="recordStopButton" class="btn btn-small" onclick="closeCamera()" disabled>Stop Recording</button>
    </div>

  </div>
</body>
</html>
