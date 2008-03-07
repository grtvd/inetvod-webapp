<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
/**
 * Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<jsp:useBean id="memRegister" class="com.inetvod.webapp.MemRegister" scope="request"/>
<%
	memRegister.saveCookie(response, memRegister.getPageRedirectCookie(), "logon", true);
	memRegister.saveCookie(response, memRegister.getMemberIDCookie(), request.getParameter("id"), true);
%>
<script type="text/javascript">window.location = "cookie_exist_user.jsp"</script>
