<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>

<%
	Cookie cookie_page = new Cookie("Page_Redirect", "");
	Cookie cookie = new Cookie("MemberId", "");
	response.addCookie(cookie);
	response.addCookie(cookie_page);
%>
<script type="text/javascript">location.href = "cookie_exist_user.jsp"</script>
