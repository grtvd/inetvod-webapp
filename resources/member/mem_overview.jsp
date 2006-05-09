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
	newMember.overView_Details(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
			<script  type="text/javascript">location.href="error.jsp"</script>
<%			
	}	
%>

<html>
<head>
<title>Account Overview</title>
<link rel="stylesheet" href="../twc615.css" type="text/css" />
<link href="../omnie.css" rel="stylesheet" type="text/css" />
<script src="../includes/form_validations.js" type="text/javascript"></script>
</head>
<body>
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

  <table border="0" cellpadding="0" cellspacing="0" width="760">
    <tr>
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=over"/>  
      </td>
      <td valign="top" class="contentWithoutBorder"><form action="mem_logon_update.jsp"  method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register" style="display:none " >
            <tr valign="top">
              <td colspan="4"><h2>Account Overview</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" align="left" class="linkHeading" >Registration Information </td>
              <td colspan="2" align="left" class="linkHeading"><a href="mem_logon_update.jsp">:: Player Logon</a></td>
            </tr>
            <tr valign="top">
              <td width="101" align="right" ><font size="2">Email</font></td>
              <td width="170" align="left" ><font size="2">&nbsp;&nbsp;<%= newMember.getEmail_id() %>&nbsp;&nbsp;<a href="mem_email.jsp">update</a></font></td>
              <td width="91" align="right"><font size="2">Logon ID</font></td>
              <td width="158" align="left"><font size="2">&nbsp;&nbsp;<%= newMember.getPlayer_logon()%></font></td>
            </tr>
            <tr valign="top">
              <td align="right"><font size="2">Password</font></td>
              <td align="left"><font size="2">&nbsp;&nbsp;<a href="mem_password.jsp">update</a></font></td>
              <td colspan="2" align="right">&nbsp;</td>
            </tr>
            <tr valign="top">
              <td colspan="2" align="center" >&nbsp;</td>
              <td colspan="2" align="left">&nbsp;</td>
            </tr>
            <tr valign="top">
              <td colspan="2" align="left" class="linkHeading"><a href="mem_personal.jsp" >:: Personal Information</a></td>
              <td colspan="2" align="left" class="linkHeading"><a href="mem_parental.jsp">:: Parental Controls</a></td>
            </tr>
            <tr valign="top">
              <td width="101" align="right" ><font size="2">Name</font></td>
              <td align="left" ><font size="2">&nbsp;&nbsp;<%= newMember.Check_For_Null(newMember.getFirst_name())%></font></td>
              <td colspan="2" rowspan="2" align="left"><font size="2">&nbsp;&nbsp;&nbsp;Some Ratings <%= newMember.getInclude_adult() %></font></td>
            </tr>
            
            <tr valign="top">
              <td align="right"><font size="2">Address</font></td>
              <td align="left"><font size="2">&nbsp;&nbsp;<%= newMember.Check_For_Null(newMember.getAddress_1()) %></font></td>
            </tr>
            <tr valign="top">
              <td colspan="2" align="right">&nbsp;</td>
              <td colspan="2" align="left">&nbsp;</td>
            </tr>
            
            <tr valign="top">
              <td colspan="2" class="linkHeading"><a href="mem_card.jsp" >:: Credit Card Information</a></td>
              <td colspan="2" class="linkHeading"><a href="mem_content.jsp" >:: Content Formats</a></td>
            </tr>
            <tr valign="top">
              <td align="right" ><font size="2">Name</font></td>
              <td ><font size="2">&nbsp;&nbsp;<%= newMember.Check_For_Null(newMember.getName_on_card()) %></font></td>
              <td colspan="2"><font size="2">&nbsp;&nbsp;&nbsp;<%= newMember.Check_For_Null(newMember.getParental_details()) %></font></td>
            </tr>
            <tr valign="top">
              <td align="right"><font size="2">Card</font></td>
              <td ><font size="2">&nbsp;&nbsp;<%= newMember.Check_For_Null(newMember.getCard_number())%></font></td>
              <td colspan="2">&nbsp;</td>
            </tr>
          </table>
      </form>
  </td></tr></table>
</div>
<script type="text/javascript">

// If Javascript is enabled then display the content of the page
document.getElementById("tbl_Register").style.display = "inline"
</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
