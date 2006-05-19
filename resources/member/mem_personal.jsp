<%@ page import="com.inetvod.webapp.ReadXMLFile" %>
<%@ page contentType="text/html; charset=windows-1252" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>
<jsp:include flush="true" page="cookie_check.jsp"/>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<%
	String [][] countryList = ReadXMLFile.readXML(ReadXMLFile.Country);
	newMember.member_Personal(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
<script type="text/javascript">location.href = "error.jsp"</script>
<%
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
<meta http-equiv="Content-Language" content="en-us"/>
<title>Personal Information</title>
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
	Select_Combo(document.getElementById("cmb_Country"), "<%= newMember.getCountry_id()%>");

	var url = document.location.href.split("?")
	var flag = -1
	if(url.length > 1)
		flag =
<%= request.getParameter("flag") %>

	if(flag == 2)
	{
		Show_Last_Form_Values(url[1]);
		ShowGeneralError();
	}

	//Set focus on the First field of the page
	setFocus();
}

function Call_Validator()
{
	var objButton = document.getElementById("btn_Continue");
	objButton.disabled = true;

	//On submit will hide all the error messages
	Hide_All_Error_Messages();

	//Set default value as true
	var check_blank_flag = true;

	//Check if any field is Filled by user then all the fields are mandatory
	if(
		CheckIfBlank(document.getElementById("tbx_Add_1")) &&
		CheckIfBlank(document.getElementById("tbx_Add_2")) &&
		CheckIfBlank(document.getElementById("tbx_City")) &&
		CheckIfBlank(document.getElementById("tbx_State")) &&
		CheckIfBlank(document.getElementById("tbx_Zip")) &&
		CheckIfComboSelect(document.getElementById("cmb_Country"))
		)
		check_blank_flag = false;

	//Set default value as true
	var validated = true;

	//Condition to check of any validation fails and will display the error message
	if(
		CheckForBlank(document.getElementById("tbx_Name"), document.getElementById("err_Name"), "First Name is a required field and must be entered ")
			== false ||
		CheckForLength(document.getElementById("tbx_Name"), 32, document.getElementById("err_Name"), "First Name character length should be less then 32")
			== false ||
		CheckForBlank(document.getElementById("tbx_Last_Name"), document.getElementById("err_Last_Name"), "Last Name is a required field and must be entered ")
			== false ||
		CheckForLength(document.getElementById("tbx_Last_Name"), 32, document.getElementById("err_Last_Name"), "Last Name character length should be less then 32")
			== false
		)
	{
		validated = false;
		objButton.disabled = false;
	}

	//If any field is Filled by the user then check for all the mandatory fields and do the validation.
	if(validated && check_blank_flag)
	{
		if(
			CheckForBlank(document.getElementById("tbx_Add_1"), document.getElementById("err_Add_1"), "Address Line 1 is a required field and must be entered ")
				== false ||
			CheckForLength(document.getElementById("tbx_Add_1"), 64, document.getElementById("err_Add_1"), "Address Line 1 character length should be less then 64")
				== false ||
			CheckForLength(document.getElementById("tbx_Add_2"), 64, document.getElementById("err_Add_2"), "Address Line 2 character length should be less then 64")
				== false ||
			CheckForBlank(document.getElementById("tbx_City"), document.getElementById("err_City"), "City is a required field and must be entered ")
				== false ||
			CheckForLength(document.getElementById("tbx_City"), 64, document.getElementById("err_City"), "City character length should be less then 64")
				== false ||
			CheckForBlank(document.getElementById("tbx_State"), document.getElementById("err_State"), "State / Providence is a required field and must be entered ")
				== false ||
			CheckForLength(document.getElementById("tbx_State"), 64, document.getElementById("err_State"), "State / Providence character length should be less then 64")
				== false ||
			CheckForBlank(document.getElementById("tbx_Zip"), document.getElementById("err_Zip"), "Zip / Postal Code is a required field and must be entered ")
				== false ||
			CheckForLength(document.getElementById("tbx_Zip"), 32, document.getElementById("err_Zip"), "Zip / Postal Code character length should be less then 32")
				== false ||
			CheckForCombo(document.getElementById("cmb_Country"), document.getElementById("err_Country"), "Country is a required field and must be selected")
				== false
			)
		{
			validated = false;
			objButton.disabled = false;
		}
	}

	//If there is no error then will return true
	if(validated)
		document.inet.submit();

	event.returnValue = false;
	//return validated;
}
</script>
</head>

