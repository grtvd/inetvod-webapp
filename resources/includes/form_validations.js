//Form validations

function CheckForBlank(obj, err_Obj, comment)
{// Method to check for Text field for Blank value and display the error message
	if(obj.value == "")
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}

function CheckForCombo(obj, err_Obj, comment)
{// Method to check for Combo box for empty value and display the error message
	if(obj.value == "")
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}

function CheckForCheckBox(obj, err_Obj, comment)
{// Method to check for Check Box for "Checked" and display the error message
	if(!obj.checked)
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}

function validateEmailFormat(obj, err_Obj, comment)
{// Call Email Validator method and display the error message
	if(!validateEmail(obj.value))
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}


function validateEmail(email)
{// Email validator
    var splitted = email.match("^(.+)@(.+)$");
    if(splitted == null) return false;
    if(splitted[1] != null )
    {
      var regexp_user=/^\"?[\w-_\.]*\"?$/;
      if(splitted[1].match(regexp_user) == null) return false;
    }
    if(splitted[2] != null)
    {
      var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
      if(splitted[2].match(regexp_domain) == null)
      {
	    var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
	    if(splitted[2].match(regexp_ip) == null) return false;
      }// if
      return true;
    }
return false;
}

function CompareObjectValues(obj, confirm_obj, err_Obj, comment)
{// Method to compare the values of 2 text fields and display the error message
	if(obj.value == confirm_obj.value)
		return true;
	else
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		confirm_obj.focus();
		return false;
	}
}

function ValidatePassword(obj, err_Obj, comment)
{// Check for the length of the password and display error message
	if(obj.value.length < 6 || obj.value.length > 16)
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}

