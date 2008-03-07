<%@ page import="java.util.HashMap" %>
<%@ page import="com.inetvod.common.core.StrUtil" %>
<%@ page import="com.inetvod.common.data.CategoryID" %>
<%@ page import="com.inetvod.playerClient.rqdata.Category" %>
<%@ page import="com.inetvod.playerClient.rqdata.CategoryList" %>
<%@ page import="com.inetvod.playerClient.rqdata.Provider" %>
<%@ page import="com.inetvod.playerClient.rqdata.ProviderList" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearchList" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearchList" %>
<%@ page import="com.inetvod.webapp.MemRegister" %>
<%@ page import="com.inetvod.webapp.PageMenuMap" %>
<%@ page import="com.inetvod.webapp.ReadXMLFile" %>
<%@ page import="com.inetvod.webapp.player.CategorySearchView" %>
<%@ page import="com.inetvod.webapp.player.NowPlayingView" %>
<%@ page import="com.inetvod.webapp.player.ProviderSearchView" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
 * Copyright © 2006-2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
%>
<jsp:include flush="true" page="cookie_check.jsp"/>

<html>
<head>
	<title>Update Logon Password</title>
	<link href="../styles/style.css" rel="stylesheet" type="text/css"/>
	<link href="../omnie.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="../main.js"></script>
	<script src="../includes/form_validations.js" type="text/javascript"></script>
	<script type="text/javascript">
		function RunOnLoad()
		{
			StartupInitMember();
			headerCheckFields();

			//Attache enter event on the browser to be fired and handled
			addKeyEvent();

			// If Javascript is enabled then display the content of the page
			document.getElementById("tbl_Register").style.display = "inline"

			var url = document.location.href.split("?")
			var flag = -1
			if(url.length > 1)
				flag = <%= request.getParameter("flag") %>

			if(flag == 0)
				ShowErrorMsgByID("err_Exist_Password", "Existing Password is wrong. Please try again...");

			/***********************************************************/
			//Server side error alert
			if(flag == 2)
				ShowGeneralError();

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
				CheckForBlank(document.getElementById("tbx_Exist_Password"), document.getElementById("err_Exist_Password"), "Existing Password is a required field and must be entered ")
					== false ||
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
				<jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=pass"/>
			</td>
			<td valign="top" class="contentBody">
				<form action="mem_password_save.jsp" method="post" name="inet">
					<noscript>
						<h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript
							and try again...</font></h1>
					</noscript>
					<table border="0" cellpadding="1" cellspacing="0" style="display:none;"
						width="520" id="tbl_Register">
						<tr valign="top">
							<td colspan="2"><h2>Update Logon Password</h2></td>
						</tr>
						<tr>
							<td colspan="2"><div id="err_General" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td colspan="2" class="contentWithoutBorder">
								To change the logon password for this account, please enter the old password and select
								a new password:</td>
						</tr>

						<tr>
							<td colspan="2" align="right">&nbsp;</td>
						</tr>
						<tr>
							<td width="35%" align="right" nowrap><font size="2"><span class="contentRed">*</span>Existing
								Password&nbsp;</font></td>
							<td width="65%" align="left"><font size="2" face="Verdana">
								<input type="password" id="tbx_Exist_Password" name="tbx_Exist_Password" size="16"
									maxlength="16"/></font></td>
						</tr>
						<tr>
							<td></td>
							<td><div id="err_Exist_Password" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td align="right" nowrap><font size="2"><span class="contentRed">*</span>New Password&nbsp;
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
							<td><font size="1" face="Verdana">6-16 charcaters (case sensitive)</font></td>
						</tr>
						<tr>
							<td align="right" nowrap><font size="2"><span class="contentRed">*</span>Confirm New Password&nbsp;
							</font></td>
							<td align="left"><font size="2" face="Verdana">
								<input type="password" id="tbx_Confirm_Password" name="tbx_Confirm_Password" size="16"
									maxlength="16"/></font></td>
						</tr>
						<tr>
							<td></td>
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
								onClick="javascript:location.href='cookie_exist_user.jsp'"/>
								&nbsp;&nbsp;
								<input type="button" value="Save" name="btn_Continue" id="btn_Continue"
									onClick="Call_Validator()"/></td>
						</tr>
					</table>
				</form>
			</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
