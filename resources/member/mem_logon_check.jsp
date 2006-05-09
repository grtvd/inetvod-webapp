<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<%@ page import="java.util.Date"%>
<%@ page import="java.net.*"%>

<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<%
	newMember.member_Logon_Check(request.getParameter("tbx_Email"), request.getParameter("tbx_Password"));
	String mem_id = newMember.Check_For_Null(newMember.getMember_id());
	
	//Server side exception 
	if(newMember.getError_flag())
	{
			String queryString = "&tbx_Email=" + request.getParameter("tbx_Email");
%>
				<script  type="text/javascript">location.href="mem_logon.jsp?flag=2<%= queryString%>"</script>
<%			
	}		


	if(mem_id.length() == 0 ||  mem_id.equals("")) 
	{
%>
		<script  type="text/javascript">location.href="mem_logon.jsp?flag=0"</script>
<%			
	}		
	else
	{
		Date now = new Date();
		String timestamp = now.toString();
		Cookie cookie_page = new Cookie ("Page_Redirect", "logon");			
		Cookie cookie = new Cookie ("MemberId", mem_id);
		response.addCookie(cookie);
		response.addCookie(cookie_page);		
%>
		<script  type="text/javascript">location.href="cookie_exist_user.jsp"</script>
<%			
	}
%>




