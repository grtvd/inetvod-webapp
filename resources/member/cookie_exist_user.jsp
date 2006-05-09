<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%
	   String cookiePage = "Page_Redirect";
	   Cookie cookies [] = request.getCookies();
	   Cookie myPageCookie = null;	   
	   if (cookies != null)
	   {
	      	for (int i = 0; i < cookies.length; i++) 
		      {
			         if (cookies [i].getName().equals(cookiePage))
			         {
						 	myPageCookie = cookies[i];
							myPageCookie.setValue("logon");
							response.addCookie(myPageCookie);	
				            break;
			         }
		      }
	   }
	   
	   //if(cookie_value.equals("new"))
	   response.sendRedirect("mem_overview.jsp"); 
%>