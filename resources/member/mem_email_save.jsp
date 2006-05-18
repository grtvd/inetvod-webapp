<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>
<jsp:include flush="true" page="cookie_check.jsp"/>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<jsp:setProperty name="newMember" property="email_id" value="<%= request.getParameter("tbx_Email") %>"/>
<%
	newMember.member_Email_Id_Update(newMember.getMember_id());
	String queryString = "&tbx_Email=" + request.getParameter("tbx_Email");

	if(newMember.getError_flag())
	{
%>
<!--script type="text/javascript">location.href="error.jsp"</script-->
<script type="text/javascript">location.href = "mem_email.jsp?flag=2<%= queryString%>"</script>
<%
	}

	if(newMember.getEmail_Exist_Flag())
	{
%>
<script type="text/javascript">location.href = "mem_email.jsp?flag=1<%= queryString%>"</script>
<%
		return;
	}
%>
<script type="text/javascript">location.href = "cookie_exist_user.jsp"</script>


