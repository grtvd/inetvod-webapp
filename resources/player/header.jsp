<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
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
			var curMenu = getCookie(gCurMenuCookie);
			if(testStrHasLen(curMenu))
			{
				hilightMenu(curMenu + "_");
			}
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
		function onMenuClick(oItem)
		{
			hilightMenu(oItem.id);
		}
	</script>
</head>
<body onload="runOnLoad();">
	<table cellpadding="0" cellspacing="0" border="0"><tr><td valign="bottom"><h1><i>Storm</i></h1></td><td valign="bottom"><h6>media player</h6></td></tr></table>

	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr>
			<td align="left" valign="top" width="170">
				<table cellpadding="5" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr><td id="NowPlaying_Row" class="lhm_normal"><a id="NowPlaying_Link" class="lhm_normal" href="nowPlaying.jsp" onclick="onMenuClick(this); return true;">My Shows</a></td></tr>
						<tr><td id="Featured_Row" class="lhm_normal"><a id="Featured_Link" class="lhm_normal" href="searchResults.jsp" onclick="onMenuClick(this); return true;">Featured</a></td></tr>
						<tr><td id="SearchByCategory_Row" class="lhm_normal"><a id="SearchByCategory_Link" class="lhm_normal" href="categorySearch.jsp" onclick="onMenuClick(this); return true;">Search By Category</a></td></tr>
						<tr><td id="SearchByProvider_Row" class="lhm_normal"><a id="SearchByProvider_Link" class="lhm_normal" href="providerSearch.jsp" onclick="onMenuClick(this); return true;">Search By Provider</a></td></tr>
						<tr><td id="SearchByName_Row" class="lhm_normal"><a id="SearchByName_Link" class="lhm_normal" href="search.jsp" onclick="onMenuClick(this); return true;">Search By Title</a></td></tr>
						<tr><td id="Preferences_Row" class="lhm_normal"><a id="Preferences_Link" class="lhm_normal" href="preferences.jsp" onclick="onMenuClick(this); return true;">Preferences</a></td></tr>
					</tbody>
				</table>

			</td>
			<td valign="top" class="mainbody">
