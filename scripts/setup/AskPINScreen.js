/* AskPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskPINScreen.ScreenID = "Startup004";

AskPINScreen.PINID = "Startup004_PIN";
AskPINScreen.ContinueID = "Startup004_Continue";

/******************************************************************************/

AskPINScreen.newInstance = function(/*object*/ callerCallback)
{
	return MainApp.getThe().openScreen(new AskPINScreen(callerCallback));
}

/******************************************************************************/

AskPINScreen.prototype = new Screen();
AskPINScreen.prototype.constructor = AskPINScreen;

/******************************************************************************/

function AskPINScreen(/*object*/ callerCallback)
{
	var oControl;

	this.ScreenID = AskPINScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";
	this.CallerCallback = callerCallback;

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 200);

	oControl = new EditControl(AskPINScreen.PINID, this.ScreenID, 6, 6);
	this.newControl(oControl);
//TODO?	oControl.AutoButton = true;
	this.newControl(new ButtonControl(AskPINScreen.ContinueID, this.ScreenID));
}

/******************************************************************************/

/*void*/ AskPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	data = this.getControl(AskPINScreen.PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return;
	}

	var oSession = MainApp.getThe().getSession();

	this.Callback = AskPINScreen.prototype.afterSignon;
	oSession.signon(this, null, data);

	//Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ AskPINScreen.prototype.afterSignon = function(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.close();

		oSession.saveDataSettings();	// for possible temp store of userPassword

		this.Callback = AskPINScreen.prototype.doCallBackCaller;
		oSession.loadSystemData(this);
	}
}

/******************************************************************************/

/*void*/ AskPINScreen.prototype.doCallBackCaller = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		this.CallerCallback.Callback();
	}
	else if(isFunction(this.CallerCallback))
	{
		this.CallerCallback();
	}
}

/******************************************************************************/
/******************************************************************************/
