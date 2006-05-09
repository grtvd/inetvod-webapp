<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<%
	String queryString = "&tbx_Email=" + request.getParameter("tbx_Email");
	newMember.member_Email_Id_Check(request.getParameter("tbx_Email"));
	if(newMember.getError_flag())
	{
%>
			<script  type="text/javascript">location.href="error.jsp"</script>
<%			
			return;
	}		
	
	String [] str_Quest_Ans = newMember.getQuest_ans();

	if( str_Quest_Ans[0].length() == 0 || str_Quest_Ans[0].equals(""))
		response.sendRedirect("mem_reset_email.jsp?flag=0" + queryString);
%>
<html>
<head>
<title>Reset Logon Password</title>
<link rel="stylesheet" href="../twc615.css" type="text/css" />
<link href="../omnie.css" rel="stylesheet" type="text/css" />
<script src="../includes/form_validations.js" type="text/javascript"></script>
<script type="text/javascript">
//Method for Form field validations
function Call_Validator()
{
	var objButton = document.getElementById("btn_Continue");
	objButton.disabled = true; 
	//On submit will hide all the error messages 
	Hide_All_Error_Messages();

	//Set default value as true
	var validated = true
	
	//Condition to check of any validation fails and will display the error message 
	if (
			CheckForBlank(document.getElementById("tbx_Answer"), document.getElementById("err_Answer"), "Answer is a required field and must be entered ") == false
		)
	{
		validated = false;
		objButton.disabled = false;
	}
	//If there is no error then will return true 	
	if(validated)
		document.inet.submit(); 
		
	event.returnValue=false;		
}
</script>

</head>
<body>
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

  <table border="0" cellpadding="0" cellspacing="0" width="760">
    <tr>
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=Logon"/>  
      </td>
      <td valign="top" class="contentWithoutBorder"><form action="mem_reset_password.jsp" method="post" name="inet">
	  <input type="hidden" name="tbx_Email" value="<%= request.getParameter("tbx_Email")%>" />
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register" >
            <tr valign="top">
              <td colspan="3"><h2><Reset Logon Password></h2></td>
            </tr>
            <tr valign="top">
              <td colspan="3" class="contentWithoutBorder" >Please answer the following question to reset your password :</td>
            </tr>
            <tr valign="top">
              <td colspan="3" align="right" >&nbsp;</td>
            </tr>
            <tr valign="top">
              <td align="right" >&nbsp;</td>
              <td colspan="2" align="left" ><font size="2"><strong><%= str_Quest_Ans[0] %> ?</strong>&nbsp;</font></td>
            </tr>
            <tr valign="top">
              <td width="84" align="right" >&nbsp;</td>
              <td colspan="2" align="left" >
                  <input type="text" id="tbx_Answer" name="tbx_Answer" size="32" maxlength="32" />
                  <div id="err_Answer" style="display:none" class="contentRed"></div>                <br /></td>
            </tr>

            
            <tr>
              <td colspan="2" valign="baseline">&nbsp;</td>
              <td width="402">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="2" valign="baseline"><font size="2" class="contentRed">*Required</font></td>
              <td valign="baseline"><input type="button" value="Cancel" name="btn_Cancel"  onClick="javascript:location.href='mem_logon.jsp'"  />
									&nbsp;&nbsp;
									<input type="button" id="btn_Continue" value="Continue" name="btn_Continue" onClick="Call_Validator()" /></td>
            </tr>
          </table>
      </form>
  </td></tr></table>
</div>
<script type="text/javascript">
//Set focus on the First field of the page 
setFocus();
//Attache enter event on the browser to be fired and handled
addKeyEvent();

// If Javascript is enabled then display the content of the page
document.getElementById("tbl_Register").style.display = "inline"

var url = document.location.href.split("?")
var flag = -1
if(url.length > 1)
	flag = <%= request.getParameter("flag") %>

if(flag == 2)
{
	Show_Last_Form_Values(url[1]);
	err_Obj = document.getElementById("err_Answer");
	err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Wrong Answer. Try again ...";
	err_Obj.style.display = "inline";		
}

</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>




