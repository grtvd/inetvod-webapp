<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * Confidential and Proprietary
	 * See Legal.txt for additional notices.
	 */
%>
<jsp:include flush="true" page="cookie_check.jsp"/>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<%
	String str_adult_pin = request.getParameter("tbx_Adult_Pin");
	if(str_adult_pin == null)
		str_adult_pin = "";

	String str_date = request.getParameter("tbx_Date");
	if(str_date == null)
		str_date = "";

%>

<jsp:setProperty name="newMember" property="include_adult" value="<%= request.getParameter("rbtn_Adult") %>"/>
<jsp:setProperty name="newMember" property="adult_pin" value="<%= str_adult_pin %>"/>
<jsp:setProperty name="newMember" property="birth_date" value="<%= str_date %>"/>
<jsp:setProperty name="newMember" property="rating" value="<%= request.getParameterValues("cbx_Rating") %>"/>
<%

	newMember.update_Parental_Details(newMember.getMember_id());
	if(newMember.getError_flag())
	{
		String ratings = "";
		String [] str_Arr = request.getParameterValues("cbx_Rating");

		for(String item : str_Arr)
		{
			ratings = ratings + "," + item;
		}

		ratings += ",";

		String queryString = "&rbtn_Adult=" + request.getParameter("rbtn_Adult");
		queryString = queryString + "&tbx_Adult_Pin=" + str_adult_pin;
		queryString = queryString + "&tbx_Date=" + str_date;
		queryString = queryString + "&cbx_Rating=" + ratings;
%>
<!--script type="text/javascript">location.href="error.jsp"</script-->
<script type="text/javascript">location.href = "mem_parental.jsp?flag=2<%= queryString%>"</script>
<%
	}

	String redirect_Page = newMember.getPage_Redirect();
	if("new".equals(redirect_Page))
	{
%>
<script type="text/javascript">location.href = "mem_logon_update.jsp"</script>
<%
	}

%>
<script type="text/javascript">location.href = "cookie_exist_user.jsp"</script>


