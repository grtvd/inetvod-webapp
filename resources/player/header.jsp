<%--
Copyright © 2007-2008 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.common.data.CategoryID" %>
<%@ page import="com.inetvod.webapp.PageMenuMap" %>
<%@ page import="com.inetvod.webapp.player.CategorySearchView" %>
<%@ page import="com.inetvod.webapp.player.NowPlayingView" %>
<%@ page import="com.inetvod.webapp.player.ProviderSearchView" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Storm Media Player</title>
	<link rel="stylesheet" href="../styles/style.css" type="text/css"/>
	<script type="text/javascript" src="../main.js"></script>
	<script type="text/javascript">
		function runOnLoad()
		{
			StartupInitGeneral();

			initMenu('<%=PageMenuMap.mapMenuFromPage(request.getServletPath(), request.getQueryString())%>');
			headerCheckFields();
		}
	</script>
</head>
<body onload="runOnLoad();">
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr><td width="160" height="54"><img src="../player/images/logo.gif" alt="Storm Media Player"/></td>
			<td>
				<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
					<tr><td height="27" align="right" valign="top"><table border="0" cellpadding="0" cellspacing="0"><tr>
						<td id="HeaderLogon" class="buttonSmallCtr_normal" style="display:none"><a class="buttonSmallCtr_normal"
							onclick="StartupLogon();">Logon</a></td>
						<td><a id="HeaderUser" class="buttonSmallUnderlineCtr" title="Account Overview"
							onclick="document.location='../member/mem_overview.jsp';" style="display:none"/></td>
						<td class="textSmallLbl">&nbsp;|&nbsp;</td>
						<td id="HeaderRegister" class="buttonSmallCtr_normal" style="display:none"><a class="buttonSmallCtr_normal"
							onclick="document.location='../member/mem_new.jsp';">Register</a></td>
						<td id="HeaderLogout" class="buttonSmallCtr_normal" style="display:none"><a class="buttonSmallCtr_normal"
							onclick="headerLogout()">Logout</a></td>
						</tr></table></td></tr>
					<tr><td height="27" align="left" valign="bottom"><table border="0" cellpadding="0" cellspacing="0"><tr>
						<td class="textSmallLbl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
						<td class="buttonSmallCtr_normal"><a href="../extra/addcontent.jsp"
							class="buttonSmallCtr_normal">Add Content</a></td>
						<td class="textSmallLbl">&nbsp;|&nbsp;</td>
						<td class="buttonSmallCtr_normal"><a href="../extra/newfeatures.jsp"
							class="buttonSmallCtr_normal">New Features</a></td>
						<td class="textSmallLbl">&nbsp;|&nbsp;</td>
						<td class="buttonSmallCtr_normal"><a href="../extra/developers.jsp"
							class="buttonSmallCtr_normal">Developers</a></td>
						</tr></table></td></tr>
				</table>
			</td>
		</tr>
		<tr><td height="10"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
	</table>

	<table id="AppTable" border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr>
			<td align="left" valign="top" width="170">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr><td id="NowPlaying_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="NowPlaying_Link" class="buttonCtr_normal" href="<%=NowPlayingView.buildPath()%>" onclick="onMenuClick(event, this); return true;">My Shows</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="Featured_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="Featured_Link" class="buttonCtr_normal" href="<%=SearchResultsView.buildPath(null, CategoryID.Featured)%>" onclick="onMenuClick(event, this); return true;">Featured</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="SearchByCategory_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="SearchByCategory_Link" class="buttonCtr_normal" href="<%=CategorySearchView.buildPath()%>" onclick="onMenuClick(event, this); return true;">Search By Category</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="SearchByProvider_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="SearchByProvider_Link" class="buttonCtr_normal" href="<%=ProviderSearchView.buildPath()%>" onclick="onMenuClick(event, this); return true;">Search By Provider</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="SearchByName_Row" class="buttonCtr_normal" onclick="onMenuRowClickScript(event, this, 'StartupSearch();');"><a id="SearchByName_Link" class="buttonCtr_normal" href="#" onclick="onMenuClickScript(event, this, 'StartupSearch();'); return true;">Search By Title</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="Preferences_Row" class="buttonCtr_normal" onclick="onMenuRowClickScript(event, this, 'StartupPreferences();');"><a id="Preferences_Link" class="buttonCtr_normal" href="#" onclick="onMenuClickScript(event, this, 'StartupPreferences();'); return true;">Preferences</a></td></tr>
					</tbody>
				</table>

			</td>
			<td valign="top">
				<div id="MainBodyDiv" class="mainbody" style="height:600px; overflow:auto;">
					<noscript class="error">
						This site requires JavaScript. If your browser supports JavaScript, please enable and try again...
					</noscript>
