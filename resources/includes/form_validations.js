//Form validations

function CheckForBlank(obj, err_Obj, comment)
{// Method to check for Text field for Blank value and display the error message
	if(obj.value == "")
	{
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
		err_Obj.style.display = "inline";
		obj.focus();
		return false;
	}
	else 
		return true;
}

function CheckForCombo(obj, err_Obj, comment)
{// Method to check for Combo box for 0 initial value and display the error message
	if(obj.value == 0)
	{
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
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
		err_Obj.innerHTML = "<br>" + comment;
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
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
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
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
		err_Obj.style.display = "inline";	
		confirm_obj.focus();
		return false;
	}
}

function ValidatePassword(obj, err_Obj, comment)
{// Check for the length of the password and display error message
	if(obj.value.length < 6 || obj.value.length > 16)
	{
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
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
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
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
		err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + comment;
		err_Obj.style.display = "inline";		
		obj.focus();		
		return false;
	}
	else
		return true;
}


function Hide_All_Error_Messages()
{// Hide all error messages
	var obj_id 
	// get the ARRAY of "Div" tags
	var divs = document.getElementsByTagName("div"); 
	
	//loop for no of "Div" Tags
	for(i=0;i<divs.length;i++) 
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
	if(obj.value == 0)
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
	
	var effectdate = obj.value;
	
	if (effectdate != "")
	{
		var len = effectdate.split("/").length;
		var now = new Date();
		var flag = true;
		
		if (len == 3)
		{
			effectdate0 = effectdate.split("/")[0];	//Month
			effectdate1 = effectdate.split("/")[1];	//Date
			effectdate2 = effectdate.split("/")[2];	//Year


			if( isNaN(effectdate0) || isNaN(effectdate1) || isNaN(effectdate2) )
			{
				obj.value = "";
				var err_Obj = document.getElementById("err_Date");
				err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date Format should be mm/dd/yyyy.";
				err_Obj.style.display = "inline";	
				return false ;
			}

			if (effectdate0.length > 2 )
			{
				obj.focus();
				var err_Obj = document.getElementById("err_Date");
				err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Month is invalid and it should be less then 2 digits.";
				err_Obj.style.display = "inline";	
				return false ;
			}
			else if (effectdate1.length > 2 )
			{
				obj.focus();				
				var err_Obj = document.getElementById("err_Date");
				err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date is invalid and it should be less then 2 digits.";
				err_Obj.style.display = "inline";	
				return false ;
			}
			else if (!(effectdate2.length == 2 || effectdate2.length == 4))
			{
				obj.focus();				
				var err_Obj = document.getElementById("err_Date");
				err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Year is invalid and it should be 2 or 4 digits.";
				err_Obj.style.display = "inline";	
				return false ;
			}
			else
			{
				if (parseInt(effectdate0, 10) < 1 || parseInt(effectdate0, 10) > 12)
				{
					obj.focus();				
					var err_Obj = document.getElementById("err_Date");
					err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Month is not valid and it should be between 1 and 12";
					err_Obj.style.display = "inline";	
					return false;
				}
				
				var currentYear = "" + now.getFullYear();
				if (effectdate2.length == 2)
					currentYear  = currentYear.substring(2);


				if (effectdate2 > currentYear)
				{
					flag = false;
				}
				else if(effectdate2 == currentYear)
				{
					 if(effectdate0 > now.getMonth())
					 {
						 flag = false;
					 }
					 else if(effectdate0 == now.getMonth())
					 {
						if(effectdate1 > now.getDate())
						{
							 flag = false;
						}
					 }
				}
				if(!flag)
				{
					obj.focus();				
					var err_Obj = document.getElementById("err_Date");
					err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Birth Date cannot be greater then current Date";
					err_Obj.style.display = "inline";	
					return false;
				}
				else
				{
					var err_Obj = document.getElementById("err_Date");
					err_Obj.style.display = "none";	
				}
				
/*				if (effectdate2 < 1900)
				{
					obj.focus();				
					var err_Obj = document.getElementById("err_Date");
					err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Year is not valid its should be greater then 1900";
					err_Obj.style.display = "inline";	
					return false;
				} //if (effectdate2 < 1900)
				else 
				{
*/					
					if (effectdate0.length > 2)
					{
						obj.focus();				
						var err_Obj = document.getElementById("err_Date");
						err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Month is not valid its should be less 2 digit";
						err_Obj.style.display = "inline";	
						return false;
					} //if (effectdate1.length > 2)
					else
					{
						if (effectdate0 > 12)
						{
							obj.focus();				
							var err_Obj = document.getElementById("err_Date");
							err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Month is not valid it should be less then 12";
							err_Obj.style.display = "inline";	
							return false;
						} //if (effectdate1 > 12)
						else 
						{
							if  (effectdate1.length > 2)
							{
								obj.focus();				
								var err_Obj = document.getElementById("err_Date");
								err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date shoud be less then 2 digit";
								err_Obj.style.display = "inline";	
								return false;
							} //if  (effectdate0.length > 2)
							else
							{
								if (effectdate0 == 1 || effectdate0 == 3 || effectdate0 == 5 || effectdate0 == 7 || effectdate0 == 8 || effectdate0 == 10 || effectdate0 == 12)
								{
									if  (effectdate1 > 31)
										{
											obj.focus();				
											var err_Obj = document.getElementById("err_Date");
											err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date should be less then 31";
											err_Obj.style.display = "inline";	
											return false;
										} //if  (effectdate0 > 31)
								} //if (effectdate1 == 1 || effectdate1 == 3 || effectdate1 == 5 || effectdate1 == 7 || effectdate1 == 8 || effectdate1 == 10 || effectdate1 == 12)
								else if (effectdate0 == 4 || effectdate0 == 6 || effectdate0 == 9 || effectdate0 == 11 )
								{
									if  (effectdate1 > 30)
										{
											obj.focus();				
											var err_Obj = document.getElementById("err_Date");
											err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date should be less then 30";
											err_Obj.style.display = "inline";	
											return false;
										} //if  (effectdate0 > 30)
								} //else if (effectdate1 == 4 || effectdate1 == 6 || effectdate1 == 9 || effectdate1 == 11 )
								else if (effectdate0 == 2)
								{
									if (effectdate2 % 4 == 0)
									{
										if (effectdate1 > 29)
										{
											obj.focus();				
											var err_Obj = document.getElementById("err_Date");
											err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date should be less then 29";
											err_Obj.style.display = "inline";	
											return false;
										} //if (effectdate0 > 29)
									}  //if (effectdate2 % 4 == 0)
									else 
									{
										if (effectdate1 > 28)
										{
											obj.focus();				
											var err_Obj = document.getElementById("err_Date");
											err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date should be less then 28";
											err_Obj.style.display = "inline";	
											return false;
										} //if (effectdate0 > 28)
										return true ;
									} //else else if (effectdate1 == 2)
									return true ;
								} //else if (effectdate1 == 2)
								return true ;
							}
							return true ;
						}
						return true ;
					}
/*					return true ;
				}
*/				
				return true ;
			}
			return true;
		} //if (effectdate1 !="" && effectdate2 !="" && effectdate0 != "")
		else if(len > 0)
		{
			obj.focus();				
			var err_Obj = document.getElementById("err_Date");
			err_Obj.innerHTML = "<br>&nbsp;&nbsp;&nbsp;" + "Date Format should be mm/dd/yyyy.";
			err_Obj.style.display = "inline";	
			return false;
		}

		else
		{
			//alert("Fill in or select the Date.");
			return false;
		}
	}
	else
	{
		//alert("Fill in or select the Date.");
		return false;
	}
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

function Select_Radio(obj, selectedValue)
{
	if(obj.value == selectedValue)
		obj.checked = true;
	else
		obj.checked = false;
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
		else if (obj.type == "hidden")
			obj.value = arr_QueryParam[1];
		else if (obj.type == "select-one")
				Select_Combo(obj, arr_QueryParam[1]);
		else if (obj.type == "checkbox")		
				Select_CheckBox(obj, arr_QueryParam[1]);
		
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
    if (document.forms[0]) 
	{
        for (i = 0; i < document.forms[0].elements.length; i++) 
		{
            if (document.forms[0].elements[i].type != "hidden" && document.forms[0].elements[i].disabled != true) 
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


