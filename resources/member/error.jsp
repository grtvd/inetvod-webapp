<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
 * Copyright � 2006-2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<jsp:setProperty name="newMember" property="error_flag" value="false"/>

<html>
<head>
	<title>Error</title>
	<link href="../styles/style.css" rel="stylesheet" type="text/css"/>
	<link href="../omnie.css" rel="stylesheet" type="text/css"/>
	<style type="text/css">
		<!--
		.style1 {
			font-size: 14px;
			font-weight: bold;
		}

		-->
	</style>
</head>

<body>
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

	<table border="0" cellpadding="0" cellspacing="0" width="760">
		<tr>
			<td align="left" valign="top" class="leftside" width="222">
				<jsp:include flush="true" page="../includes/left_navigation.jsp?page=Logon"/>
			</td>
			<td valign="top" class="contentWithoutBorder">
				<form action="#" method="post" name="inet">
					<noscript class="error">
						This site requires JavaScript. If your browser supports JavaScript, please enable and try again...
					</noscript>
					<table border="0" cellpadding="1" cellspacing="0" width="100%" id="tbl_Register">
						<tr valign="top">
							<td><h2>Error</h2></td>
						</tr>
						<tr valign="top">
							<td class="contentRed style1">An error has occurred.... Please try later </td>
						</tr>
						<tr>
							<td valign="baseline">&nbsp;</td>
						</tr>
						<tr>
							<td valign="baseline"><input type="button" value="Logon"
								onClick="location.href='mem_logon.jsp'" name="btn_Cancel"/></td>
						</tr>
					</table>
				</form>
			</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
