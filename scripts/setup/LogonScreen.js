/* LogonScreen.js */

/******************************************************************************/
/******************************************************************************/

LogonScreen.ScreenID = "Startup004";

LogonScreen.UserIDID = "Startup004_UserID";
LogonScreen.UserIDMsgID = "Startup004_UserID_Msg";
LogonScreen.UserPasswordID = "Startup004_UserPassword";
LogonScreen.UserPasswordMsgID = "Startup004_UserPassword_Msg";
LogonScreen.RememberPasswordID = "Startup00_RememberPassword";
LogonScreen.ContinueID = "Startup004_Continue";

/******************************************************************************/

LogonScreen.newInstance = function(/*object*/ callerCallback)
{
	return MainApp.getThe().openScreen(new LogonScreen(callerCallback));
}

/******************************************************************************/

LogonScreen.prototype = new Screen();
LogonScreen.prototype.constructor = LogonScreen;

/******************************************************************************/

function LogonScreen(/*object*/ callerCallback)
{
	var oControl;

	this.ScreenID = LogonScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";
	this.CallerCallback = callerCallback;

	this.fContainerControl = new ContainerControl(this.ScreenID, 150, 100);

	var oSession = MainApp.getThe().getSession();

	oControl = new EditControl(LogonScreen.UserIDID, this.ScreenID, 20, 64)
	oControl.setText(oSession.getUserID());
	this.newControl(oControl);
	oControl = new TextControl(LogonScreen.UserIDMsgID, this.ScreenID);
	this.newControl(oControl);
	oControl = new EditControl(LogonScreen.UserPasswordID, this.ScreenID, 10, 16);
	this.newControl(oControl);
	oControl = new TextControl(LogonScreen.UserPasswordMsgID, this.ScreenID);
	this.newControl(oControl);
	oControl = new CheckControl(LogonScreen.RememberPasswordID, this.ScreenID);
	oControl.setChecked(true);
	this.newControl(oControl);

	this.newControl(new ButtonControl(LogonScreen.ContinueID, this.ScreenID));
}

/******************************************************************************/

/*boolean*/ LogonScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.onButton = function(/*string*/ controlID)
{
	this.getControl(LogonScreen.UserIDMsgID).setText("");
	this.getControl(LogonScreen.UserPasswordMsgID).setText("");

	var userID = this.getControl(LogonScreen.UserIDID).getText();
	if(!testStrHasLen(userID))
	{
		this.getControl(LogonScreen.UserIDMsgID).setText("Email must be entered.");
		this.fContainerControl.focusControl(LogonScreen.UserIDID, true);
		return;
	}

	var userPassword = this.getControl(LogonScreen.UserPasswordID).getText();
	if(!testStrHasLen(userPassword))
	{
		this.getControl(LogonScreen.UserPasswordMsgID).setText("Password must be entered.");
		this.fContainerControl.focusControl(LogonScreen.UserPasswordID, true);
		return;
	}

	var rememberPassword = this.getControl(LogonScreen.RememberPasswordID).getChecked();

	var oSession = MainApp.getThe().getSession();

	this.Callback = LogonScreen.prototype.afterSignon;
	oSession.signon(this, userID, userPassword, rememberPassword);

	//Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.afterSignon = function(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.close();

		oSession.saveDataSettings();	// for possible temp store of userPassword

		this.Callback = LogonScreen.prototype.doCallBackCaller;
		oSession.loadSystemData(this);
	}
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.doCallBackCaller = function(/*object*/ data,
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
