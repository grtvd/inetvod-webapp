<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
 * Copyright � 2006-2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<!--jsp:include flush="true" page="cookie_check.jsp" /-->

<html>
<head>
	<title>Reset Logon Password</title>
	<link href="../styles/style.css" rel="stylesheet" type="text/css"/>
	<link href="../omnie.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="../main.js"></script>
	<script src="../includes/form_validations.js" type="text/javascript"></script>
	<script type="text/javascript">
		function RunOnLoad()
		{
			StartupInitGeneral();
			headerCheckFields();

			//Attache enter event on the browser to be fired and handled
			//addKeyEvent();

			// If Javascript is enabled then display the content of the page
			document.getElementById("tbl_Register").style.display = "inline"

			var url = document.location.href.split("?")
			var flag = -1
			if(url.length > 1)
				flag = <%= request.getParameter("flag") %>

			if(flag == 0)
			{
				Show_Last_Form_Values(url[1]);
				ShowErrorMsgByID("err_Email", "This email has not be registered. Please try again...");
			}
			else if(flag == 1)
				ShowErrorMsgByID("err_Email", "Your answer to the secret question was not correct. Please try again...");

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
					== false
				)
			{
				validated = false;
				objButton.disabled = false;
			}

			return validated;

			//If there is no error then will return true
//			if(validated)
//				document.inet.submit();
//
//			event.returnValue = false;
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
			<td valign="top" class="contentBody">
				<form action="mem_reset_question.jsp" method="post" name="inet" onSubmit="return Call_Validator();">
					<noscript class="error">
						This site requires JavaScript. If your browser supports JavaScript, please enable and try again...
					</noscript>
					<table border="0" cellpadding="1" cellspacing="0" style="display:none;"
						width="520" id="tbl_Register">
						<tr valign="top">
							<td colspan="2"><h2>Reset Logon Password</h2></td>
						</tr>
						<tr>
							<td colspan="2" class="contentWithoutBorder">Please enter the email address that you
								registered with Storm Media Player:</td>
						</tr>

						<tr>
							<td colspan="2" align="right">&nbsp;</td>
						</tr>
						<tr>
							<td width="170" align="right"><font size="2"><span class="contentRed">*</span>Email&nbsp;</font>
							</td>
							<td width="366" align="left">
								<input type="text" id="tbx_Email" name="tbx_Email" size="40" maxlength="64"/></td>
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
							<td valign="baseline">&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td valign="baseline"><font size="2" class="contentRed">*Required</font></td>
							<td valign="baseline"><input type="button" value="Cancel" name="btn_Cancel"
								onClick="javascript:location.href='mem_logon.jsp'"/>
								&nbsp;&nbsp;
								<input type="submit" id="btn_Continue" value="Continue" name="btn_Continue"/></td>
						</tr>
					</table>
				</form>
			</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
