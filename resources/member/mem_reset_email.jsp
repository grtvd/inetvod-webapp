<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<!--jsp:include flush="true" page="cookie_check.jsp" /-->

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
			CheckForBlank(document.getElementById("tbx_Email"), document.getElementById("err_Email"), "Email is a required field and must be entered ") == false ||
			validateEmailFormat(document.getElementById("tbx_Email"), document.getElementById("err_Email"), "Email format is not correct") == false
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
      <td valign="top" class="contentWithoutBorder"><form action="mem_reset_question.jsp" method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register" >
            <tr valign="top">
              <td colspan="2"><h2>Reset Logon Password</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" class="contentWithoutBorder" >Please enter the email address that you registered with iNetVOD :</td>
            </tr>
            
            <tr valign="top">
              <td colspan="2" align="right" >&nbsp;</td>
            </tr>
            <tr valign="top">
              <td width="170" align="right" ><font size="2"><span class="contentRed">*</span>Email</font></td>
              <td width="366" align="left">&nbsp;
                  <input type="text" id="tbx_Email" name="tbx_Email" size="40" maxlength="128" />
                  <div id="err_Email" style="display:none" class="contentRed"></div>
                <br />
              &nbsp;&nbsp;<font size="1">Example: joe@gmail.com</font></td>
            </tr>

            
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td valign="baseline"><font size="2" class="contentRed">*Required</font></td>
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

if(flag == 0)
{
	Show_Last_Form_Values(url[1]);
	err_Obj = document.getElementById("err_Email");
	err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Wrong email id supplied. Try again ...";
	err_Obj.style.display = "inline";		
}
else if(flag == 1)
{
	err_Obj = document.getElementById("err_Email");
	err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Wrong Answer to the question. Try again ...";
	err_Obj.style.display = "inline";		
}

</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
