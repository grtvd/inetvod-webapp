<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
 * Copyright © 2006-2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<%
	String queryString = "&tbx_Email=" + request.getParameter("tbx_Email");
	newMember.member_Email_Id_Check(request.getParameter("tbx_Email"));
	if(newMember.getError_flag())
	{
%>
<script type="text/javascript">location.href = "error.jsp"</script>
<%
		return;
	}

	String [] str_Quest_Ans = newMember.getQuest_ans();

	if(str_Quest_Ans[0].length() == 0)
		response.sendRedirect("mem_reset_email.jsp?flag=0" + queryString);
%>
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

			if(flag == 2)
			{
				Show_Last_Form_Values(url[1]);
				ShowErrorMsgByID("err_Answer", "Your answer to the secret question was not correct. Please try again...");
			}

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
				CheckForBlank(document.getElementById("tbx_Answer"), document.getElementById("err_Answer"), "Answer is a required field and must be entered ")
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
				<form action="mem_reset_password.jsp" method="post" name="inet" onSubmit="return Call_Validator()">
					<input type="hidden" name="tbx_Email" value="<%= request.getParameter("tbx_Email")%>"/>
					<noscript class="error">
						This site requires JavaScript. If your browser supports JavaScript, please enable and try again...
					</noscript>
					<table border="0" cellpadding="1" cellspacing="0" style="display:none;"
						width="520" id="tbl_Register">
						<tr valign="top">
							<td colspan="2"><h2>Reset Logon Password</h2></td>
						</tr>
						<tr>
							<td colspan="2" class="contentWithoutBorder">Please answer the following question to reset
								your password:</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td colspan="2" align="center"><font size="2"><strong><%= str_Quest_Ans[0] %></strong>
								</font></td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td width="130" align="right"><font size="2">Answer:&nbsp;</font></td>
							<td width="390" align="left">
								<input type="text" id="tbx_Answer" name="tbx_Answer" size="32" maxlength="32"/></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td><div id="err_Answer" style="display:none" class="contentRed"></div></td>
						</tr>


						<tr>
							<td colspan="2">&nbsp;</td>
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




