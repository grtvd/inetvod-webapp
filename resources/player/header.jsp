<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
/**
 * Copyright � 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<%@ page import="com.inetvod.webapp.PageMenuMap" %>
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
			var curMenu = '<%=PageMenuMap.mapMenuFromPage(request.getServletPath(), request.getQueryString())%>';
			if(!testStrHasLen(curMenu))
				curMenu = getCookie(gCurMenuCookie);
			if(testStrHasLen(curMenu))
				hilightMenu(curMenu + "_");
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
	</script>
</head>
<body onload="runOnLoad();">
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr><td><img src="../player/images/logo.gif" alt="Storm Media Player"/></td>
			<td align="right" valign="top">
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td class="buttonCtr_normal">Login</td>
						<td class="textSmallLbl">&nbsp;|&nbsp;</td>
						<td class="buttonCtr_normal">Register</td>
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
						<tr><td id="NowPlaying_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="NowPlaying_Link" class="buttonCtr_normal" href="nowPlaying.jsp" onclick="onMenuClick(event, this); return true;">My Shows</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="Featured_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="Featured_Link" class="buttonCtr_normal" href="searchResults.jsp?categoryid=featured" onclick="onMenuClick(event, this); return true;">Featured</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="SearchByCategory_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="SearchByCategory_Link" class="buttonCtr_normal" href="categorySearch.jsp" onclick="onMenuClick(event, this); return true;">Search By Category</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="SearchByProvider_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="SearchByProvider_Link" class="buttonCtr_normal" href="providerSearch.jsp" onclick="onMenuClick(event, this); return true;">Search By Provider</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="SearchByName_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="SearchByName_Link" class="buttonCtr_normal" href="search.jsp" onclick="onMenuClick(event, this); return true;">Search By Title</a></td></tr>
						<tr><td height="2"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
						<tr><td id="Preferences_Row" class="buttonCtr_normal" onclick="onMenuRowClick(event, this);"><a id="Preferences_Link" class="buttonCtr_normal" href="preferences.jsp" onclick="onMenuClick(event, this); return true;">Preferences</a></td></tr>
					</tbody>
				</table>

			</td>
			<td valign="top" class="mainbody" height="400">
