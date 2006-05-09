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

<%
	newMember.member_Password_Update(newMember.getMember_id(), request.getParameter("tbx_Exist_Password"), request.getParameter("tbx_Password") );
	if(newMember.getError_flag())
	{
%>
			<!--script  type="text/javascript">location.href="error.jsp"</script-->
			<script  type="text/javascript">location.href="mem_password.jsp?flag=2"</script>			
<%			
	}		
	
	boolean flag = newMember.getFlag();
	if(flag)
	{
%>
	<script  type="text/javascript">location.href="cookie_exist_user.jsp"</script>
<%		
	}
	else
	{
%>
	<script  type="text/javascript">location.href="mem_password.jsp?flag=0"</script>
<%		
	}
%>



