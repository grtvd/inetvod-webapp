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
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<%
	newMember.Player_Logon_Id(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
<script type="text/javascript">location.href = "error.jsp"</script>
<%
	}
%>
<html>
<head>
	<title>Player Logon</title>
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

			/***********************************************************/
			//Server side error alert
			var url = document.location.href.split("?")
			var flag = -1
			if(url.length > 1)
				flag = <%= request.getParameter("flag") %>

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
				CheckForBlank(document.getElementById("tbx_Pin"), document.getElementById("err_Pin"), "PIN is a required field and must be entered")
					== false ||
				CheckExactLength(document.getElementById("tbx_Pin"), 6, document.getElementById("err_Pin"), "PIN must be 6 digits exactly")
					== false ||
				CheckForBlank(document.getElementById("tbx_Confirm_Pin"), document.getElementById("err_Confirm_Pin"), "Confirm PIN is a required field and must be entered")
					== false ||
				CompareObjectValues(document.getElementById("tbx_Pin"), document.getElementById("tbx_Confirm_Pin"), document.getElementById("err_Confirm_Pin"), "PIN and Confirm PIN do not match")
					== false
				)
			{
				validated = false;
				objButton.disabled = false;
			}

			//If there is no error then will return true
			if(validated)
				document.inet.submit();
			//	return validated;
			event.returnValue = false;
		}
	</script>

</head>

<body onload="RunOnLoad();">
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

	<table border="0" cellpadding="0" cellspacing="0" width="760">
		<tr>
			<td align="left" valign="top" class="leftside" width="222">
				<jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=logon"/>
			</td>
			<td valign="top" class="contentBody">
				<form action="mem_logon_update_save.jsp" method="post" name="inet">
					<noscript>
						<h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript
							and try again...</font></h1>
					</noscript>
					<table border="0" cellpadding="1" cellspacing="0" style="display:none;"
						width="520" id="tbl_Register">
						<tr valign="top">
							<td colspan="2"><h2>Player Logon</h2></td>
						</tr>
						<tr>
							<td colspan="2"><div id="err_General" style="display:none"
								class="contentRed"></div></td>
						</tr>
						<tr>
							<td colspan="2" class="contentWithoutBorder">
								To simplify access to the iNetVOD Service from remote-controlled devices, your account
								is assigned a 9-digit, numeric only Logon ID.</td>
						</tr>

						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td width="160" align="right" nowrap><font size="2">Your Logon ID&nbsp;</font></td>
							<td width="360" align="left"><font size="2"><strong><%= newMember
								.getPlayer_logon() %></strong></font>
							</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td colspan="2" align="left" class="contentWithoutBorder">For additional ease of use and
								security, please select a 6-digit, numeric only PIN to be used with
								your Logon ID:</td>
						</tr>

						<tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td align="right"><font size="2"><span class="contentRed">*</span>PIN&nbsp;</font></td>
							<td align="left"><input type="password" name="tbx_Pin" id="tbx_Pin"
								size="6" maxlength="6" onKeyPress="IntIEKeyCap()"/></td>
						</tr>
						<tr>
							<td></td>
							<td><div id="err_Pin" style="display:none" class="contentRed"></div></td>
						</tr>
						<tr>
							<td></td>
							<td><font size="1">6 digits, numbers only</font></td>
						</tr>
						<tr>
							<td align="right" nowrap><font size="2"><span class="contentRed">*</span>Confirm PIN&nbsp;</font></td>
							<td align="left"><input type="password" name="tbx_Confirm_Pin"
								id="tbx_Confirm_Pin" size="6" maxlength="6" onKeyPress="IntIEKeyCap()"/></td>
						</tr>
						<tr>
							<td></td>
							<td><div id="err_Confirm_Pin" style="display:none" class="contentRed"></div></td>
						</tr>

						<tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td valign="baseline"><font size="2" class="contentRed">*Required</font></td>
							<td><input type="button" value="Cancel" name="btn_Cancel"
								onClick="javascript:location.href='cookie_exist_user.jsp'"/>
								&nbsp;&nbsp;
								<input type="button" value="Continue" id="btn_Continue" name="btn_Continue"
									onClick="Call_Validator()"/></td>
						</tr>
					</table>
				</form>
			</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
