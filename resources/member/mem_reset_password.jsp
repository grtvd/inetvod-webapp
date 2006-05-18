<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>
<%@ page import="com.inetvod.webapp.PasswordService" %>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<%
	newMember.member_Email_Id_Check(request.getParameter("tbx_Email"));
	if(newMember.getError_flag())
	{
%>
<script type="text/javascript">location.href = "error.jsp"</script>
<%
	}

	String [] str_Quest_Ans = newMember.getQuest_ans();

	String str_Answer = request.getParameter("tbx_Answer");

	String queryString = "&tbx_Email=" + request.getParameter("tbx_Email");
	queryString = queryString + "&tbx_Answer=" + request.getParameter("tbx_Answer");

	if(!str_Quest_Ans[1].equals(PasswordService.encrypt(str_Answer)))
		response.sendRedirect("mem_reset_question.jsp?flag=2" + queryString);
%>
<html>
<head>
	<title>Reset Logon Password</title>
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
				CheckForBlank(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "New Password is a required field and must be entered ")
					== false ||
				ValidatePassword(document.getElementById("tbx_Password"), document.getElementById("err_Password"), "New Password length should be 6-16 charcaters long")
					== false ||
				CheckForBlank(document.getElementById("tbx_Confirm_Password"), document.getElementById("err_Confirm_Password"), "Confirm New Password is a required field and must be entered")
					== false ||
				CompareObjectValues(document.getElementById("tbx_Password"), document.getElementById("tbx_Confirm_Password"), document.getElementById("err_Confirm_Password"), "New Password and Confirm New Password do not match")
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
				<form action="mem_reset_password_save.jsp" method="post" name="inet">
					<input type="hidden" name="hdn_email" value="<%= request.getParameter("hdn_email")%>"/>
					<noscript>
						<h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript
							and try again...</font></h1>
					</noscript>
					<table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse"
						width="520" id="tbl_Register">
						<tr valign="top">
							<td colspan="2"><h2>Reset Logon Password</h2></td>
						</tr>
						<tr>
							<td colspan="2" class="contentWithoutBorder">Please select a new password: </td>
						</tr>

						<tr>
							<td colspan="2" align="right">&nbsp;</td>
						</tr>
						<tr>
							<td align="right"><font size="2"><span class="contentRed">*</span>New
								Password&nbsp;</font></td>
							<td align="left"><font size="2" face="Verdana">
								<input type="password" id="tbx_Password" name="tbx_Password" size="16" maxlength="16"/>
								</font></td>
						</tr>
						<tr>
							<td><div id="err_Answer" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td><font size="1" face="Verdana">6-16 charcaters (case sensitive)</font></td>
						</tr>
						<tr>
							<td align="right"><font size="2"><span class="contentRed">*</span>Confirm New
								Password&nbsp;</font></td>
							<td align="left"><font size="2" face="Verdana">
								<input type="password" id="tbx_Confirm_Password" name="tbx_Confirm_Password" size="16"
									maxlength="16"/></font></td>
						</tr>
						<tr>
							<td><div id="err_Confirm_Password" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td align="right">&nbsp;</td>
							<td align="left">&nbsp;</td>
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
								<input type="submit" id="btn_Continue" value="Save" name="btn_Continue"
									onClick="return Call_Validator()"/></td>
						</tr>
					</table>
				</form>
			</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
