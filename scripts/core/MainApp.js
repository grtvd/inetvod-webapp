/* MainApp.js */

/******************************************************************************/
/******************************************************************************/

/* Event Keys */
var ek_Backspace = 8;
var ek_Tab = 9;
var ek_Escape = 27;
var ek_Select = 256;
var ek_Back = 257;
var ek_NextValue = 258;
var ek_PrevValue = 259;
var ek_UpButton = 260;
var ek_DownButton = 261;
var ek_LeftButton = 262;
var ek_RightButton = 263;
var ek_PageUp = 264;
var ek_PageDown = 265;

/* Colors */
var g_Color_White = "#F0F0F0";
var g_Color_Black = "#101010";

/******************************************************************************/

var gMainApp = null;

/******************************************************************************/
/******************************************************************************/

function onRemoteEvent(keyCode)
{
	// for the numerics on the Remote, MCE returns both "keypress" and "onremote" events, causing double chars.
	// so "eat" the numerics from the Remote, they'll be handled by "keypress" event.
	if((keyCode >= 48) && (keyCode <= 57))
		return true;

	return !MainAppOnRemoteEvent(keyCode, event);
}

/******************************************************************************/

function onScaleEvent(vScale)
{
	document.getElementById("ScaleText").innerHTML = vScale;
	if(isString(document.body.style.zoom))
		document.body.style.zoom = vScale;
}

/******************************************************************************/

function DoScale()
{
	MainApp.getThe().onScale();
}

/******************************************************************************/
/******************************************************************************/

MainApp.getThe = function()
{
	if(gMainApp == null)
		gMainApp = new MainApp();
	return gMainApp;
}

/******************************************************************************/

function MainApp()
{
	this.fInit = false;
	this.fScreenList = new Array();
	this.fSession = null;
	this.fMainTable = null;
	this.fMainPopup = null;
//	this.fScreenTitle = null;
//	this.fScreenTitleImageDiv = null;
//	this.fScreenTitleImage = null;
	this.fFirstMouseMove = false;
}

/******************************************************************************/
/******************************************************************************/

/*void*/ MainApp.prototype.reset = function()
{
	this.closeAllScreens();
	this.fSession = Session.newInstance();
}

/******************************************************************************/

/*void*/ MainApp.prototype.init = function()
{
	if(this.fInit)
		return;
	this.fInit = true;
	//DebugOn(true);

	document.onkeyup = MainAppOnKeyUp;
	document.onkeydown = MainAppOnKeyDown;
	document.onkeypress = MainAppOnKeyPress;
	window.onresize = MainAppOnResize;

	//document.body.scroll = "no";
	//document.body.focus();

	this.fMainTable = document.getElementById("MainTable");
	this.fMainPopup = document.getElementById("MainPopup");
//	this.fScreenTitle = document.getElementById("ScreenTitle");
//	this.fScreenTitleImageDiv = document.getElementById("ScreenTitleImageDiv");
//	this.fScreenTitleImage = document.getElementById("ScreenTitleImage");

	this.updateMainBodyDivHeight();
	this.updateMainPopupPosition();
	enableErrors(false);
	window.setTimeout("MainAppIdle()", 500);
	this.reset();
}

/******************************************************************************/

/*vod*/ MainApp.prototype.updateMainBodyDivHeight = function()
{
	var oMainBodyDiv = document.getElementById("MainBodyDiv");
	var oAppTable = document.getElementById("AppTable");

	if(oMainBodyDiv && oAppTable)
	{
		var extra = 40; //border & footer
		if (oMainBodyDiv.offsetTop == 0)
			extra += 20;	//fudge for IE

		var newDivHeight = getWindowInnerHeight() - extra - oAppTable.offsetTop;
		oAppTable.style.height = newDivHeight + "px";
		oMainBodyDiv.style.height = newDivHeight + "px";
	}
}

/******************************************************************************/

