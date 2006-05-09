<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:include page="cookie_reset.jsp" flush="true" />
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<html>
<head>
<title>Logon</title>
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
			validateEmailFormat(document.getElementById("tbx_Email"), document.getElementById("err_Email"), "Email format is not correct") == false ||
			CheckForBlank(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "Password is a required field and must be entered ") == false
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
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=Logon"/>  
      </td>
      <td valign="top" class="contentWithoutBorder"><form action="mem_logon_check.jsp" method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register" >
            <tr valign="top">
              <td colspan="2" ><h2>Logon</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" class="contentWithoutBorder">
			  <div id="err_General" style="display:none" class="contentRed"></div>
			  Please enter your email address used for registration and your selected password:</td>
            </tr>
            
            <tr valign="top">
              <td align="left" >&nbsp;</td>
              <td width="368" align="left" >&nbsp;</td>
            </tr>
            <tr valign="top">
              <td align="right" ><font size="2"><span class="contentRed">*</span>Email</font></td>
              <td align="left">&nbsp;
                  <input type="text" id="tbx_Email" name="tbx_Email" size="40" maxlength="128" />
                  <div id="err_Email" style="display:none" class="contentRed"></div>
                <br />
                &nbsp;&nbsp;<font size="1">Example: joe@gmail.com</font></td>
            </tr>
            
            
            
            <tr valign="top">
              <td width="172" align="center" >&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr>
              <td align="right" valign="top"><font size="2"><span class="contentRed">*</span>Password</font></td>
              <td align="left" valign="top"><font size="2" face="Verdana"> &nbsp;
                    <input type="password" id="tbx_Password" name="tbx_Password" size="16" maxlength="16"  />
                    <div id="err_Password" style="display:none" class="contentRed"></div></font></td>
            </tr>
            <tr>
              <td align="right" valign="top">&nbsp;</td>
              <td align="left">&nbsp;&nbsp;<font size="2"><a href="mem_reset_email.jsp">Forgot Password ? </a></font></td>
            </tr>
            
            
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td colspan="2" valign="baseline" class="contentWithoutBorder">Not yet registered? <a href="mem_new.jsp">Click here to register.</a></td>
            </tr>
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td valign="baseline">&nbsp;</td>
            </tr>
            <tr>
              <td valign="baseline"><font size="2" class="contentRed">*Required</font></td>
              <td valign="baseline"><input type="button" id="btn_Continue" value="Logon" name="btn_Continue" onClick="alert();Call_Validator();" /></td>
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
	err_Obj = document.getElementById("err_Password");
	err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Email Id or Password is wrong. Try again...";
	err_Obj.style.display = "inline";		
}
else if(flag == 1)
{
	err_Obj = document.getElementById("err_Password");
	err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Session out. Login again....";
	err_Obj.style.display = "inline";		
}
else if(flag == 2)
{
	Show_Last_Form_Values(url[1]);
	err_Obj = document.getElementById("err_General");
	err_Obj.innerHTML = "An error has occured. Try again...<br>";
	err_Obj.style.display = "inline";		
}
else if(flag == 3)
{
	err_Obj = document.getElementById("err_General");
	err_Obj.innerHTML = "Your password is changed successfully...<br>";
	err_Obj.style.display = "inline";		
}
</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
