/* SetupScreen.js */

/******************************************************************************/
/******************************************************************************/

SetupScreen.ScreenID = "Setup001";

/* SetupStep */
var ss_AskSignedUpStep = 0;
var ss_NeedLogonIDStep = 1;
var ss_HaveLogonIDStep = 2;

/******************************************************************************/

SetupScreen.newInstance = function(/*object*/ callerCallback)
{
	var oScreen = new SetupScreen(callerCallback);

	MainApp.getThe().openScreen(oScreen);
	oScreen.openStep(ss_AskSignedUpStep);

	return oScreen;
}

/******************************************************************************/

SetupScreen.prototype = new Screen();
SetupScreen.prototype.constructor = SetupScreen;

/******************************************************************************/

function SetupScreen(/*object*/ callerCallback)
{
	this.ScreenID = SetupScreen.ScreenID;
	this.ScreenTitle = "setup";
	this.ScreenTitleImage = "titleSetup.gif";
	this.CallerCallback = callerCallback;

	this.fContainerControl = new ContainerControl(this.ScreenID, 50, 100);

	this.fStepControlID = AskSignedUpControl.ControlID;
	this.fSetupData = new SetupData();
	this.fCurStep = ss_AskSignedUpStep;
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.close = function()
{
	var oContainerControl = this.findControl(this.fStepControlID);
	if(oContainerControl != null)
		oContainerControl.show(false);
	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.openStep = function(/*int*/ step)
{
	var oContainerControl;

	switch(step)
	{
		case ss_AskSignedUpStep:
		default:
			oContainerControl = AskSignedUpControl.newInstance();
			break;
		case ss_NeedLogonIDStep:
			oContainerControl = NeedLogonIDControl.newInstance();
			break;
		case ss_HaveLogonIDStep:
			oContainerControl = HaveLogonIDControl.newInstance();
			break;
	}

	oContainerControl.show(true);
	this.newControl(oContainerControl);
	this.fStepControlID = oContainerControl.ControlID;
	this.fCurStep = step;
	oContainerControl.loadData(this.fSetupData);
	this.setFocus(true);
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.closeStep = function(/*boolean*/ doUnload)
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(doUnload)
	{
		if(!oContainerControl.unloadData(this.fSetupData))
			return false;
	}

	oContainerControl.show(false);
	this.deleteControl(this.fStepControlID);
	return true;
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		if(this.fContainerControl.key(key, evt))
			return true;

		if(this.fCurStep == ss_AskSignedUpStep)
		{
			this.close();
			return true;
		}
		else if(this.fCurStep == ss_NeedLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignedUpStep);

			return true;
		}
		else if(this.fCurStep == ss_HaveLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignedUpStep);

			return true;
		}
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(this.fCurStep == ss_AskSignedUpStep)
	{
		if(controlID == AskSignedUpControl.NotRegisteredID)
		{
			if(this.closeStep(true))
				this.openStep(ss_NeedLogonIDStep);
			return;
		}
		else if(controlID == AskSignedUpControl.AlreadyRegisteredID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_NeedLogonIDStep)
	{
		if(controlID == NeedLogonIDControl.HaveLogonID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_HaveLogonIDStep)
	{
		if(controlID == HaveLogonIDControl.ContinueID)
		{
			this.doSetupSignon();
			return;
		}
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSetupSignon = function()
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(oContainerControl.unloadData(this.fSetupData))
	{
		var oSession = MainApp.getThe().getSession();

		this.Callback = SetupScreen.prototype.doSetupAfterSignon;
		oSession.signon(this, this.fSetupData.UserID, this.fSetupData.UserPassword,
			this.fSetupData.RememberPassword);
	}
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSetupAfterSignon = function(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.close();

		oSession.saveDataSettings();

		this.Callback = SetupScreen.prototype.doCallBackCaller;
		oSession.loadSystemData(this);
	}
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doCallBackCaller = function(/*object*/ data,
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