function ValidateAnswer(obj, err_Obj, comment)
{// Check for the length of the Answer and display error message
	if(obj.value.length > 32 )
	{
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}

function CheckForLength(obj, objMaxLength, err_Obj, comment)
{// Check for the length of the al the fields and display error message
	if(obj.value.length > objMaxLength )
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}

function CheckExactLength(obj, objMaxLength, err_Obj, comment)
{// Check for the length of the al the fields and display error message
	if(obj.value.length != objMaxLength )
	{
		err_Obj.innerHTML = comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else
		return true;
}


function ShowErrorMsgByID(objID, msg)
{
	var err_Obj;

	err_Obj = document.getElementById(objID);
	if(err_Obj)
	{
		err_Obj.innerHTML = msg;
		err_Obj.style.display = "inline";
	}
	else
		alert("Object, ID(" + objID + "), not found");
}

function ShowGeneralError(msg)
{
	ShowErrorMsgByID("err_General", (msg) ? msg : "An error has occured. Please try again...");
}

function Hide_All_Error_Messages()
{// Hide all error messages
	var obj_id
	// get the ARRAY of "Div" tags
	var divs = document.getElementsByTagName("div");

	//loop for no of "Div" Tags
	for(var i=0;i<divs.length;i++)
	{
		// Split the id of Tag
		obj_id = (divs[i].id).split("_")

		//If the div tag consist "err" then it si error Div Tag and will hide the tag
		if(obj_id[0]=="err")
		{
			divs[i].style.display = "none"
		}
	}
}


function IntIEKeyCap()
{
	if ((window.event.keyCode < 47) || (window.event.keyCode > 57) || (window.event.keyCode == 47))
	{
		window.event.keyCode = 0
	}
}

function IntIEKeyDate()
{
	if ((window.event.keyCode < 47) || (window.event.keyCode > 57))
	{
		window.event.keyCode = 0
	}
}

function CheckIfBlank(obj)
{
	if(obj.value == "")
		return true;
	else
		return false;

}

function CheckIfComboSelect(obj)
{
	if(obj.value == "")
		return true;
	else
		return false;
}

function Select_Combo(obj, selectedValue)
{
	for(i = 0; i < obj.length; i++)
	{
		if(obj.options[i].value == selectedValue)
			obj.options[i].selected = true;
	}
}


function Check_Rating_Selected()
{ // Check if any rating is selected or not
	var count = 0;
	boxes = document.inet.cbx_Rating.length
	for (i = 0; i < boxes; i++)
	{
		if (document.inet.cbx_Rating[i].checked)
		{
			count = count + 1;
		}
	}

	if (count <= 0)
	{
		var err_Obj = document.getElementById("err_Rating");
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "At least one rating must be selected";
		err_Obj.style.display = "inline";
		return false;
	}

	return true;
}

function Select_Ratings(ratings)
{// Select the check boxes of ratings
	var count = 0;
	if (ratings.length > 1)
	{
		boxes = document.inet.cbx_Rating.length
		for (i = 0; i < boxes; i++)
		{
			strValue = "," + document.inet.cbx_Rating[i].value + "," ;
			if (ratings.indexOf(strValue) >= 0 )
				document.inet.cbx_Rating[i].checked = true;
			else
				document.inet.cbx_Rating[i].checked = false;
		}
	}
}


function Disable_Pin_Date(obj)
{
	if(obj.checked)
	{
		document.getElementById("tbx_Adult_Pin").value = "";
		document.getElementById("tbx_Date").value = "";
		document.getElementById("tbx_Adult_Pin").disabled = true;
		document.getElementById("tbx_Date").disabled = true;
	}
}

function Enable_Pin_Date(obj)
{
	if(obj.checked)
	{
		document.getElementById("tbx_Adult_Pin").disabled = false;
		document.getElementById("tbx_Date").disabled = false;
	}
}

function Disable_Pin(obj)
{
	if(obj.checked)
	{
		document.getElementById("tbx_Adult_Pin").value = "";
		document.getElementById("tbx_Adult_Pin").disabled = true;
		document.getElementById("tbx_Date").disabled = false;
	}
}

//To validate the date
function Check_Date(obj)
{
	var formatErrMsg = "Date format should be m/d/yyyy"
	var effectdate = obj.value;
	var effectdate0;
	var effectdate1;
	var effectdate2;

	if (!effectdate || (effectdate == ""))
		return false;

	var len = effectdate.split("/").length;
	var now = new Date();
	var currentYear = now.getFullYear();
	var flag = true;

	if((len != 2) && (len != 3))
	{
		obj.focus();
		ShowErrorMsgByID("err_Date", formatErrMsg);
		return false;
	}

	effectdate0 = effectdate.split("/")[0];	//Month
	effectdate1 = effectdate.split("/")[1];	//Date
	if(len == 3)
		effectdate2 = effectdate.split("/")[2];	//Year
	else
		effectdate2 = "" + currentYear;

	if( isNaN(effectdate0) || isNaN(effectdate1) || isNaN(effectdate2)
		|| (effectdate0.length == 0) || (effectdate1.length == 0) || (effectdate2.length == 0))
	{
		obj.focus();
		ShowErrorMsgByID("err_Date", formatErrMsg);
		return false ;
	}

	var month = parseInt(effectdate0, 10);
	var day = parseInt(effectdate1, 10);
	var year = parseInt(effectdate2, 10);

	if(year < 100)
	{
		if(year < 20)
			year += 2000;
		else
			year += 1900;
	}

	if ((month < 1) || (month > 12))
	{
		obj.focus();
		ShowErrorMsgByID("err_Date", "Month should be between 1 and 12");
		return false;
	}

	var maxDay = 31;	//(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
	if (month == 4 || month == 6 || month == 9 || month == 11 )
	{
		maxDay = 30;
	}
	else if (month == 2)
	{
		if (year % 4 == 0)
			maxDay = 29;
		else
			maxDay = 28;
	}

	if ((day < 1) || (day > maxDay))
	{
		obj.focus();
		ShowErrorMsgByID("err_Date", "Day should be between 1 and " + maxDay);
		return false;
	}

	// redisplay (year may have been updated)
	obj.value = month + "/" + day + "/" + year;

	if (year > currentYear)
	{
		flag = false;
	}
	else if(year == currentYear)
	{
		 if(month > now.getMonth())
		 {
			 flag = false;
		 }
		 else if(month == now.getMonth())
		 {
			if(day > now.getDate())
			{
				 flag = false;
			}
		 }
	}

	if(!flag)
	{
		obj.focus();
		ShowErrorMsgByID("err_Date", "Birth Date cannot be greater then current Date");
		return false;
	}

	return true;
}

function Check_Streaming_Selected()
{
	var obj = document.getElementById("cbx_Content_Streaming");
	var obj_Speed = document.getElementById("cmb_Speed");

	if(obj.checked)
		obj_Speed.disabled = false;
	else
		obj_Speed.disabled = true;
}

function Select_Radio(objID, selectedValue)
{
	var objList = document.getElementsByName(objID);

	if(objList && objList.length)
	{
		for(var items = 0; items < objList.length; items++)
		{
			if(objList[items].type == "radio")
				objList[items].checked = (objList[items].value == selectedValue);
		}
	}
}
/*
function fire()
{
	if (window.event.keyCode==13)
		Call_Validator();
}
*/

function Show_Last_Form_Values(queryString)
{
	if(!queryString)
		return;

	var arr_QueryParam = null;
	var objList = null;
	var obj = null;
	var arr_QueryString = queryString.split("&");
	for (var count = 0; count < arr_QueryString.length ; count++)
	{
		arr_QueryParam = arr_QueryString[count].split("=");

		objList = document.getElementsByName(arr_QueryParam[0])
		obj = document.getElementById(arr_QueryParam[0]);

		if(objList && objList.length && (objList.length > 1) && (objList[0].type == "radio"))
		{
			for(var items = 0; items < objList.length; items++)
				objList[items].checked = (objList[items].value == arr_QueryParam[1]);
		}
		else if(obj)
		{
			if (obj.type == "text")
				obj.value = arr_QueryParam[1];
			else if (obj.type == "hidden")
				obj.value = arr_QueryParam[1];
			else if (obj.type == "select-one")
				Select_Combo(obj, arr_QueryParam[1]);
			else if (obj.type == "checkbox")
				Select_CheckBox(obj, arr_QueryParam[1]);
		}
	}

}

function Select_CheckBox(obj, value)
{// Select the check boxes
	if(obj.value == value)
		obj.checked = true;
	else
		obj.checked = false;
}


function setFocus()
{
	if(document.forms[0])
	{
		for(var i = 0; i < document.forms[0].elements.length; i++)
		{
			if(document.forms[0].elements[i].type == "text" && !document.forms[0].elements[i].disabled)
			{
				document.forms[0].elements[i].focus();
				return;
			}
		}
	}
}


function fire(evt)
{
	keyCode = evt.keyCode || evt.which;
	if (keyCode == 13 )
		Call_Validator();
}

function addEvent(obj, evType, fn, useCapture)
{
	// General function for adding an event listener
	if (obj.addEventListener)
	{
		obj.addEventListener(evType, fn, useCapture);
		return true;
	}
	else if (obj.attachEvent)
	{
		var r = obj.attachEvent("on" + evType, fn);
		return r;
	}
}

function addKeyEvent()
{
	// Specific function for this situation
	var e = (document.addEventListener) ? 'keypress' : 'keydown';
	addEvent(document,e,fire,false);
}


