<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
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
	   if (cookies != null)
	   {
	      	for (int i = 0; i < cookies.length; i++) 
		      {
			         if (cookies [i].getName().equals(cookieName))
			         {
				            myCookie = cookies[i];
				            //break;
			         }
			         if (cookies [i].getName().equals(cookiePage))
			         {
				            myPageCookie = cookies[i];
				            //break;
			         }
		      }
	   }
	   

	   	if(myCookie == null || myPageCookie == null)
		{
%>	   
			<script type="text/javascript" >location.href="mem_logon.jsp?flag=1"</script>
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
<jsp:setProperty name="newMember" property="member_id" 	value="<%= member_id %>"/>
<jsp:setProperty name="newMember" property="page_Redirect" 	value="<%= page_Redirect %>"/>
