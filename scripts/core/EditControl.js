/* EditControl */

/******************************************************************************/
/******************************************************************************/

/* EditControlType */
var ect_AlphaNumeric = 0;		// all upper and lower A - Z and 0 - 9
var ect_UpperAlphaNumeric = 1;	// upper only A - Z and 0 - 9
var ect_Numeric = 2;			// only 0 - 9

/******************************************************************************/

EditControl.AlphaNumericValidCharArray = null;
EditControl.UpperAlphaNumericValidCharArray = null;
EditControl.NumericValidCharArray = null;

/******************************************************************************/

EditControl.prototype = new Control();
EditControl.prototype.constructor = EditControl;

/******************************************************************************/

function EditControl(/*string*/ controlID, /*string*/ screenID, /*int*/ fieldSize, /*int*/ maxLength)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "EditControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
//	this.fUIObj.onmouseover = MainAppOnMouseOver;
//	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fUIObj.size = fieldSize;
	this.fUIObj.maxLength = maxLength;
	this.fUIObj.value = "";
	this.fFocused = false;
	this.Type = ect_UpperAlphaNumeric;
//TODO?	this.AutoButton = false;

	this.setFocus(false);
}

/******************************************************************************/

/*string*/ EditControl.prototype.getText = function()
{
	return this.fUIObj.value;
}

/******************************************************************************/

/*Array*/ EditControl.prototype.getValidCharArray = function(/*EditControlType*/ editControlType)
{
	var invalidAlphaUpper = false;
	var invalidAlphaLower = false;
	var includeNumeric = false;
	var includeSpecial = false;

	if(editControlType == ect_AlphaNumeric)
	{
		if(EditControl.AlphaNumericValidCharArray != null)
			return EditControl.AlphaNumericValidCharArray;

		invalidAlphaUpper = true;
		invalidAlphaLower = true;
		includeNumeric = true;
		includeSpecial = true;
	}
	else if(editControlType == ect_UpperAlphaNumeric)
	{
		if(EditControl.UpperAlphaNumericValidCharArray != null)
			return EditControl.UpperAlphaNumericValidCharArray;

		invalidAlphaUpper = true;
		includeNumeric = true;
		includeSpecial = true;
	}
	else if(editControlType == ect_Numeric)
	{
		if(EditControl.NumericValidCharArray != null)
			return EditControl.NumericValidCharArray;

		includeNumeric = true;
	}
	else
		throw "EditControl.getValidCharArray: Invalid fType(" + editControlType + ")";

	var arr;
	var ch;

	arr = new Array();

	if(invalidAlphaUpper)
	{
		for(ch = 65; ch <= 90; ch++)
			arr.push(ch);
	}
	if(invalidAlphaLower)
	{
		for(ch = 97; ch <= 122; ch++)
			arr.push(ch);
	}
	if(includeNumeric)
	{
		for(ch = 48; ch <= 57; ch++)
			arr.push(ch);
	}
	if(includeSpecial)
	{
		arr.push(32);	// space
		arr.push(64);	// @
		arr.push(46);	// .
		arr.push(45);	//-
		arr.push(33);	//!
		arr.push(34);	//"
		arr.push(35);	//#
		arr.push(36);	//$
		arr.push(37);	//%
		arr.push(38);	//&
		arr.push(39);	//'
		arr.push(40);	//(
		arr.push(41);	//)
		arr.push(42);	//*
		arr.push(43);	//+
		arr.push(44);	//,
		arr.push(47);	///
		arr.push(58);	//:
		arr.push(59);	//;
		arr.push(60);	//<
		arr.push(61);	//=
		arr.push(62);	//>
		arr.push(63);	//?
		arr.push(91);	//[
		arr.push(92);	//\
		arr.push(93);	//]
		arr.push(94);	//^
		arr.push(95);	//_
		arr.push(96);	//`
		arr.push(123);	//{
		arr.push(124);	//|
		arr.push(125);	//}
		arr.push(126);	//~
	}

	if(editControlType == ect_AlphaNumeric)
		EditControl.AlphaNumericValidCharArray = arr;
	else if(editControlType == ect_UpperAlphaNumeric)
		EditControl.UpperAlphaNumericValidCharArray = arr;
	else if(editControlType == ect_Numeric)
		EditControl.NumericValidCharArray = arr;

	return arr;
}

/******************************************************************************/

/*void*/ EditControl.prototype.setFocus = function(/*boolean*/ set)
{
	if(set)
	{
		this.fUIObj.focus();
		this.fUIObj.select();
	}
}

/******************************************************************************/

/*void*/ EditControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var wasFocused = this.fFocused;
	this.fFocused = true;
	if(!wasFocused)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ EditControl.prototype.blurEvent = function(/*string*/ controlID)
{
	this.fFocused = false;
}

/******************************************************************************/

/*boolean*/ EditControl.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
//	var validCharArray = this.getValidCharArray(this.Type);
//	var pos;

	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	//TODO Giving up, too hard to get it correct on different browsers
	return false;

//	if(evt && (evt.altKey || evt.ctrlKey))
//		return false;
//	if(isEventKeyCodeNavigation(key))
//		return false;
//
//	// force upper case
//	if(this.Type == ect_UpperAlphaNumeric)
//	{
//		if ((key >= 97) && (key <= 122))
//		{
//			key -= 32;
//			setEventKeyCode(evt, key);
//		}
//	}
//
//	pos = arrayIndexOf(validCharArray, key);
//	if(pos >= 0)
//	{
//
//
////TODO?		if(this.AutoButton && (this.fText.length == this.MaxLength))
////TODO?			this.getScreen().onButton(this.ControlID);
//
//		return false;	//let default handler deal
//	}
//
//	//stopEventPropagation(evt);
//	return true;
}

/******************************************************************************/
/******************************************************************************/
