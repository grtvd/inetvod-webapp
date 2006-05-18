<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>

<%
	String member_id = "";
	String page_Redirect = "";
	String cookieName = "MemberId";
	String cookiePage = "Page_Redirect";
	Cookie cookies [] = request.getCookies();
	Cookie myCookie = null;
	Cookie myPageCookie = null;
	if(cookies != null)
	{
		for(Cookie cookie : cookies)
		{
			if(cookie.getName().equals(cookieName))
			{
				myCookie = cookie;
				//break;
			}
			if(cookie.getName().equals(cookiePage))
			{
				myPageCookie = cookie;
				//break;
			}
		}
	}


	if(myCookie == null || myPageCookie == null)
	{
%>
<script type="text/javascript">location.href = "mem_logon.jsp?flag=1"</script>
<%
	}
	else
	{
		page_Redirect = myPageCookie.getValue();
		member_id = myCookie.getValue();
	}

//System.out.println("-------------Cookie ----------- "+ member_id);
%>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<jsp:setProperty name="newMember" property="member_id" value="<%= member_id %>"/>
<jsp:setProperty name="newMember" property="page_Redirect" value="<%= page_Redirect %>"/>
