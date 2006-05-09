<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:include flush="true" page="cookie_check.jsp" />

<html>
<head>
<title>Update Logon Password</title>
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
			CheckForBlank(document.getElementById("tbx_Exist_Password"), document.getElementById("err_Exist_Password"), "Existing Password is a required field and must be entered ") == false ||
			CheckForBlank(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "New Password is a required field and must be entered ") == false ||
			ValidatePassword(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "New Password length should be 6-16 charcaters long") == false ||
			CheckForBlank(document.getElementById("tbx_Confirm_Password"), document.getElementById("err_Confirm_Password"), "Confirm New Password is a required field and must be entered") == false ||
			CompareObjectValues(document.getElementById("tbx_Password"), document.getElementById("tbx_Confirm_Password"), document.getElementById("err_Confirm_Password"), "New Password and Confirm New Password are not matching") == false
		)
	{
		validated = false;
		objButton.disabled = false;
	}
	
	//If there is no error then will return true 	
	if(validated)
		document.inet.submit(); 
		
	event.returnValue=false;		
//	return validated;
}
</script>

</head>
<body>
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

  <table border="0" cellpadding="0" cellspacing="0" width="760">
    <tr>
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=pass"/>  
      </td>
      <td valign="top" class="contentWithoutBorder"><form action="mem_password_save.jsp" method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register" >
            <tr valign="top">
              <td colspan="2"><h2>Update Logon Password</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" class="contentWithoutBorder" >
			  <div id="err_General" style="display:none" class="contentRed"></div>
			  To change the logon password for this account , please enter the old password and select a
              new password:</td>
            </tr>
            
            <tr valign="top">
              <td colspan="2" align="right" >&nbsp;</td>
            </tr>
            <tr valign="top">
              <td width="170" align="right" ><font size="2"><span class="contentRed">*</span> Existing Password</font></td>
              <td width="366" align="left">&nbsp;&nbsp;<font size="2" face="Verdana">
                <input type="password" id="tbx_Exist_Password" name="tbx_Exist_Password" size="16" maxlength="16"  />
																		  <div id="err_Exist_Password" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            <tr valign="top">
              <td align="center" >&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr>
              <td align="right" valign="top"><font size="2"><span class="contentRed">*</span>New Password</font></td>
              <td align="left" valign="top"><font size="2" face="Verdana"> &nbsp;
                    <input type="password" id="tbx_Password" name="tbx_Password" size="16" maxlength="16"  />
                    <div id="err_Password" style="display:none" class="contentRed"></div></font>
                <br />
                &nbsp;&nbsp;<font size="1" face="Verdana">6-16 charcaters (case sensitive)</font>  </td>
            </tr>
            <tr>
              <td align="right"><font size="2"><span class="contentRed">*</span>Confirm New Password </font></td>
              <td align="left"><font size="2" face="Verdana"> &nbsp;
                    <input type="password" id="tbx_Confirm_Password" name="tbx_Confirm_Password" size="16" maxlength="16" />
                    <div id="err_Confirm_Password" style="display:none" class="contentRed"></div>
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
								<input type="button" value="Save" name="btn_Continue" id="btn_Continue" onClick="Call_Validator()" /></td>
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
	
	if(flag == 0)
	{
		err_Obj = document.getElementById("err_Exist_Password");
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Existing Password is wrong. Try again ...";
		err_Obj.style.display = "inline";		
	}

	/***********************************************************/
	//Server side error alert
	if (flag == 2)
	{
		err_Obj = document.getElementById("err_General");
		err_Obj.innerHTML = "An error has occured. Try again...<br>";
		err_Obj.style.display = "inline";		
	}
	/***********************************************************/

</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
