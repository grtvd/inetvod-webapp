<%@ page import="com.inetvod.common.core.StrUtil"%>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>

<%
	String member_id = null;
	String page_Redirect = null;
	String cookieName = "MemberId";
	String cookiePage = "Page_Redirect";
	Cookie cookies [] = request.getCookies();
	if(cookies != null)
	{
		for(Cookie cookie : cookies)
		{
			if(cookie.getName().equals(cookieName))
			{
				member_id = cookie.getValue();
				//break;
			}
			if(cookie.getName().equals(cookiePage))
			{
				page_Redirect = cookie.getValue();
				//break;
			}
		}
	}


	if(!StrUtil.hasLen(member_id) || !StrUtil.hasLen(page_Redirect))
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
