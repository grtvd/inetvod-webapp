<%--
Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
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
		var gCurMenuCookie = "curMenu";
		function runOnLoad()
		{
			MainApp.getThe().init();
			MainApp.getThe().getSession().loadDataSettings();

			var curMenu = '<%=PageMenuMap.mapMenuFromPage(request.getServletPath(), request.getQueryString())%>';
			if(!testStrHasLen(curMenu))
				curMenu = getCookie(gCurMenuCookie);
			if(testStrHasLen(curMenu))
				hilightMenu(curMenu + "_");

			headerCheckFields();
		}
		function hilightMenu(rowID)
		{
			rowID = buildClassName(rowID, "Row");
			var oRow = document.getElementById(rowID);
			if(oRow)
				checkClassName(oRow, "hilite");
			rowID = buildClassName(rowID, "Link");
			var oLink = document.getElementById(rowID);
			if(oLink)
				checkClassName(oLink, "hilite");

			deleteCookie(gCurMenuCookie);
			setCookie(gCurMenuCookie, getClassNameBase(rowID), true);
		}
		function onMenuClick(evt, oItem)
		{
			hilightMenu(oItem.id);
			stopEventPropagation(evt);
		}
		function onMenuRowClick(evt, oItem)
		{
			var linkID = buildClassName(oItem.id, "Link");
			var oLink = document.getElementById(linkID);
			if(oLink)
			{
				hilightMenu(oItem.id);
				stopEventPropagation(evt);
				document.location = oLink.href;
			}
		}
		function headerCheckFields()
		{
			var oMainApp = MainApp.getThe();
			var oSession = oMainApp.getSession();
			var guestAccess = oSession.isGuestAccess();

			var oUIObj = document.getElementById("HeaderLogon")
			setStyleDisplay(oUIObj, guestAccess);

			oUIObj = document.getElementById("HeaderUser");
			oUIObj.innerHTML = (guestAccess || !oSession.haveUserID()) ? "" : oSession.getUserID();

			oUIObj = document.getElementById("HeaderRegister");
			setStyleDisplay(oUIObj, guestAccess);

			oUIObj = document.getElementById("HeaderLogout");
			setStyleDisplay(oUIObj, !guestAccess);
		}
		function headerLogout()
		{
			var oMainApp = MainApp.getThe();
			var oSession = oMainApp.getSession();
			oSession.resetDataSettings();
			oMainApp.reset();

			document.location = "index.jsp";
		}
	</script>
</head>
<body onload="runOnLoad();">
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr><td><img src="../player/images/logo.gif" alt="Storm Media Player"/></td>
			<td align="right" valign="top">
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td id="HeaderLogon" style="display:none"><a class="linkCtr">Logon</a></td>
						<td id="HeaderUser" class="textCtr"></td>
						<td class="textSmallLbl">&nbsp;|&nbsp;</td>
						<td id="HeaderRegister" style="display:none"><a class="linkCtr" href="../member/mem_new.jsp">Register</a></td>
						<td id="HeaderLogout" style="display:none"><a class="linkCtr" onclick="headerLogout()">Logout</a></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr><td height="10"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
	</table>

	<table border="0" cellpadding="0" cellspacing="0" width="100%">
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
						<tr><td id="SearchByName_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="SearchByName_Link" class="buttonCtr_normal" href="search.jsp" onclick="onMenuClick(event, this); return true;">Search By Title</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="Preferences_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="Preferences_Link" class="buttonCtr_normal" href="preferences.jsp" onclick="onMenuClick(event, this); return true;">Preferences</a></td></tr>
					</tbody>
				</table>

			</td>
			<td valign="top" class="mainbody" height="400">
