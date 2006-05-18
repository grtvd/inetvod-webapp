<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>

<%
	String cookieName = "MemberId";
	Cookie cookies [] = request.getCookies();
	Cookie myCookie = null;
	if(cookies != null)
	{
		for(int i = 0; i < cookies.length; i++)
		{
			if(cookies[i].getName().equals(cookieName))
			{
				myCookie = cookies[i];
				break;
			}
		}
	}

	if(myCookie != null)
	{
		myCookie.setMaxAge(0);
		response.addCookie(myCookie);
	}
%>
