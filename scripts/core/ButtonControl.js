/* ButtonControl */

/******************************************************************************/
/******************************************************************************/

ButtonControl.prototype = new Control();
ButtonControl.prototype.constructor = ButtonControl;

/******************************************************************************/

function ButtonControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ButtonControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fUIObjLink = null;
	var oLinkList = this.fUIObj.getElementsByTagName("a");
	if ((oLinkList != null) && (oLinkList.length > 0))
	{
		this.fUIObjLink = oLinkList[0];
		this.fUIObjLink.onmouseover = MainAppOnMouseOver;
		this.fUIObjLink.onclick = MainAppOnMouseClick;
		this.fUIObjLink.onfocus = MainAppOnFocus;
		this.fUIObjLink.onblur = MainAppOnBlur;
	}
	else
	{
	}

	checkClassName(this.fUIObj, 'normal');
	if(this.fUIObjLink != null)
		checkClassName(this.fUIObjLink, 'normal');

	this.fFocused = false;
	this.setFocus(false);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setText = function(/*string*/ text)
{
	if(this.fUIObjLink != null)
		this.fUIObjLink.innerHTML = text;
	else
		this.fUIObj.innerHTML = text;
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setEnabled = function(/*boolean*/ enable)
{
	this.fEnabled = enable;
	checkClassName(this.fUIObj, this.fEnabled ? (this.fFocused ? 'hilite' : 'normal') : 'disabled');
	if(this.fUIObjLink != null)
		checkClassName(this.fUIObjLink, this.fEnabled ? (this.fFocused ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setFocus = function(/*boolean*/ set)
{
	if(set)
	{
		if(this.fUIObjLink != null)
		{
			this.fUIObjLink.focus();
		}
		else
			this.fUIObj.focus();
	}
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var wasFocused = this.fFocused;
	checkClassName(this.fUIObj, 'hilite');
	if(this.fUIObjLink != null)
		checkClassName(this.fUIObjLink, 'hilite');
	this.fFocused = true;
	if(!wasFocused)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.blurEvent = function(/*string*/ controlID)
{
	checkClassName(this.fUIObj, 'normal');
	if(this.fUIObjLink != null)
		checkClassName(this.fUIObjLink, 'normal');
	this.fFocused = false;
}

/******************************************************************************/

/*boolean*/ ButtonControl.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	if(this.fUIObjLink != null)
		if(this.fUIObjLink.id == controlID)
			return true;

	return false;
}
/******************************************************************************/

/*boolean*/ ButtonControl.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	return Control.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.mouseClick = function(/*string*/ controlID)
{
	this.getScreen().onButton(this.ControlID);
}

/******************************************************************************/
/******************************************************************************/
