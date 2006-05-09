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

<jsp:setProperty name="newMember" property="name_on_card" 	value="<%= request.getParameter("tbx_Card_Name") %>"/>
<jsp:setProperty name="newMember" property="card_type" 		value="<%= request.getParameter("cmb_Card_Type") %>"/>
<jsp:setProperty name="newMember" property="card_number" 	value="<%= request.getParameter("tbx_Card_Number") %>"/>
<jsp:setProperty name="newMember" property="exp_month" 		value="<%= request.getParameter("cmb_Month") %>"/>
<jsp:setProperty name="newMember" property="exp_year" 		value="<%= request.getParameter("cmb_Year") %>"/>
<jsp:setProperty name="newMember" property="security_code" 	value="<%= request.getParameter("tbx_Code") %>"/>
<jsp:setProperty name="newMember" property="address_1" 		value="<%= request.getParameter("tbx_Add_1") %>"/>
<!--jsp:setProperty name="newMember" property="address_2" 		value="< %= request.getParameter("tbx_Add_2") %>"/-->
<jsp:setProperty name="newMember" property="city" 			value="<%= request.getParameter("tbx_City") %>"/>
<jsp:setProperty name="newMember" property="state" 			value="<%= request.getParameter("tbx_State") %>"/>
<jsp:setProperty name="newMember" property="zip" 			value="<%= request.getParameter("tbx_Zip") %>"/>
<jsp:setProperty name="newMember" property="country_id"		value="<%= request.getParameter("cmb_Country") %>"/>
<jsp:setProperty name="newMember" property="phone"			value="<%= request.getParameter("tbx_Phone") %>"/>

		
<%			
	String name_on_card =  request.getParameter("tbx_Card_Name");

	if(name_on_card.length() != 0 ) 
	{
		newMember.update_Card_Details(newMember.getMember_id());
		if(newMember.getError_flag())
		{
			String queryString = "&tbx_Card_Name=" + request.getParameter("tbx_Card_Name");
			queryString = queryString  + "&cmb_Card_Type=" + request.getParameter("cmb_Card_Type");
			queryString = queryString  + "&tbx_Card_Number=" + request.getParameter("tbx_Card_Number");
			queryString = queryString  + "&cmb_Month=" + request.getParameter("cmb_Month");
			queryString = queryString  + "&cmb_Year=" + request.getParameter("cmb_Year");
			queryString = queryString  + "&tbx_Code=" + request.getParameter("tbx_Code");
			queryString = queryString  + "&tbx_Add_1=" + request.getParameter("tbx_Add_1");
			//queryString = queryString  + "&tbx_Add_2=" + request.getParameter("tbx_Add_2");
			queryString = queryString  + "&tbx_City=" + request.getParameter("tbx_City");
			queryString = queryString  + "&tbx_State=" + request.getParameter("tbx_State");						
			queryString = queryString  + "&tbx_Zip=" + request.getParameter("tbx_Zip");			
			queryString = queryString  + "&cmb_Country=" + request.getParameter("cmb_Country");			
			queryString = queryString  + "&tbx_Phone=" + request.getParameter("tbx_Phone");									
%>
			<!--script type="text/javascript">location.href="error.jsp"</script-->
			<script type="text/javascript">location.href="mem_card.jsp?flag=2<%= queryString%>"</script>			
<%			
		}		
	}
	//response.sendRedirect("mem_parental.jsp");
	String redirect_Page = newMember.getPage_Redirect();	
	if(redirect_Page.equals("new"))
	{
%>
		<script type="text/javascript">location.href="mem_parental.jsp"</script>
<%
	}
%>	
	<script type="text/javascript">location.href="cookie_exist_user.jsp"</script>


