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
		String queryString = "&tbx_Name=" + request.getParameter("tbx_Name");
		queryString = queryString + "&tbx_Last_Name=" + request.getParameter("tbx_Last_Name");
		queryString = queryString + "&tbx_Add_1=" + request.getParameter("tbx_Add_1");
		queryString = queryString + "&tbx_Add_2=" + request.getParameter("tbx_Add_2");
		queryString = queryString + "&tbx_City=" + request.getParameter("tbx_City");
		queryString = queryString + "&tbx_State=" + request.getParameter("tbx_State");
		queryString = queryString + "&tbx_Zip=" + request.getParameter("tbx_Zip");
		queryString = queryString + "&cmb_Country=" + request.getParameter("cmb_Country");
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






