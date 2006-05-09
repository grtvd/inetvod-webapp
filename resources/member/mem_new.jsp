<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<jsp:useBean id="readXML" class="com.inetvod.webapp.ReadXMLFile" scope="request"/>
<% 
	String [][] questList = readXML.readXML("Quest");
%>

<html>
<head>
<title>Create a new Membership</title>
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
			CheckForBlank(document.getElementById("tbx_Confirm_Email"), document.getElementById("err_Confirm_Email"), "Confirm Email is a required field and must be entered ") == false ||	
			CompareObjectValues(document.getElementById("tbx_Email"), document.getElementById("tbx_Confirm_Email"), document.getElementById("err_Confirm_Email"), "Email Id and Confirm Email Id are not matching") == false ||
			CheckForBlank(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "Password is a required field and must be entered ") == false ||
			ValidatePassword(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "Password length should be 6-16 charcaters long") == false ||
			CheckForBlank(document.getElementById("tbx_Confirm_Password"), document.getElementById("err_Confirm_Password"), "Confirm Password is a required field and must be entered") == false ||
			CompareObjectValues(document.getElementById("tbx_Password"), document.getElementById("tbx_Confirm_Password"), document.getElementById("err_Confirm_Password"), "Password and Confirm Password are not matching") == false ||
			CheckForCombo(document.getElementById("cmb_Question"), document.getElementById("err_Question"), "Secret Question is a required field and must be selected ") == false ||
			CheckForBlank(document.getElementById("tbx_Answer"), document.getElementById("err_Answer"), "Secret Answer is a required field and must be entered ") == false ||
			ValidateAnswer(document.getElementById("tbx_Answer"), document.getElementById("err_Answer"), "Length of Answer should not be greater than 32 characters") == false ||
			CheckForCheckBox(document.getElementById("cbx_Policy"), document.getElementById("err_Policy"), "Must agree to the Terms of Service and Privacy Policy") == false ||
			CheckForBlank(document.getElementById("captchafield"), document.getElementById("err_Captcha"), "Security Code is a required field and must be entered ") == false
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
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=Reg"/>  
      </td>
      <td valign="top" class="contentWithoutBorder">
	  	<form action="mem_new_save.jsp" method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register">
            <tr valign="top">
              <td colspan="2"><h2>Create a new Membership</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" class="contentWithoutBorder" ><div id="err_General" style="display:none" class="contentRed"></div>
			  
			  Please tell us your email address . Your email address will only be used log on to the iNetVOD
                web site and for account maintenance communication . Your email address will be held in strict
                confidence and will not be sold or given to any outside companies without your prior consent :</td>
            </tr>
            <tr valign="top">
              <td width="25%" align="right" ><font size="2"><span class="contentRed">*</span>Email</font></td>
              <td align="left">&nbsp;
                  <input type="text" id="tbx_Email" name="tbx_Email" size="40" maxlength="64" />
                  <div id="err_Email" style="display:none" class="contentRed"></div>
                <br />
                &nbsp;&nbsp;<font size="1">Example: joe@gmail.com</font></td>
            </tr>
            <tr>
              <td width="25%" align="right"><font size="2"><span class="contentRed">*</span>Confirm Email</font></td>
              <td align="left"><font size="2" face="Verdana"> &nbsp;
                    <input type="text" id="tbx_Confirm_Email" name="tbx_Confirm_Email" size="40" maxlength="64" />
                    <div id="err_Confirm_Email" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            <tr>
              <td align="right">&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="2" align="left" class="contentWithoutBorder" >Please choose a password. Your password is stored in our database in an encrypted format . No one will have the ability to view your password.</td>
            </tr>
            <tr>
              <td width="25%" align="right" valign="top"><font size="2"><span class="contentRed">*</span>Password</font></td>
              <td align="left" valign="top"><font size="2" face="Verdana"> &nbsp;
                    <input type="password" id="tbx_Password" name="tbx_Password" size="16" maxlength="16"  />
                    <div id="err_Password" style="display:none" class="contentRed"></div>
                <br />
                &nbsp;&nbsp;</font><font size="1">6-16 charcaters (case sensitive) </font></td>
            </tr>
            <tr>
              <td width="25%" align="right"><font size="2"><span class="contentRed">*</span>Confirm Password </font></td>
              <td align="left"><font size="2" face="Verdana"> &nbsp;
                    <input type="password" id="tbx_Confirm_Password" name="tbx_Confirm_Password" size="16" maxlength="16" />
                    <div id="err_Confirm_Password" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            <tr>
              <td align="right">&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="2" align="left" class="contentWithoutBorder">Please choose a secrete question and answer . Should you loose your password , you will be
                required to provide the answer to your secrete question before your password can be reset .</td>
            </tr>
            <tr>
              <td width="25%" align="right"><font size="2"><span class="contentRed">*</span>Secret Question</font></td>
              <td align="left"><font size="2" face="Verdana"> &nbsp;
                    <select name="cmb_Question" id="cmb_Question" >
                      <option value="0">-- Select Question --</option>
