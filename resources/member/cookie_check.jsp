<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
 * Copyright © 2006-2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.inetvod.common.core.StrUtil" %>
<%@ page import="com.inetvod.common.data.CategoryID" %>
<%@ page import="com.inetvod.common.data.MemberID" %>
<%@ page import="com.inetvod.playerClient.rqdata.Category" %>
<%@ page import="com.inetvod.playerClient.rqdata.CategoryList" %>
<%@ page import="com.inetvod.playerClient.rqdata.Provider" %>
<%@ page import="com.inetvod.playerClient.rqdata.ProviderList" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearchList" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearchList" %>
<%@ page import="com.inetvod.webapp.MemRegister" %>
<%@ page import="com.inetvod.webapp.PageMenuMap" %>
<%@ page import="com.inetvod.webapp.ReadXMLFile" %>
<%@ page import="com.inetvod.webapp.player.CategorySearchView" %>
<%@ page import="com.inetvod.webapp.player.NowPlayingView" %>
<%@ page import="com.inetvod.webapp.player.ProviderSearchView" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>

<jsp:useBean id="memRegister" class="com.inetvod.webapp.MemRegister" scope="request"/>
<%
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); //prevents caching at the proxy server

	HashMap<String, String> cookieMap = memRegister.parseCookies(request);

	String member_id = cookieMap.get(memRegister.getMemberIDCookie());
	String page_Redirect = cookieMap.get(memRegister.getPageRedirectCookie());
	String userID = cookieMap.get(memRegister.getUserIDCookie());
	String password = cookieMap.get(memRegister.getUserPasswordCookie());

	boolean goLogon = true;
	if(StrUtil.hasLen(member_id) && StrUtil.hasLen(page_Redirect))
		goLogon = false;
	else if(!StrUtil.hasLen(member_id))
	{
		if(StrUtil.hasLen(userID) && StrUtil.hasLen(password))
		{
			MemberID memberID = memRegister.member_Session_Check(userID, password);
			if(memberID != null)
			{
				goLogon = false;
%>
<script type="text/javascript">location.replace("cookie_auto_logon.jsp?id=<%=memberID.toString()%>")</script>
<%
			}
		}
	}

	if(goLogon)
	{
%>
<script type="text/javascript">location.href = "mem_logon.jsp"</script>
<%
	}

//System.out.println("-------------Cookie ----------- "+ member_id);
%>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<jsp:setProperty name="newMember" property="member_id" value="<%= member_id %>"/>
<jsp:setProperty name="newMember" property="page_Redirect" value="<%= page_Redirect %>"/>
