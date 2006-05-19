<%@ page import="com.inetvod.webapp.ReadXMLFile"%>
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
	String [][] cardList = ReadXMLFile.readXML(ReadXMLFile.CreditCardType);

	newMember.member_Card_Details(newMember.getMember_id());
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
	<title>Credit Card Information</title>
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

			Select_Combo(document.getElementById("cmb_Month"), <%= newMember.getExp_month()%>);
			Select_Combo(document.getElementById("cmb_Year"), <%= newMember.getExp_year()%>);
			Select_Combo(document.getElementById("cmb_Card_Type"), "<%= newMember.getCard_type()%>");
			Select_Combo(document.getElementById("cmb_Country"), "<%= newMember.getCountry_id()%>");

			var url = document.location.href.split("?")
			var flag = -1
			if(url.length > 1)
				flag = <%= request.getParameter("flag") %>

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
				CheckIfBlank(document.getElementById("tbx_Card_Name")) &&
				CheckIfComboSelect(document.getElementById("cmb_Card_Type")) &&
				CheckIfBlank(document.getElementById("tbx_Card_Number")) &&
				CheckIfComboSelect(document.getElementById("cmb_Month")) &&
				CheckIfComboSelect(document.getElementById("cmb_Year")) &&
				CheckIfBlank(document.getElementById("tbx_Code")) &&
				CheckIfBlank(document.getElementById("tbx_Add_1")) &&
				CheckIfBlank(document.getElementById("tbx_Add_2"))  &&
				CheckIfBlank(document.getElementById("tbx_City")) &&
				CheckIfBlank(document.getElementById("tbx_State")) &&
				CheckIfBlank(document.getElementById("tbx_Zip")) &&
				CheckIfComboSelect(document.getElementById("cmb_Country")) &&
				CheckIfBlank(document.getElementById("tbx_Phone"))
				)
				check_blank_flag = false;

			//Set default value as true
			var validated = true

			//If any field is Filled by the user then check for all the mandatory fields and do the validation.
			if(check_blank_flag)
			{
				if(
					CheckForBlank(document.getElementById("tbx_Card_Name"), document.getElementById("err_Card_Name"), "Name on Card is a required field and must be entered ")
						== false ||
					CheckForLength(document.getElementById("tbx_Card_Name"), 64, document.getElementById("err_Card_Name"), "Name on Card character length should be less then 64")
						== false ||
					CheckForCombo(document.getElementById("cmb_Card_Type"), document.getElementById("err_Card_Type"), "Card Type is a required field and must be selected ")
						== false ||
					CheckForBlank(document.getElementById("tbx_Card_Number"), document.getElementById("err_Card_Number"), "Card Number is a required field and must be entered ")
						== false ||
					CheckForLength(document.getElementById("tbx_Card_Number"), 32, document.getElementById("err_Card_Number"), "Card Number character length should be less then 32")
						== false ||
					CheckForCombo(document.getElementById("cmb_Month"), document.getElementById("err_Month"), "Expiration Month is a required field and must be selected ")
						== false ||
					CheckForCombo(document.getElementById("cmb_Year"), document.getElementById("err_Year"), "Expiration Year is a required field and must be selected ")
						== false ||
					CheckForBlank(document.getElementById("tbx_Code"), document.getElementById("err_Code"), "Security Code is a required field and must be entered ")
						== false ||
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

			if(validated)
				document.inet.submit();

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
	<jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=card"/>
</td>
<td valign="top" class="contentWithoutBorder">
<form action="mem_card_save.jsp" method="post" name="inet">
<noscript>
	<h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try
		again...</font></h1>
</noscript>
<table border="0" cellpadding="1" cellspacing="0" style="display:none;" width="520"
	id="tbl_Register">
<tr valign="top">
	<td colspan="2"><h2>Credit Card Information</h2></td>
</tr>
<tr>
	<td colspan="2"><div id="err_General" style="display:none" class="contentRed"></div></td>
</tr>
<tr valign="top">
	<td colspan="2" class="contentWithoutBorder">
		(Optional) In order to purchase Pay-Per-Content through the iNetVOD System, your credit card
		will need to be on file with the specific content provider or on file with iNetVOD. If stored with
		iNetVOD, upon your consent of a rental purchase, your credit card information will be securely
		transmitted to the specific content provider.</td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Name on Card&nbsp;</font></td>
	<td align="left">
		<input type="text" id="tbx_Card_Name" name="tbx_Card_Name" size="40" maxlength="64"
			value="<%= newMember.Check_For_Null(newMember.getName_on_card()) %>"/>
</tr>
<tr>
	<td></td>
	<td><div id="err_Card_Name" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Card Type&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<select name="cmb_Card_Type" id="cmb_Card_Type">
			<option value="">-- Select Card Type --</option>
			<%
				for(int i = 0; i < cardList.length; i++)
				{
			%>

			<option value="<%= cardList[i][1] %>"><%= cardList[i][0] %></option>
			<%
				}
			%>
		</select>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Card_Type" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Card Number&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_Card_Number" name="tbx_Card_Number" size="32" maxlength="32"
			value="<%= newMember.Check_For_Null(newMember.getCard_number())%>" onKeyPress="IntIEKeyCap()"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Card_Number" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Expiration Date&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<select name="cmb_Month" id="cmb_Month">
			<option value="">-- Month --</option>
			<option value="01">-- 01 --</option>
			<option value="02">-- 02 --</option>
			<option value="03">-- 03 --</option>
			<option value="04">-- 04 --</option>
			<option value="05">-- 05 --</option>
			<option value="06">-- 06--</option>
			<option value="07">-- 07 --</option>
			<option value="08">-- 08 --</option>
			<option value="09">-- 09 --</option>
			<option value="10">-- 10 --</option>
			<option value="11">-- 11 --</option>
			<option value="12">-- 12 --</option>
		</select>
		<select name="cmb_Year" id="cmb_Year">
			<option value="">-- Year --</option>
			<option value="2006">-- 2006 --</option>
			<option value="2007">-- 2007 --</option>
			<option value="2008">-- 2008 --</option>
			<option value="2009">-- 2009 --</option>
			<option value="2010">-- 2010 --</option>
			<option value="2011">-- 2011 --</option>
			<option value="2012">-- 2012 --</option>
			<option value="2013">-- 2013 --</option>
			<option value="2014">-- 2014 --</option>
			<option value="2015">-- 2015 --</option>
			<option value="2016">-- 2016 --</option>
			<option value="2017">-- 2017 --</option>
		</select>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Month" style="display:none" class="contentRed"></div>
		<div id="err_Year" style="display:none" class="contentRed"></div>
	</td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Security Code&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_Code" name="tbx_Code" size="4" maxlength="4"
			value="<%= newMember.Check_For_Null(newMember.getSecurity_code())%>" onKeyPress="IntIEKeyCap()"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Code" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td align="right">&nbsp;</td>
	<td align="left">&nbsp;</td>
</tr>
<tr>
	<td colspan="2" align="left" class="contentWithoutBorder">Credit Card Billing Address:</td>
</tr>
<tr>
	<td align="right" nowrap><font size="2">Address Line 1&nbsp;</font></td>
	<td align="left" valign="top"><font size="2" face="Verdana">
		<input type="text" id="tbx_Add_1" name="tbx_Add_1" size="40" maxlength="64"
			value="<%= newMember.Check_For_Null(newMember.getAddress_1())%>"/>
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
	<td align="left"><font size="2" face="Verdana">
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
	<td align="right" valign="top"><font size="2">Phone&nbsp;</font></td>
	<td align="left"><font size="2" face="Verdana">
		<input type="text" id="tbx_Phone" name="tbx_Phone" size="32" maxlength="32"
			value="<%= newMember.Check_For_Null(newMember.getPhone())%>"/>
	</font></td>
</tr>
<tr>
	<td></td>
	<td><div id="err_Phone" style="display:none" class="contentRed"></div></td>
</tr>
<tr>
	<td></td>
	<td><font size="1" face="Verdana">Used to verify your credit card </font></td>
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
		<input type="button" id="btn_Continue" value="Continue" name="btn_Continue" onClick="Call_Validator()"/></td>
</tr>
</table>
</form>
</td></tr></table>
</div>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