<%
					for(int i = 0; i < questList.length; i++)
					{
%>

                    <option value="<%= questList[i][1] %>"><%= questList[i][0] %></option>
<%
					}
%>					
                    </select>
                    <div id="err_Question" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            <tr>
              <td width="25%" align="right"><font size="2"><span class="contentRed">*</span>Secret Answer</font></td>
              <td align="left"><font size="2" face="Verdana"> &nbsp;
                    <input type="text" id="tbx_Answer" name="tbx_Answer" size="32" maxlength="32" />
                    <div id="err_Answer" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            <tr>
              <td width="25%" align="right">&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="2" align="left" class="contentWithoutBorder">By using the iNetVOD website and services, you are agreeing to iNetVOD&rsquo;s Terms of Service
                and Privacy Policy.</td>
            </tr>
            <tr>
              <td align="left" valign="top">&nbsp;</td>
              <td align="left" valign="top" class="contentWithoutBorder"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="5%"><input type="checkbox" id="cbx_Policy" name="cbx_Policy" value="1" /></td>
                    <td width="95%" class="contentWithoutBorder">I have read and agree to iNetVOD&rsquo;s <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                      <div id="err_Policy" style="display:none" class="contentRed"></div></td>
                  </tr>
              </table></td>
            </tr>
            <tr>
              <td valign="baseline" colspan="2">
			  <!-- Captch Image -->
			  <table width="100%">
				<tr>
					<td width="25%" ><img id="img_Captcha" src="../../Captcha.jpg" ></td>
				<td valign="top">
				<br><font size="2" face="Verdana"><span class="contentRed"><font size="2">*</font></span>Security Code</font>&nbsp;&nbsp;
				<input type="text" id="captchafield" name="captchafield" maxlength="10" size="10">
				<div id="err_Captcha" style="display:none" class="contentRed"></div>
				<br><font size="1" face="Verdana">To stop automated bot enrollments</font>
				</td>
				</tr>
				</table>
			  <!-- Captch Image -->				
			</td>
            </tr>
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td>&nbsp;
              </td>
            </tr>
            <tr>
              <td valign="baseline"><span class="contentRed"><font size="2">*Required</font></span></td>
              <td><input type="button" value="Cancel" name="btn_Cancel" onClick="Javascript:history.back();" />
                &nbsp;&nbsp;
                <input type="button" id="btn_Continue" value="Continue" name="btn_Continue" onClick="Call_Validator()" />
              </td>
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

	if(flag == 1)
	{
		err_Obj = document.getElementById("err_Email");
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Email Id already Exists. Try again...";
		err_Obj.style.display = "inline";		
	}
	else if (flag == 2)
	{
		Show_Last_Form_Values(url[1]);
		err_Obj = document.getElementById("err_General");
		err_Obj.innerHTML = "An error has occured. Try again...<br>";
		err_Obj.style.display = "inline";		
	}
	else if (flag == 3)
	{
		Show_Last_Form_Values(url[1]);
		err_Obj = document.getElementById("err_Captcha");
		err_Obj.innerHTML = "<br>Security Code dosen't match. Try again...";
		err_Obj.style.display = "inline";		
	}
	
</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
