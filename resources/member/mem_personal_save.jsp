<%@ page import="java.net.URLEncoder"%>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>
<jsp:include flush="true" page="cookie_check.jsp"/>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<jsp:setProperty name="newMember" property="first_name" value="<%= request.getParameter("tbx_Name") %>"/>
<jsp:setProperty name="newMember" property="last_name" value="<%= request.getParameter("tbx_Last_Name") %>"/>
<jsp:setProperty name="newMember" property="address_1" value="<%= request.getParameter("tbx_Add_1") %>"/>
<jsp:setProperty name="newMember" property="address_2" value="<%= request.getParameter("tbx_Add_2") %>"/>
<jsp:setProperty name="newMember" property="city" value="<%= request.getParameter("tbx_City") %>"/>
<jsp:setProperty name="newMember" property="state" value="<%= request.getParameter("tbx_State") %>"/>
<jsp:setProperty name="newMember" property="zip" value="<%= request.getParameter("tbx_Zip") %>"/>
<jsp:setProperty name="newMember" property="country_id" value="<%= request.getParameter("cmb_Country") %>"/>

<%
	newMember.update_Personal_Info(newMember.getMember_id());
	if(newMember.getError_flag())
	{
		String queryString = "&tbx_Name=" + URLEncoder.encode(request.getParameter("tbx_Name"), "UTF-8");
		queryString = queryString + "&tbx_Last_Name=" + URLEncoder.encode(request.getParameter("tbx_Last_Name"), "UTF-8");
		queryString = queryString + "&tbx_Add_1=" + URLEncoder.encode(request.getParameter("tbx_Add_1"), "UTF-8");
		queryString = queryString + "&tbx_Add_2=" + URLEncoder.encode(request.getParameter("tbx_Add_2"), "UTF-8");
		queryString = queryString + "&tbx_City=" + URLEncoder.encode(request.getParameter("tbx_City"), "UTF-8");
		queryString = queryString + "&tbx_State=" + URLEncoder.encode(request.getParameter("tbx_State"), "UTF-8");
		queryString = queryString + "&tbx_Zip=" + URLEncoder.encode(request.getParameter("tbx_Zip"), "UTF-8");
		queryString = queryString + "&cmb_Country=" + URLEncoder.encode(request.getParameter("cmb_Country"), "UTF-8");
%>
<!--script type="text/javascript">location.href="error.jsp"</script-->
<script type="text/javascript">location.href = "mem_personal.jsp?flag=2<%= queryString%>"</script>
<%
	}

	String redirect_Page = newMember.getPage_Redirect();
	if("new".equals(redirect_Page))
	{
%>
<script type="text/javascript">location.href = "mem_card.jsp"</script>
<%
	}
%>
<script type="text/javascript">location.href = "cookie_exist_user.jsp"</script>






