<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
* Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
* Confidential and Proprietary
* See Legal.txt for additional notices.
*/
%>
<jsp:include flush="true" page="cookie_check.jsp" />
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<jsp:useBean id="readXML" class="com.inetvod.webapp.ReadXMLFile" scope="request"/>
<% 
	String [][] speedList = readXML.readXML("Con_Speed");
	newMember.member_Content_Details(newMember.getMember_id());
	if(newMember.getError_flag())
	{
%>
		<script  type="text/javascript">location.href="error.jsp"</script>
<%			
	}		
	
%>
<html>
<head>
<title>Content Formats</title>
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

	//Set default value as true
	var validated = true
		
	//Check if any field is Filled by user then all the fields are mandatory
	if (document.getElementById("cbx_Content_Streaming").checked == true || document.getElementById("cbx_Content_Download").checked == true )
	{
		if(document.getElementById("cbx_Content_Streaming").checked == true)
		{
			if(!CheckForCombo(document.getElementById("cmb_Speed"), document.getElementById("err_cmb_Speed"), "Connection Speed is a required field and must be selected "))
				validated = false;
		}
	}
	else
	{
		alert('Either "Include download content" or "Include streaming content" must be seleected.')
		validated = false;
	}
	
	if(validated)
		document.inet.submit(); 
	else
		objButton.disabled = false;
		
	event.returnValue=false;		
}
</script>

</head>
<body>
<jsp:include flush="true" page="../includes/header.jsp"/>
<div align="center">

  <table border="0" cellpadding="0" cellspacing="0" width="760">
    <tr>
      <td align="left" valign="top" class="leftside" width="222"><jsp:include flush="true" page="../includes/left_navigation.jsp?page=other&link=cont"/>  
      </td>
      <td valign="top" class="contentWithoutBorder"><form action="mem_content_save.jsp" method="post" name="inet">
          <noscript>
          <h1><font color="#FF0000">Your browser does not support JavaScript! Please enabale Javascript and try again...</font></h1>
          </noscript>
          <table border="0" cellpadding="1" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="520" id="tbl_Register" >
            <tr valign="top">
              <td colspan="2"><h2>Content Formats</h2></td>
            </tr>
            <tr valign="top">
              <td colspan="2" class="contentWithoutBorder" >
			  <div id="err_General" style="display:none" class="contentRed"></div>
			  Internet-based video content can be delivered in 1 of 2 ways: downloading and streaming.
                Each method has benefits and drawbacks. If instructed to do so, the iNetVOD Service can
              filter out content based on its delivery method.</td>
            </tr>
            
            <tr valign="top">
              <td align="right" >&nbsp;</td>
              <td width="490" align="left">&nbsp;</td>
            </tr>
            <tr valign="top">
              <td width="46" align="center" ><font size="2">
                <input id="cbx_Content_Download" name="cbx_Content_Download" type="checkbox" value="1" checked />
              </font></td>
              <td align="left"><font size="2">Include downloaded content . Downloaded content will always provide the best picture but
              will require some upfront time to download part of the show before viewing can begin.</font></td>
            </tr>
            <tr>
              <td colspan="2" align="right">&nbsp;</td>
            </tr>
            <tr valign="top">
              <td align="center" ><font size="2">
                <input id="cbx_Content_Streaming" name="cbx_Content_Streaming" type="checkbox" value="1" checked onClick="Check_Streaming_Selected();" />
              </font></td>
              <td align="left"><font size="2">Include streaming content . Streaming content can always be viewed immediately but will
              not have the same quality picture as downloaded content .</font></td>
            </tr>
            <tr valign="top">
              <td align="center" >&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr valign="top">
              <td align="center" >&nbsp;</td>
              <td align="left"  class="contentWithoutBorder">Please specify the connect speed of your broadband access . This value will be used to
                filter and select content that can be viewed over your existing connection . Selecting a
              speed to high will result in content that won&rsquo;t play or will be of very poor quality.</td>
            </tr>
            
            <tr>
              <td align="right" valign="top">&nbsp;</td>
              <td align="left">&nbsp;</td>
            </tr>
            <tr>
              <td align="right" valign="top">&nbsp;</td>
              <td align="left"><font size="2" face="Verdana">Connection Speed
			  <select name="cmb_Speed" id="cmb_Speed" >
                  <option value="0">-- Please Select --</option>
<%
					for(int i = 0; i < speedList.length; i++)
					{
%>

                    <option value="<%= speedList[i][1] %>"><%= speedList[i][0] %></option>
<%
					}
%>					
                </select>
				<div id="err_cmb_Speed" style="display:none" class="contentRed"></div>
              </font></td>
            </tr>
            
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td valign="baseline">&nbsp;</td>
              <td><input type="button" value="Cancel" name="btn_Cancel"  onClick="javascript:location.href='cookie_exist_user.jsp'"  />
                &nbsp;&nbsp;
                <input type="button" value="Continue" id="btn_Continue" name="btn_Continue" onClick="Call_Validator()" /></td>
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

	// Set values 
	var obj_Download = document.getElementById("cbx_Content_Download");	
	var obj_Stream = document.getElementById("cbx_Content_Streaming");	

	var obj_value = <%= newMember.getDownload() %>
	if(obj_value)
		obj_Download.checked = true;
	else
		obj_Download.checked = false;

	obj_value = <%= newMember.getStreaming() %>	
	if(obj_value)
		obj_Stream.checked = true;
	else
		obj_Stream.checked = false;

	obj_value_2 = "<%= newMember.getSpeed() %>"	;
	if(obj_value_2 != "undefined") 
		Select_Combo(document.getElementById("cmb_Speed"), obj_value_2);
	
	/*******************************************************/
	// Server Side error prompt	
	var url = document.location.href.split("?")
	var flag = -1
	if(url.length > 1)
		flag = <%= request.getParameter("flag") %>

	if (flag == 2)
	{
		Show_Last_Form_Values(url[1]);
		err_Obj = document.getElementById("err_General");
		err_Obj.innerHTML = "An error has occured. Try again...<br>";
		err_Obj.style.display = "inline";		
	}
	
	// Enable Speed combo on the basis of checkbox
	Check_Streaming_Selected();

	/*******************************************************/	
</script>
<jsp:include flush="true" page="../includes/footer.jsp"/>
</body>
</html>
