<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>
<%
	String cookiePage = "Page_Redirect";
	Cookie cookies [] = request.getCookies();
	Cookie myPageCookie = null;
	if(cookies != null)
	{
		for(Cookie cookie : cookies)
		{
			if(cookie.getName().equals(cookiePage))
			{
				myPageCookie = cookie;
				myPageCookie.setValue("logon");
				response.addCookie(myPageCookie);
				break;
			}
		}
	}

	//if(cookie_value.equals("new"))
	response.sendRedirect("mem_overview.jsp");
%>