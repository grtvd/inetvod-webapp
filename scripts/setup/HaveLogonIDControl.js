/* HaveLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

HaveLogonIDControl.ControlID = "Setup001_HaveLogonIDControl";

HaveLogonIDControl.LogonID = "Setup001_HaveLogonIDControl_Logon";
HaveLogonIDControl.PINID = "Setup001_HaveLogonIDControl_PIN";
HaveLogonIDControl.RememberPINID = "Setup001_HaveLogonIDControl_RememberPIN";
HaveLogonIDControl.ContinueID = "Setup001_HaveLogonIDControl_Continue";

/******************************************************************************/

HaveLogonIDControl.newInstance = function()
{
	var containerControl = new HaveLogonIDControl(HaveLogonIDControl.ControlID, 0, 0);

	var oControl;

	oControl = new EditControl(HaveLogonIDControl.LogonID, SetupScreen.ScreenID, 9, 9)
	containerControl.newControl(oControl);
	oControl = new EditControl(HaveLogonIDControl.PINID, SetupScreen.ScreenID, 6, 6);
	containerControl.newControl(oControl);

	oControl = new CheckControl(HaveLogonIDControl.RememberPINID, SetupScreen.ScreenID);
	oControl.setChecked(true);
	containerControl.newControl(oControl);

	containerControl.newControl(new ButtonControl(HaveLogonIDControl.ContinueID, SetupScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

HaveLogonIDControl.prototype = new ContainerControl();
HaveLogonIDControl.prototype.constructor = AskSignedUpControl;

/******************************************************************************/

function HaveLogonIDControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ HaveLogonIDControl.prototype.loadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ HaveLogonIDControl.prototype.unloadData = function(/*object*/ oData)
{
	var data;
	var oSetupData = oData;

	data = this.getControl(HaveLogonIDControl.LogonID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("Logon ID must be entered.");
		return false;
	}
	oSetupData.UserID = data;

	data = this.getControl(HaveLogonIDControl.PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return false;
	}
	oSetupData.UserPassword = data;

	oSetupData.RememberPassword = this.getControl(HaveLogonIDControl.RememberPINID).getChecked();

	return true;
}

/******************************************************************************/
/******************************************************************************/
