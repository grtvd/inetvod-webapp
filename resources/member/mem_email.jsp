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
	newMember.member_Email_Id(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
			<script  type="text/javascript">location.href="error.jsp"</script>
<%			
	}		
%>
<html>
<head>
<title>Update Email Address</title>
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
			CheckForBlank(document.getElementById("tbx_Email"), document.getElementById("err_Email"), "New Email is a required field and must be entered ") == false ||
			validateEmailFormat(document.getElementById("tbx_Email"), document.getElementById("err_Email"), "New Email format is not correct") == false ||
			CheckForBlank(document.getElementById("tbx_Confirm_Email"), document.getElementById("err_Confirm_Email"), "Confirm New Email is a required field and must be entered ") == false ||	
			CompareObjectValues(document.getElementById("tbx_Email"), document.getElementById("tbx_Confirm_Email"), document.getElementById("err_Confirm_Email"), "New Email and Confirm New Email are not matching") == false
		)
	{
		validated = false;
		objButton.disabled = false;
	}
	
	//If there is no error then will return true 	
	if(validated)
		document.inet.submit(); 
//	return validated;

	event.returnValue=false;
}
</script>

</head>
<body>
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

  <table border="0" cellpadding="0" cellspacing="0" width="760">
    <tr>
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=email"/>  
      </td>
      <td valign="top" class="contentWithoutBorder"><form action="mem_email_save.jsp" method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register"  >
            <tr valign="top">
              <td colspan="2"><h2>Update Email Address</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" class="contentWithoutBorder" >
			  <div id="err_General" style="display:none" class="contentRed"></div>
			  Your email address will only be used sign on to the iNetVOD web site and for account
                maintenance communication. Your email address will be held in strict confidence and will not
              be sold or given to any outside companies without your prior consent :</td>
            </tr>
            
            <tr valign="top">
              <td colspan="2" align="right" >&nbsp;</td>
            </tr>
            <tr valign="top">
              <td width="170" align="right" ><font size="2">Current Email Address</font></td>
              <td width="366" align="left"><font size="2">&nbsp;&nbsp; <strong><%= newMember.getEmail_id() %></strong></font></td>
            </tr>
            <tr>
              <td colspan="2" align="right">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="2" align="left" class="contentWithoutBorder" >To change your email address for this account, please enter new email below:</td>
            </tr>
            
            <tr valign="top">
              <td align="center" >&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr valign="top">
              <td align="right" ><font size="2"><span class="contentRed">*</span>New Email</font></td>
              <td align="left">&nbsp;
                  <input type="text" id="tbx_Email" name="tbx_Email" size="40" maxlength="128" />
                  <div id="err_Email" style="display:none" class="contentRed"></div>
                <br />
                &nbsp;&nbsp;<font size="1">Example: joe@gmail.com</font></td>
            </tr>
            <tr>
              <td align="right"><font size="2"><span class="contentRed">*</span>Confirm New Email</font></td>
              <td align="left"><font size="2" face="Verdana"> &nbsp;
                    <input type="text" id="tbx_Confirm_Email" name="tbx_Confirm_Email" size="40" maxlength="128" />
                    <div id="err_Confirm_Email" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            
            
            <tr>
              <td align="right" valign="top">&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            
            
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td valign="baseline"><font size="2" class="contentRed">*Required</font></td>
              <td valign="baseline"><input type="button" value="Cancel" name="btn_Cancel"  onClick="javascript:location.href='cookie_exist_user.jsp'"  />
									&nbsp;&nbsp;
									<input type="button" id="btn_Continue" value="Save" name="btn_Continue" onClick="Call_Validator()" /></td>
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
	
	/***********************************************************/
	//Server side error alert
	var url = document.location.href.split("?")
	var flag = -1
	if(url.length > 1)
		flag = <%= request.getParameter("flag") %>

	if (flag == 2)
	{
		Show_Last_Form_Values(url[1]);
		err_Obj = document.getElementById("err_General");
		err_Obj.innerHTML = "An error has occured. Try again...<br>";
		err_Obj.style.display = "inline";		
	}
	else if (flag == 1)
	{
		Show_Last_Form_Values(url[1]);
		err_Obj = document.getElementById("err_Email");
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;Email ID already exists. Try again...";
		err_Obj.style.display = "inline";		
	}
	
	/***********************************************************/
	
</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