/*vod*/ MainApp.prototype.updateMainPopupPosition = function()
{
	if(this.fMainPopup && this.fMainPopup.style)
	{
		var width = getElementWidth(this.fMainPopup);
		if(width > 0)
			this.fMainPopup.style.left = ((getWindowInnerWidth() / 2) - (width / 2)) + "px";
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.openPopup = function()
{
	this.closeAllScreens();
	this.showPopupMsg("");
	setStyleDisplay(this.fMainPopup, true);
}

/******************************************************************************/

/*void*/ MainApp.prototype.closePopup = function()
{
	this.closeAllScreens();
	setStyleDisplay(this.fMainPopup, false);
}

/******************************************************************************/

/*void*/ MainApp.prototype.showPopupMsg = function(msg)
{
	document.getElementById("MainPopup_Message").innerHTML = msg;
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.openScreen = function(/*Screen*/ oScreen)
{
	var oCurScreen = null;

	if(this.fScreenList.length > 0)
		oCurScreen = this.fScreenList[this.fScreenList.length - 1];

	this.fScreenList.push(oScreen);

	this.fFirstMouseMove = true;
//	this.showScreenTitle(oScreen);
	oScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	oScreen.show(true);
	oScreen.setFocus(true);

	if(oCurScreen != null)
	{
		oCurScreen.show(false);
//		oCurScreen.setFocus(false);
	}

	return oScreen;
}

/******************************************************************************/

/*void*/ MainApp.prototype.closeScreen = function(/*int*/ screenID)
{
	var oScreen;
	var pos = -1;

	// search for screenID, hiding all
	for(var i = 0; i < this.fScreenList.length; i++)
	{
		oScreen = this.fScreenList[i];
		oScreen.show(false);

		if(oScreen.ScreenID == screenID)
			pos = i;
	}

	if(pos >= 0)
		this.fScreenList.splice(pos, 1);

	if(this.fScreenList.length > 0)
	{
		oScreen = this.fScreenList[this.fScreenList.length - 1];
//		this.showScreenTitle(oScreen);
		oScreen.show(true);
		oScreen.setFocus(true);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.closeAllScreens = function()
{
	for(var i = this.fScreenList.length - 1; i >= 0; i--)
		this.fScreenList[i].close();
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.findScreen = function(/*string */ screenID)
{
	for(var i = 0; i < this.fScreenList.length; i++)
		if(this.fScreenList[i].ScreenID == screenID)
			return this.fScreenList[i];

	return null;
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.getScreen = function(/*string */ screenID)
{
	var oScreen = this.findScreen(screenID);

	if(oScreen != null)
		return oScreen;

	throw "MainApp.getScreen: can't find screen, ID(" + screenID + ")";
}

/******************************************************************************/

///*void*/ MainApp.prototype.showScreenTitle = function(/*Screen*/ oScreen)
//{
//	if(oScreen.ScreenTitleImage && (oScreen.ScreenTitleImage.length > 0))
//	{
//		this.fScreenTitleImage.src = "images/" + oScreen.ScreenTitleImage;
//		setStyleDisplay(this.fScreenTitleImageDiv, true);
//		setStyleDisplay(this.fScreenTitle, false);
//	}
//	else
//	{
//		this.fScreenTitle.innerHTML = oScreen.ScreenTitle;
//		setStyleDisplay(this.fScreenTitle, true);
//		setStyleDisplay(this.fScreenTitleImageDiv, false);
//	}
//}

/******************************************************************************/

/*void*/ MainApp.prototype.onResize = function()
{
	if(this.fScreenList.length > 0)
	{
		var oCurScreen = this.fScreenList[this.fScreenList.length - 1];
		oCurScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.onScale = function()
{
// scale to the current window size
//		var newScale = (document.body.style.zoom.length > 0)
//			? ((document.body.style.zoom * document.body.clientWidth) / 1024)
//			: (document.body.clientWidth / 1024);
//
//		onScaleEvent(newScale);

	// toggle on scaling on and off
	var newScale = "";

	if(isString(document.body.style.zoom) && (document.body.style.zoom.length == 0))
	{
		var horzScale = document.body.getBoundingClientRect().right / 1024;
		var vertScale = document.body.getBoundingClientRect().bottom / 768;

		newScale = (horzScale > vertScale) ? vertScale : horzScale;
	}

	onScaleEvent(newScale);
	this.onResize();
}

/******************************************************************************/

/*void*/ MainApp.prototype.key = function(/*int*/ keyCode, /*Event*/ evt)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];
		var handled = oScreen.key(keyCode, evt);

		// if going back and all screens have been closed, return control to browser
		if((keyCode == ek_Back) && (this.fScreenList.length == 0))
			return false;
		if((keyCode == ek_Escape) && (this.fScreenList.length == 0))
			return false;

		//IE converts a Backspace into the <Back> button, if we have an open screen, don't pass event to IE
//		if((keyCode == ek_Backspace) && (this.fScreenList.length > 0))
//			handled = true;
		//IE don't let IE/MCE handle Tab key
//		if(keyCode == ek_Tab)
//			handled = true;

		if(!handled)
			;	//TODO: beep sound

		return handled;
	}

	return false;
}

/******************************************************************************/

/*void*/ MainApp.prototype.idle = function()
{
	// If fFirstMouseMove has not yet been cleared, clear it.  IE and non full-screen MCE don't get the bogus
	// mouse move events.
	if(this.fFirstMouseMove)
		this.fFirstMouseMove = false;

	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.idle();
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseClick = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseClick(controlID);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseMove = function(/*string*/ controlID)
{
	// One MCX and full-screen MCE at console, a bogus mouse move event if shifting focus to center of screen.
	// Need to "eat" first event, subsequent events are valid.
	if(this.fFirstMouseMove)
	{
		this.fFirstMouseMove = false;
		return;
	}

	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseMove(controlID);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.focusEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.focusEvent(controlID);
	}
}


/******************************************************************************/

/*void*/ MainApp.prototype.blurEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.blurEvent(controlID);
	}
}

/******************************************************************************/

/*Session*/ MainApp.prototype.getSession = function()
{
	return this.fSession;
}

/******************************************************************************/
/******************************************************************************/

function MainAppOnKeyDown(evt)
{
	evt = getEvent(evt);
	var keyCode = getEventKeyCode(evt);
	if((keyCode == 8)
			|| (keyCode == 9)
			|| (keyCode == 13)
			|| ((keyCode >= 33) && (keyCode <= 34))
			|| ((keyCode >= 37) && (keyCode <= 40)))
		return MainAppOnRemoteEvent(keyCode, evt);
	return true;
}

/******************************************************************************/

function MainAppOnKeyUp()
{
	return true;
}

/******************************************************************************/

function MainAppOnKeyPress(evt)
{
	evt = getEvent(evt);
	var keyCode = getEventKeyCode(evt);
	if((keyCode != 8)
			&& (keyCode != 9)
			&& (keyCode != 13)
			&& !((keyCode >= 33) && (keyCode <= 34))
			&& !((keyCode >= 37) && (keyCode <= 40))
			&& !((keyCode >= 63232) && (keyCode <= 63235)))
		return MainAppOnRemoteEvent(keyCode, evt);
	return true;
}

/******************************************************************************/

function MainAppOnRemoteEvent(keyCode, evt)
{
	try
	{
		if(!WaitScreen_isOpen())
			return !MainApp.getThe().key(MainAppMapKey(keyCode), evt);
	}
	catch(e)
	{
		showError("MainAppOnRemoteEvent", e);
	}

	return true;
}

/******************************************************************************/

function MainAppMapKey(key)
{
	if(key == 13)
		key = ek_Select;
	else if(key == 166)
		key = ek_Back;
	else if(key == 33)
		key = ek_PageUp;
	else if(key == 34)
		key = ek_PageDown;
	else if((key == 37) || (key == 63234))
		key = ek_LeftButton;
	else if((key == 38) || (key == 63232))
		key = ek_UpButton;
	else if((key == 39) || (key == 63235))
		key = ek_RightButton;
	else if((key == 40) || (key == 63233))
		key = ek_DownButton;

	return key;
}

/******************************************************************************/

function MainAppIdle()
{
	window.setTimeout("MainAppIdle()", 500);
	try
	{
		MainApp.getThe().idle();
	}
	catch(e)
	{
		showError("MainAppIdle", e);
	}
}

/******************************************************************************/

function MainAppOnMouseClick(evt)
{
	try
	{
		if(!WaitScreen_isOpen())
		{
			evt = getEvent(evt);
			var obj = getEventSource(evt);
			obj = findObjectWithID(obj);
			if(obj != null)
				MainApp.getThe().mouseClick(obj.id);
		}
	}
	catch(e)
	{
		showError("MainAppOnMouseClick", e);
	}
}

/******************************************************************************/

function MainAppOnMouseOver(evt)
{
	try
	{
		evt = getEvent(evt);
		var obj = getEventSource(evt);
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().mouseMove(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/

function MainAppOnFocus(evt)
{
	try
	{
		evt = getEvent(evt);
		var obj = getEventSource(evt);
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().focusEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnFocus", e);
	}
}

/******************************************************************************/

function MainAppOnBlur(evt)
{
	try
	{
		evt = getEvent(evt);
		var obj = getEventSource(evt);
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().blurEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnBlur", e);
	}
}

/******************************************************************************/

function MainAppOnResize()
{
	try
	{
		MainApp.getThe().onResize();
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/
/******************************************************************************/
