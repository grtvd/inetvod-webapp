<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright � 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>
<jsp:include page="cookie_reset.jsp" flush="true"/>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<html>
<head>
	<title>Logon</title>
	<link rel="stylesheet" href="../twc615.css" type="text/css"/>
	<link href="../omnie.css" rel="stylesheet" type="text/css"/>
	<script src="../includes/form_validations.js" type="text/javascript"></script>
	<script type="text/javascript">
		function RunOnLoad()
		{
			//Attache enter event on the browser to be fired and handled
			addKeyEvent();

			// If Javascript is enabled then display the content of the page
			document.getElementById("tbl_Register").style.display = "inline"
			var url = document.location.href.split("?")
			var flag = -1
			if(url.length > 1)
				flag = <%= request.getParameter("flag") %>

			var err_Obj;
			if(flag == 0)
				ShowGeneralError("Email or Password was incorrect. Please try again...");
			else if(flag == 1)
				ShowGeneralError("Session timed out. Please logon again...");
			else if(flag == 2)
				ShowGeneralError();
			else if(flag == 3)
				ShowGeneralError("Your password was successfully updated.");

			//Set focus on the First field of the page
			setFocus();
		}

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
			if(
				CheckForBlank(document.getElementById("tbx_Email"), document.getElementById("err_Email"), "Email is a required field and must be entered ")
					== false ||
				validateEmailFormat(document.getElementById("tbx_Email"), document.getElementById("err_Email"), "Email format is not correct")
					== false ||
				CheckForBlank(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "Password is a required field and must be entered ")
					== false
				)
			{
				validated = false;
				objButton.disabled = false;
			}

			//If there is no error then will return true
			if(validated)
				document.inet.submit();

			event.returnValue = false;

			//	return validated;
		}
	</script>

</head>

<body onload="RunOnLoad();">
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

	<table border="0" cellpadding="0" cellspacing="0" width="760">
		<tr>
			<td align="left" valign="top" class="leftside" width="222">
				<jsp:include flush="true" page="../includes/left_navigation.jsp?page=Logon"/>
			</td>
			<td valign="top" class="contentWithoutBorder">
				<form action="mem_logon_check.jsp" method="post" name="inet">
					<noscript>
						<h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript
							and try again...</font></h1>
					</noscript>
					<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse"
						width="520" id="tbl_Register">
						<tr valign="top">
							<td colspan="2"><h2>Logon</h2></td>
						</tr>
						<tr>
							<td colspan="2"><div id="err_General" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td colspan="2" class="contentWithoutBorder">
								Please enter your email address used for registration and your selected password:</td>
						</tr>

						<tr valign="top">
							<td align="left">&nbsp;</td>
							<td width="368" align="left">&nbsp;</td>
						</tr>
						<tr>
							<td align="right"><font size="2"><span class="contentRed">*</span>Email&nbsp;</font></td>
							<td align="left"><font size="2" face="Verdana">
								<input type="text" id="tbx_Email" name="tbx_Email" size="40" maxlength="64"/>
								</font></td>
						</tr>
						<tr>
							<td></td>
							<td><div id="err_Email" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td></td>
							<td><font size="1">Example: joe@gmail.com</font></td>
						</tr>


						<tr>
							<td width="172" align="center">&nbsp;</td>
							<td align="left">&nbsp;</td>
						</tr>
						<tr>
							<td align="right"><font size="2"><span class="contentRed">*</span>Password&nbsp;
							</font></td>
							<td align="left"><font size="2" face="Verdana">
								<input type="password" id="tbx_Password" name="tbx_Password" size="16" maxlength="16"/>
								</font></td>
						</tr>
						<tr>
							<td></td>
							<td><div id="err_Password" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td></td>
							<td align="left"><font size="2"><a href="mem_reset_email.jsp">Forgot Password?</a></font>
								</td>
						</tr>

						<tr>
							<td valign="baseline">&nbsp;</td>
							<td valign="baseline">&nbsp;</td>
						</tr>
						<tr>
							<td valign="baseline"><font size="2" class="contentRed">*Required</font></td>
							<td valign="baseline"><input type="button" id="btn_Continue" value="Logon"
								name="btn_Continue" onClick="Call_Validator();"/></td>
						</tr>
						<tr>
							<td valign="baseline">&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td colspan="2" valign="baseline" class="contentWithoutBorder">Not yet registered? <a
								href="mem_new.jsp">Click here to register.</a></td>
						</tr>
					</table>
				</form>
			</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
