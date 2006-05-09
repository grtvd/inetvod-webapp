<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<jsp:setProperty name="newMember" property="email_id" 		value="<%= request.getParameter("hdn_email") %>"/>
<jsp:setProperty name="newMember" property="password_id" 	value="<%= request.getParameter("tbx_Password") %>"/>

<%
	newMember.member_Password_Reset();
	if(newMember.getError_flag())
	{
%>
			<script  type="text/javascript">location.href="error.jsp"</script>
<%			
	}		
%>
	<script  type="text/javascript">location.href="mem_logon.jsp?flag=3"</script>




