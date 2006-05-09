<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:include flush="true" page="cookie_check.jsp" />
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<jsp:setProperty name="newMember" property="pin" 	value="<%= request.getParameter("tbx_Pin")==null?"":request.getParameter("tbx_Pin") %>"/>
<%
	newMember.Player_Logon_Pin_Update(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
		<!--script  type="text/javascript">location.href="error.jsp"</script-->
		<script  type="text/javascript">location.href="mem_logon_update.jsp?flag=2"</script>			
<%			
	}		
%>
	<script  type="text/javascript">location.href="cookie_exist_user.jsp"</script>


