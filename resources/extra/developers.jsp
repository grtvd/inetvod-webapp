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
	<title>Developers</title>
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
			<a href="newfeatures.jsp">New Features</a><br/>
			<a href="developers.jsp" style="background-color:#7CC0E2;">Developers</a><br/></p></td>
	</tr>
	</table>

</td>
<td valign="top" class="contentBody">

	<table border="0" cellpadding="1" cellspacing="0" width="520">
		<tr>
			<td colspan="2" class="contentWithoutBorder">

				<h2>Developers</h2>

				<h3>Software Developers</h3>

				<p>From day 1, Storm has been about creating an open video platform around a set of open player APIs.
					Shortly we will be releasing those APIs allowing anyone to build a ‘player’ that can connect to the
					Storm servers.</p>

				<p>StormMediaPlayer.com is just one of the players. Our goal is to have many different types of
					players, running on all sorts of devices and platforms. A player could be a widget or a gadget, a
					plug-in for Windows Media Center, TiVo, or an open source media player, for example. A player might
					be an interface running a mobile phone, or an Internet device. Eventually, a player might be a
					module in a dedicated TV set-top box.</p>

				<p>Stay tuned…</p>

				<h3>Graphics Artists</h3>

				<p>The idea of Storm is about giving control back to the users.  It’s about allowing users to access a
					wide variety of Internet-based videos through a single user interface instead of having to navigate
					to a bunch of different sites, each with their own interfaces and own set of features.</p>

				<p>That said, we don’t think Storm is about a particular look or style.  It’s flexible enough to take on
					a variety of appearances based on a user’s preference.</p>

				<p>If you’re a graphic artist, we’re inviting you to submit your design ideas for Storm.  A future
					release of StromMediaPlayer.com will support skinning, featuring the works of the Storm
					community.</p>

				<p>Stay tuned…</p>
			</td>
		</tr>
	</table>

</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>