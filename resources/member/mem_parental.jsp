<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright � 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:include flush="true" page="cookie_check.jsp" />
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<% 

	newMember.member_Parental_Details(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
		<script  type="text/javascript">location.href="error.jsp"</script>
<%			
	}		

%>
<html>
<head>
<title>Parental Controls</title>
<link rel="stylesheet" href="../twc615.css" type="text/css" />
<link href="../omnie.css" rel="stylesheet" type="text/css" />
<script src="../includes/form_validations.js" type="text/javascript"></script>
<script type="text/javascript">
function Call_Validator()
{
	var objButton = document.getElementById("btn_Continue");
	objButton.disabled = true; 

	//On submit will hide all the error messages 
	Hide_All_Error_Messages();

	validated = true;
	if(Check_Rating_Selected() == false)
		validated = false;
	
	//Check if Adult pin Selected 
	if(document.getElementById("rbtn_Adult_Pin").checked && validated)
		if(	CheckForBlank(document.getElementById("tbx_Adult_Pin"), document.getElementById("err_Adult_Pin"), "Adult PIN is a required field and must be entered ") == false || 
			CheckForBlank(document.getElementById("tbx_Date"), document.getElementById("err_Date"), "Birth Date is a required field and must be entered ") == false
			)		
		{
			validated = false;
		}
		else
		{
			if(document.getElementById("tbx_Adult_Pin").value.length < 6 || document.getElementById("tbx_Adult_Pin").value.length > 6) 
			{
				var err_Obj = document.getElementById("err_Adult_Pin");
				err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Adult PIN should be 6 characters long";
				err_Obj.style.display = "inline";		
				validated = false;
			}
			else if(!Check_Date(document.getElementById("tbx_Date")))
				validated = false;
		}

	//Check if Adult Content Always Selected 
	if(document.getElementById("rbtn_Adult_Always").checked && validated)
		if(CheckForBlank(document.getElementById("tbx_Date"), document.getElementById("err_Date"), "Birth Date is a required field and must be entered ") == false)		
			validated = false;
		else if(!Check_Date(document.getElementById("tbx_Date")))
				validated = false;
				
	if(validated)
		document.inet.submit(); 
	else
		objButton.disabled = false; 
		
	event.returnValue=false;		
	//If there is no error then will return true 		
//	return validated;
}
</script>