<body onload="RunOnLoad();">
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

<table border="0" cellpadding="0" cellspacing="0" width="760">
<tr>
<td align="left" valign="top" class="leftside" width="222">
	<jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=pers"/>
</td>
<td valign="top" class="contentWithoutBorder">
<form action="mem_personal_save.jsp" method="post" name="inet">
<noscript>
	<h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try
		again...</font></h1>
</noscript>
<table border="0" cellpadding="1" cellspacing="0" style="display:none;" width="520"
	id="tbl_Register">
<tr valign="top">
	<td colspan="2"><h2>Personal Information</h2></td>
</tr>
<tr>
	<td colspan="2"><div id="err_General" style="display:none" class="contentRed"></div></td>
</tr>
<tr valign="top">
	<td colspan="2" class="contentWithoutBorder">
		Please tell us who you are:</td>
</tr>
<tr>
	<td width="160" align="right" nowrap><font size="2"><span class="contentRed">*</span>First Name&nbsp;</font></td>
	<td width="360" align="left">
		<input type="text" id="tbx_Name" name="tbx_Name" size="32" maxlength="32"
			value="<%= newMember.getFirst_name()%>"/>
	</td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Name" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right" nowrap><font size="2"><span class="contentRed">*</span>Last Name&nbsp;</font></td>
	<td align="left">
		<input type="text" id="tbx_Last_Name" name="tbx_Last_Name" size="32" maxlength="32"
			value="<%= newMember.getLast_name() %>"/>
	</td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Last_Name" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right">&nbsp;</td>
	<td align="left">&nbsp;</td>
</tr>
<tr>
	<td colspan="2" align="left" class="contentWithoutBorder">(Optional) Please tell us your address (some content
		providers may require this information). This
		should be the location from where the iNetVOD Service will be accessed:</td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Address Line 1&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_Add_1" name="tbx_Add_1" size="40" maxlength="64"
			value="<%= newMember.Check_For_Null(newMember.getAddress_1()) %>"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Add_1" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Address Line 2&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_Add_2" name="tbx_Add_2" size="40" maxlength="64"
			value="<%= newMember.Check_For_Null(newMember.getAddress_2())%>"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Add_2" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right"><font size="2">City&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_City" name="tbx_City" size="40" maxlength="64"
			value="<%= newMember.Check_For_Null(newMember.getCity())%>"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_City" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">State / Providence&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_State" name="tbx_State" size="40" maxlength="64"
			value="<%= newMember.Check_For_Null(newMember.getState())%>"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_State" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Zip / Postal Code&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_Zip" name="tbx_Zip" size="32" maxlength="32"
			value="<%= newMember.Check_For_Null(newMember.getZip())%>"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Zip" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right"><font size="2">Country&nbsp;</font></td>
	<td align="left"><font size="1" face="Verdana">
		<select name="cmb_Country" id="cmb_Country">
			<option value="">-- Select Country --</option>
			<%
				for(int i = 0; i < countryList.length; i++)
				{
			%>
			<option value="<%= countryList[i][1] %>"><%= countryList[i][0] %></option>
			<%
				}
			%>
		</select>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Country" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td valign="baseline">&nbsp;</td>
	<td>&nbsp;</td>
</tr>
<tr>
	<td valign="baseline">&nbsp;</td>
	<td>&nbsp;</td>
</tr>
<tr>
	<td valign="baseline"><span class="contentRed"><font size="2">*Required</font></span></td>
	<td><input type="button" value="Cancel" name="btn_Cancel"
		onClick="javascript:location.href='cookie_exist_user.jsp'"/>
		&nbsp;
		<input type="button" id="btn_Continue" value="Continue" name="btn_Continue" onClick="Call_Validator()"/>
	</td>
</tr>
</table>
</form>
</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
