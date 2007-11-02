/* CheckControl */

/******************************************************************************/
/******************************************************************************/

CheckControl.prototype = new Control();
CheckControl.prototype.constructor = CheckControl;

/******************************************************************************/

function CheckControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "CheckControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
//	this.fUIObj.onmouseover = MainAppOnMouseOver;
//	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fFocused = false;

	this.setFocus(false);
}

/******************************************************************************/

/*boolean*/ CheckControl.prototype.getChecked = function()
{
	return this.fUIObj.checked;
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setChecked = function(/*boolean*/ checked)
{
	this.fUIObj.checked = (checked ? true : false);
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setFocus = function(/*boolean*/ set)
{
	if(set)
		this.fUIObj.focus();
}

/******************************************************************************/

/*void*/ CheckControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var wasFocused = this.fFocused;
	this.fFocused = true;
	if(!wasFocused)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ CheckControl.prototype.blurEvent = function(/*string*/ controlID)
{
	this.fFocused = false;
}

/******************************************************************************/
/******************************************************************************/
