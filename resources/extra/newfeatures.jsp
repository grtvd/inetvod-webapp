<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
/**
 * Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>New Features</title>
	<link href="../styles/style.css" rel="stylesheet" type="text/css"/>
	<link href="../omnie.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="../main.js"></script>
	<script type="text/javascript">
		function runOnLoad()
		{
			MainApp.getThe().init();
			MainApp.getThe().getSession().loadDataSettings();
			headerCheckFields();
		}
	</script>
</head>
<body onload="runOnLoad();">
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

<table border="0" cellpadding="0" cellspacing="0" width="760">
<tr><td align="left" valign="top" class="leftside" width="222">

	<table border="0" cellpadding="0" cellspacing="0" width="200">
	<tr>
		<td class="menuboxtop" align="left" valign="middle">Content</td>
	</tr>
	<tr>
		<td class="menubox"><p><a href="addcontent.jsp">Add Content</a><br/>
			<a href="newfeatures.jsp" style="background-color:#7CC0E2;">New Features</a><br/>
			<a href="developers.jsp">Developers</a><br/></p></td>
	</tr>
	</table>

</td>
<td valign="top" class="contentBody">

	<table border="0" cellpadding="1" cellspacing="0" width="520">
		<tr>
			<td colspan="2" class="contentWithoutBorder">

				<h2>New Features</h2>

				<p>Coming Soon!</p>

			</td>
		</tr>
	</table>

</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>