</head>
<body>
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

  <table border="0" cellpadding="0" cellspacing="0" width="760">
    <tr>
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=parent"/>  
      </td>
      <td valign="top" class="contentWithoutBorder"><form action="mem_parental_save.jsp" method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register" >
            <tr valign="top">
              <td colspan="2"><h2>Parental Controls</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" class="contentWithoutBorder" >
			  <div id="err_General" style="display:none" class="contentRed"></div>
			  The iNetVOD Service can filter out undesirable content by using the MPAA movie ratings, TV
                ratings, and other information provided by the content provider . When searching , content not
              matching the filter criteria will not be seen in the search results.</td>
            </tr>
            <tr align="left" valign="top">
              <td colspan="2" class="contentWithoutBorder" >Please select the content that will be always be accessible:</td>
            </tr>
            <tr valign="top">
              <td width="160" align="right" ><font size="2">Not Rated Content</font></td>
              <td width="376" align="left">&nbsp;
              <input id="cbx_Not_Rated" name="cbx_Not_Rated" type="checkbox" value="1" checked /></td>
            </tr>
            <tr>
              <td colspan="2" align="right">&nbsp;
                <table width="100%"  border="0" cellpadding="2">
                  <tr>
                    <td width="50%" colspan="2" align="center" bgcolor="#CCCCCC"><strong><font size="2" face="Verdana">MPAA Movie Ratings</font></strong></td>
                    <td colspan="2" align="center" bgcolor="#CCCCCC"><strong><font size="2" face="Verdana">TV Ratings</font></strong></td>
                  </tr>
                  <tr align="right">
                    <td width="25%"><font size="2" face="Verdana">G </font>
                    <input name="cbx_Rating" type="checkbox" value="G" checked />
                    &nbsp;</td>
                    <td><font size="2" face="Verdana">R </font>
                    <input name="cbx_Rating" type="checkbox"  value="R" />
                    &nbsp;</td>
                    <td width="25%"><font size="2" face="Verdana">TV-Y </font>
                    <input name="cbx_Rating" type="checkbox" value="TV-Y" checked />
                    &nbsp;</td>
                    <td><font size="2" face="Verdana">TV-PG </font>
                    <input name="cbx_Rating" type="checkbox" value="TV-PG" checked />
                    &nbsp;</td>
                  </tr>
                  <tr align="right">
                    <td><font size="2" face="Verdana">PG </font>
                    <input name="cbx_Rating" type="checkbox"  value="PG" checked />
                    &nbsp;</td>
                    <td><font size="2" face="Verdana">NC-17 </font>
                    <input name="cbx_Rating" type="checkbox"  value="NC-17" />
                    &nbsp;</td>
                    <td><font size="2" face="Verdana">TV-Y7 </font>
                    <input name="cbx_Rating" type="checkbox" value="TV-Y7" checked />
                    &nbsp;</td>
                    <td><font size="2" face="Verdana">TV-14 </font>
                    <input name="cbx_Rating" type="checkbox" value="TV-14" checked />
                    &nbsp;</td>
                  </tr>
                  <tr align="right">
                    <td><font size="2" face="Verdana">PG-13 </font>
                    <input name="cbx_Rating" type="checkbox" value="PG-13" checked />
                    &nbsp;</td>
                    <td>&nbsp;</td>
                    <td><font size="2" face="Verdana">TV-Y7-FV </font>
                    <input name="cbx_Rating" type="checkbox" value="TV-Y7-FV" checked />
                    &nbsp;</td>
                    <td><font size="2" face="Verdana">TV-MA </font>
                    <input name="cbx_Rating" type="checkbox" value="TV-MA" />
                    &nbsp;</td>
                  </tr>
                  <tr align="right">
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td><font size="2" face="Verdana">TV-G </font>
                    <input name="cbx_Rating" type="checkbox" value="TV-G" checked />
                    &nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </table>
			  </td>
            </tr>
            <tr align="left">
              <td colspan="2">&nbsp;<div id="err_Rating" style="display:none" class="contentRed"></div></td>
            </tr>
            <tr>
              <td colspan="2" align="right" class="contentWithoutBorder">In addition, all content, including adult content , can be made accessible by entering a unique
              adult PIN: (PIN will need to be re-entered with each session)</td>
            </tr>
            <tr align="left">
              <td colspan="2" valign="top"><font size="2" face="Verdana"> 
                &nbsp;&nbsp;&nbsp;
                <input name="rbtn_Adult" id="rbtn_Adult_Never" type="radio" value="Never" checked onClick="Disable_Pin_Date(this)" />
				&nbsp;&nbsp;Adult content should never be accessible                
              </font></td>
            </tr>
            <tr align="left">
              <td colspan="2"><font size="2" face="Verdana"> &nbsp;&nbsp;&nbsp;
                  <input name="rbtn_Adult" id="rbtn_Adult_Pin" type="radio" value="PromptPassword" onClick="Enable_Pin_Date(this)" />
					&nbsp;&nbsp;Adult content should be accessible after entering PIN&nbsp;
                    <div id="err_Add_2" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            <tr>
              <td align="right" valign="top"><font size="2">Adult PIN: </font></td>
              <td align="left"><font size="1" face="Verdana">&nbsp;
                  <input type="password" id="tbx_Adult_Pin" name="tbx_Adult_Pin"  value="<%= newMember.Check_For_Null(newMember.getPin()) %>" size="6" maxlength="6" disabled onKeyPress="IntIEKeyCap()"  />
                  <br />
                  &nbsp;&nbsp;6 digits, numbers only 
				  <div id="err_Adult_Pin" style="display:none" class="contentRed"></div>               
              </font></td>
            </tr>
            <tr align="left">
              <td colspan="2"><font size="2" face="Verdana">&nbsp;&nbsp;&nbsp;
                  <input name="rbtn_Adult" id="rbtn_Adult_Always" type="radio" value="Always" onClick="Disable_Pin(this)" />
					&nbsp;&nbsp;Adult content should always be accessible               
              </font></td>
            </tr>
            <tr>
              <td align="right">&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr align="left">
              <td colspan="2" class="contentWithoutBorder" >&nbsp;&nbsp;&nbsp;&nbsp;Your birth date must be supplied in order to access adult content :&nbsp;
              </td>
            </tr>
            <tr>
              <td align="right" valign="top"><font size="2" face="Verdana">Birth Date:</font></td>
              <td align="left"><font size="1" face="Verdana">&nbsp;
                    <input type="text" id="tbx_Date" name="tbx_Date" size="10" maxlength="10" value="<%= newMember.Check_For_Null(newMember.getStr_date()) %>" disabled onBlur="Check_Date(this)" onKeyPress="IntIEKeyDate()" />
                    </font><br />
                    <font size="1" face="Verdana">&nbsp;&nbsp;&nbsp;mm/dd/yyyy</font>
					<div id="err_Date" style="display:none" class="contentRed"></div>
              </td>
            </tr>
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td><input type="button" value="Cancel" name="btn_Cancel" onClick="javascript:location.href='cookie_exist_user.jsp'" />
                &nbsp;&nbsp;
                <input type="button" value="Continue" id="btn_Continue" name="btn_Continue" onClick="javascript:Call_Validator()" />              </td>
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
	var radio_Value = "<%= newMember.getInclude_adult() %>";
	var var_rating = "<%= newMember.getRatingId() %>";

	var url = document.location.href.split("?");
	var flag = -1;
	if(url.length > 1)
		flag = <%= request.getParameter("flag") %>

	if (flag == 2)
	{
		Show_Form_Values(url[1]);
		err_Obj = document.getElementById("err_General");
		err_Obj.innerHTML = "An error has occured. Try again...<br>";
		err_Obj.style.display = "inline";		
	}

	Select_Ratings(var_rating);
	Select_Radio(document.getElementById("rbtn_Adult_Never"), radio_Value);
	Select_Radio(document.getElementById("rbtn_Adult_Pin"), radio_Value);
	Select_Radio(document.getElementById("rbtn_Adult_Always"), radio_Value);
	
	Enable_Pin_Date(document.getElementById("rbtn_Adult_Pin"));
	Disable_Pin(document.getElementById("rbtn_Adult_Always"));

//Method to show the last values of form on error
function Show_Form_Values(queryString)
{
	//flag=2&tbx_Card_Name=qwe&cmb_Card_Type=MasterCard&tbx_Card_Number=23421&cmb_Month=02&cmb_Year=2008&tbx_Code=234&tbx_Add_1=wqe&tbx_Add_2=awe&tbx_City=asd&tbx_State=asd&tbx_Zip=asd&cmb_Country=BA&tbx_Phone=sasd324
	var arr_QueryParam = null;
	var obj = null;	
	var arr_QueryString = queryString.split("&");
	for (count=1; count < arr_QueryString.length ; count++)
	{
		arr_QueryParam = arr_QueryString[count].split("=");
		obj = document.getElementById(arr_QueryParam[0]);
		
		if (obj.type == "text")
			obj.value = arr_QueryParam[1];
		else if (obj.type == "checkbox")
			var_rating = arr_QueryParam[1];
		else if (obj.type == "radio")
			radio_Value = arr_QueryParam[1];
	}
}	

</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
