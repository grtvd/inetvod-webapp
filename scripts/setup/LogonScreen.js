/* LogonScreen.js */

/******************************************************************************/
/******************************************************************************/

LogonScreen.ScreenID = "Startup004";

LogonScreen.PromptID = "Startup004_Prompt";
LogonScreen.UserIDLabelID = "Startup004_UserID_Label";
LogonScreen.UserIDID = "Startup004_UserID";
LogonScreen.UserIDMsgID = "Startup004_UserID_Msg";
LogonScreen.UserPasswordLabelID = "Startup004_UserPassword_Label";
LogonScreen.UserPasswordID = "Startup004_UserPassword";
LogonScreen.UserPasswordMsgID = "Startup004_UserPassword_Msg";
LogonScreen.RememberPasswordID = "Startup00_RememberPassword";
LogonScreen.ContinueID = "Startup004_Continue";
LogonScreen.LogonUsingID = "Startup004_LogonUsing";

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

	this.fContainerControl = new ContainerControl(this.ScreenID, 50, 100);

	var oSession = MainApp.getThe().getSession();

	this.fShowEmail = true;
	if (testStrHasLen(oSession.getUserID()) && testStrIsAllNumbers(oSession.getUserID()))
		this.fShowEmail = false;

	oControl = new TextControl(LogonScreen.PromptID, this.ScreenID);
	this.newControl(oControl);

	oControl = new TextControl(LogonScreen.UserIDLabelID, this.ScreenID);
	this.newControl(oControl);
	oControl = new EditControl(LogonScreen.UserIDID, this.ScreenID, 20, 64)
	this.newControl(oControl);
	oControl = new TextControl(LogonScreen.UserIDMsgID, this.ScreenID);
	this.newControl(oControl);

	oControl = new TextControl(LogonScreen.UserPasswordLabelID, this.ScreenID);
	this.newControl(oControl);
	oControl = new EditControl(LogonScreen.UserPasswordID, this.ScreenID, 10, 16);
	this.newControl(oControl);
	oControl = new TextControl(LogonScreen.UserPasswordMsgID, this.ScreenID);
	this.newControl(oControl);
	oControl = new CheckControl(LogonScreen.RememberPasswordID, this.ScreenID);
	oControl.setChecked(false);
	this.newControl(oControl);

	this.newControl(new ButtonControl(LogonScreen.ContinueID, this.ScreenID));

	this.newControl(new ButtonControl(LogonScreen.LogonUsingID, this.ScreenID));
	this.onButtonLogonUsing();

	this.getControl(LogonScreen.UserIDID).setText(oSession.getUserID());
}

/******************************************************************************/

/*void*/ LogonScreen.prototype.onButtonLogonUsing = function()
{
	this.getControl(LogonScreen.PromptID).setText(this.fShowEmail
		? "Please enter your registered Email and your chosen Password:"
		: "Please enter your registered Logon ID and your chosen PIN:");

	this.getControl(LogonScreen.UserIDLabelID).setText(this.fShowEmail ? "Email:" : "Logon ID:");
	var oControl = this.getControl(LogonScreen.UserIDID)
	if(this.fShowEmail)
		oControl.setFieldSize(20, 64);
	else
		oControl.setFieldSize(9, 9);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(LogonScreen.UserIDMsgID).setText("");

	this.getControl(LogonScreen.UserPasswordLabelID).setText(this.fShowEmail ? "Password:" : "PIN:");
	oControl = this.getControl(LogonScreen.UserPasswordID)
	if(this.fShowEmail)
		oControl.setFieldSize(10, 16);
	else
		oControl.setFieldSize(6, 6);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(LogonScreen.UserPasswordMsgID).setText("");

	this.getControl(LogonScreen.LogonUsingID).setText(this.fShowEmail
		? "Logon using Logon ID/PIN" : "Logon using Email/Password");
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
	if((controlID == LogonScreen.ContinueID) || (controlID == LogonScreen.UserIDID)
		|| (controlID == LogonScreen.UserPasswordID))
	{
		this.getControl(LogonScreen.UserIDMsgID).setText("");
		this.getControl(LogonScreen.UserPasswordMsgID).setText("");

		var userID = this.getControl(LogonScreen.UserIDID).getText();
		if(!testStrHasLen(userID))
		{
			this.getControl(LogonScreen.UserIDMsgID).setText((this.fShowEmail ? "Email" : "Logon ID") + " must be entered.");
			this.focusControl(LogonScreen.UserIDID, true);
			return;
		}

		var userPassword = this.getControl(LogonScreen.UserPasswordID).getText();
		if(!testStrHasLen(userPassword))
		{
			this.getControl(LogonScreen.UserPasswordMsgID).setText((this.fShowEmail ? "Password" : "PIN") + " must be entered.");
			this.focusControl(LogonScreen.UserPasswordID, true);
			return;
		}

		var rememberPassword = this.getControl(LogonScreen.RememberPasswordID).getChecked();

		var oSession = MainApp.getThe().getSession();

		this.Callback = LogonScreen.prototype.afterSignon;
		oSession.signon(this, userID, userPassword, rememberPassword);
	}
	else if(controlID == LogonScreen.LogonUsingID)
	{
		this.fShowEmail = !this.fShowEmail;
		this.onButtonLogonUsing();
		this.focusControl(LogonScreen.UserIDID, true);
	}
	//else
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
