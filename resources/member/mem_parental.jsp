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

	newMember.member_Parental_Details(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
<script type="text/javascript">location.href = "error.jsp"</script>
<%
	}

%>
<html>
<head>
	<title>Parental Controls</title>
	<link href="../styles/style.css" rel="stylesheet" type="text/css"/>
	<link href="../omnie.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="../main.js"></script>
	<script src="../includes/form_validations.js" type="text/javascript"></script>
	<script type="text/javascript">
		var radio_Value;
		var var_rating;
		function RunOnLoad()
		{
			StartupInitMember();
			headerCheckFields();

			//Attache enter event on the browser to be fired and handled
			addKeyEvent();

			// If Javascript is enabled then display the content of the page
			document.getElementById("tbl_Register").style.display = "inline"
			radio_Value = "<%= newMember.getInclude_adult() %>";
			var_rating = "<%= request.getParameter("cbx_Rating") == null ? "" : request.getParameter("cbx_Rating") %>";
			if(var_rating == "")
				var_rating = "<%= newMember.getRatingId() %>";

			var url = document.location.href.split("?");
			var flag = -1;
			if(url.length > 1)
				flag = <%= request.getParameter("flag") %>

			if(flag == 2)
			{
				Show_Last_Form_Values(url[1]);
				ShowGeneralError();
			}
			else
				Select_Radio("rbtn_Adult", radio_Value);

			Select_Ratings(var_rating);

			Enable_Pin_Date(document.getElementById("rbtn_Adult_Pin"));
			Disable_Pin(document.getElementById("rbtn_Adult_Always"));

			//Set focus on the First field of the page
			setFocus();
		}

		function Call_Validator()
		{
			var objButton = document.getElementById("btn_Continue");
			objButton.disabled = true;

			//On submit will hide all the error messages
			Hide_All_Error_Messages();

			var validated = true;
			if(!Check_Rating_Selected())
				validated = false;

			//Check if Adult pin Selected
			if(document.getElementById("rbtn_Adult_Pin").checked && validated)
				if(!CheckForBlank(document.getElementById("tbx_Adult_Pin"), document.getElementById("err_Adult_Pin"), "Adult PIN is a required field and must be entered ")
					|| !CheckExactLength(document.getElementById("tbx_Adult_Pin"), 6, document.getElementById("err_Adult_Pin"), "Adult PIN must be 6 characters long")
					|| !CheckForBlank(document.getElementById("tbx_Date"), document.getElementById("err_Date"), "Birth Date is a required field and must be entered ")
					|| !Check_Date(document.getElementById("tbx_Date"))
					)
				{
					validated = false;
				}

			//Check if Adult Content Always Selected
			if(document.getElementById("rbtn_Adult_Always").checked && validated)
				if(!CheckForBlank(document.getElementById("tbx_Date"), document.getElementById("err_Date"), "Birth Date is a required field and must be entered ")
					|| !Check_Date(document.getElementById("tbx_Date")))
				{
					validated = false;
				}

			if(validated)
				document.inet.submit();
			else
				objButton.disabled = false;

			event.returnValue = false;
			//If there is no error then will return true
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
	<jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=parent"/>
</td>
<td valign="top" class="contentBody">
<form action="mem_parental_save.jsp" method="post" name="inet">
<noscript class="error">
	This site requires JavaScript. If your browser supports JavaScript, please enable and try again...
</noscript>
<table border="0" cellpadding="1" cellspacing="0" style="display:none;" width="520"
	id="tbl_Register">
<tr valign="top">
	<td colspan="2"><h2>Parental Controls</h2></td>
</tr>
<tr>
	<td colspan="2"><div id="err_General" style="display:none" class="contentRed"></div></td>
</tr>
<tr valign="top">
	<td colspan="2" class="contentWithoutBorder">
		The Storm Media Player can filter out undesirable content by using the MPAA movie ratings, TV
		ratings, and other information provided by the content provider. When searching, content not
		matching the filter criteria will not be seen in the search results.</td>
</tr>
<tr align="left" valign="top">
	<td colspan="2" class="contentWithoutBorder">Please select the content that will be always be accessible:</td>
</tr>
<tr valign="top">
	<td width="160" align="right"><font size="2">Not Rated Content</font></td>
	<td width="376" align="left">&nbsp;
		<input id="cbx_Rating" name="cbx_Rating" type="checkbox" value="notrated"/></td>
</tr>
<tr>
	<td colspan="2" align="right">&nbsp;
		<table width="100%" border="0" cellpadding="2">
			<tr>
				<td width="50%" colspan="2" align="center" class="ratingLabel">MPAA Movie Ratings</td>
				<td colspan="2" align="center" class="ratingLabel">TV Ratings</td>
			</tr>
			<tr align="right">
				<td width="25%"><font size="2" face="Verdana">G </font>
					<input name="cbx_Rating" type="checkbox" value="g"/>
					&nbsp;</td>
				<td><font size="2" face="Verdana">R </font>
					<input name="cbx_Rating" type="checkbox" value="r"/>
					&nbsp;</td>
				<td width="25%"><font size="2" face="Verdana">TV-Y </font>
					<input name="cbx_Rating" type="checkbox" value="tvy"/>
					&nbsp;</td>
				<td><font size="2" face="Verdana">TV-PG </font>
					<input name="cbx_Rating" type="checkbox" value="tvpg"/>
					&nbsp;</td>
			</tr>
			<tr align="right">
				<td><font size="2" face="Verdana">PG </font>
					<input name="cbx_Rating" type="checkbox" value="pg"/>
					&nbsp;</td>
				<td><font size="2" face="Verdana">NC-17 </font>
					<input name="cbx_Rating" type="checkbox" value="nc17"/>
					&nbsp;</td>
				<td><font size="2" face="Verdana">TV-Y7 </font>
					<input name="cbx_Rating" type="checkbox" value="tvy7"/>
					&nbsp;</td>
				<td><font size="2" face="Verdana">TV-14 </font>
					<input name="cbx_Rating" type="checkbox" value="tv14"/>
					&nbsp;</td>
			</tr>
			<tr align="right">
				<td><font size="2" face="Verdana">PG-13 </font>
					<input name="cbx_Rating" type="checkbox" value="pg13"/>
					&nbsp;</td>
				<td>&nbsp;</td>
				<td><font size="2" face="Verdana">TV-Y7-FV </font>
					<input name="cbx_Rating" type="checkbox" value="tvy7fv"/>
					&nbsp;</td>
				<td><font size="2" face="Verdana">TV-MA </font>
					<input name="cbx_Rating" type="checkbox" value="tvma"/>
					&nbsp;</td>
			</tr>
			<tr align="right">
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td><font size="2" face="Verdana">TV-G </font>
					<input name="cbx_Rating" type="checkbox" value="tvg"/>
					&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td colspan="2" align="center" class="ratingLabel">iTunes Ratings</td>
			</tr>
			<tr align="right">
				<td><font size="2" face="Verdana">Clean</font>
					<input name="cbx_Rating" type="checkbox" value="clean"/>
					&nbsp;</td>
				<td><font size="2" face="Verdana">Explicit</font>
					<input name="cbx_Rating" type="checkbox" value="explicit"/>
					&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
		</table>
	</td>
</tr>
<tr align="left">
	<td colspan="2">&nbsp;<div id="err_Rating" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td colspan="2" align="right" class="contentWithoutBorder">In addition, all content, including adult content, can
		be made accessible by entering a unique adult PIN: (PIN will need to be re-entered with each session)</td>
</tr>
<tr align="left">
	<td colspan="2" valign="top"><font size="2" face="Verdana">
		&nbsp;&nbsp;&nbsp;
		<input name="rbtn_Adult" id="rbtn_Adult_Never" type="radio" value="Never" checked
			onClick="Disable_Pin_Date(this)"/>
		&nbsp;Adult content should never be accessible
	</font></td>
</tr>
<tr align="left">
	<td colspan="2"><font size="2" face="Verdana"> &nbsp;&nbsp;&nbsp;
		<input name="rbtn_Adult" id="rbtn_Adult_Pin" type="radio" value="PromptPassword"
			onClick="Enable_Pin_Date(this)"/>
		&nbsp;Adult content should be accessible after entering PIN
	</font></td>
</tr>
<tr>
	<td align="right" valign="top"><font size="2">Adult PIN:&nbsp;</font></td>
	<td align="left"><font size="1" face="Verdana">
		<input type="password" id="tbx_Adult_Pin" name="tbx_Adult_Pin" size="6" maxlength="6" disabled
			onKeyPress="IntIEKeyCap()"/></font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Adult_Pin" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td></td>
	<td><font size="1" face="Verdana">6 digits, numbers only</font></td>
</tr>
<tr align="left">
	<td colspan="2"><font size="2" face="Verdana">&nbsp;&nbsp;&nbsp;
		<input name="rbtn_Adult" id="rbtn_Adult_Always" type="radio" value="Always" onClick="Disable_Pin(this)"/>
		&nbsp;Adult content should always be accessible
	</font></td>
</tr>
<tr>
	<td align="right">&nbsp;</td>
	<td align="left">&nbsp;</td>
</tr>
<tr align="left">
	<td colspan="2" class="contentWithoutBorder">&nbsp;&nbsp;&nbsp;&nbsp;Your birth date must be supplied in order to
		access adult content :&nbsp;
	</td>
</tr>
<tr>
	<td align="right" valign="top"><font size="2" face="Verdana">Birth Date:&nbsp;</font></td>
	<td align="left"><font size="1" face="Verdana">
		<input type="text" id="tbx_Date" name="tbx_Date" size="10" maxlength="10"
			value="<%= newMember.Check_For_Null(newMember.getStr_date()) %>" disabled onBlur="Check_Date(this)"
			onKeyPress="IntIEKeyDate()"/></font><br/>
	</td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Date" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td></td>
	<td><font size="1" face="Verdana">m/d/yyyy</font></td>
</tr>
<tr>
	<td valign="baseline">&nbsp;</td>
	<td>&nbsp;</td>
</tr>
<tr>
	<td valign="baseline">&nbsp;</td>
	<td><input type="button" value="Cancel" name="btn_Cancel"
		onClick="javascript:location.href='cookie_exist_user.jsp'"/>
		&nbsp;&nbsp;
		<input type="button" value="Continue" id="btn_Continue" name="btn_Continue"
			onClick="javascript:Call_Validator()"/></td>
</tr>
</table>
</form>
</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
