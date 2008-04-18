/* HaveLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

HaveLogonIDControl.ControlID = "Setup001_HaveLogonIDControl";

HaveLogonIDControl.PromptID = "Setup001_HaveLogonIDControl_Prompt";
HaveLogonIDControl.UserIDLabelID = "Setup001_HaveLogonIDControl_UserID_Label";
HaveLogonIDControl.UserIDID = "Setup001_HaveLogonIDControl_UserID";
HaveLogonIDControl.UserIDMsgID = "Setup001_HaveLogonIDControl_UserID_Msg";
HaveLogonIDControl.UserPasswordLabelID = "Setup001_HaveLogonIDControl_UserPassword_Label";
HaveLogonIDControl.UserPasswordID = "Setup001_HaveLogonIDControl_UserPassword";
HaveLogonIDControl.UserPasswordMsgID = "Setup001_HaveLogonIDControl_UserPassword_Msg";
HaveLogonIDControl.RememberPasswordID = "Setup001_HaveLogonIDControl_RememberPassword";
HaveLogonIDControl.ContinueID = "Setup001_HaveLogonIDControl_Continue";
HaveLogonIDControl.ForgotPasswordID = "Setup001_HaveLogonIDControl_ForgotPassword";
HaveLogonIDControl.LogonUsingID = "Setup001_HaveLogonIDControl_LogonUsing";

/******************************************************************************/

HaveLogonIDControl.newInstance = function()
{
	var containerControl = new HaveLogonIDControl(HaveLogonIDControl.ControlID, 0, 0);

	var oControl;

	containerControl.fShowEmail = true;

	containerControl.newControl(new TextControl(HaveLogonIDControl.PromptID, SetupScreen.ScreenID));

	containerControl.newControl(new TextControl(HaveLogonIDControl.UserIDLabelID, SetupScreen.ScreenID));
	containerControl.newControl(new EditControl(HaveLogonIDControl.UserIDID, SetupScreen.ScreenID, 20, 64));
	containerControl.newControl(new TextControl(HaveLogonIDControl.UserIDMsgID, SetupScreen.ScreenID));

	containerControl.newControl(new TextControl(HaveLogonIDControl.UserPasswordLabelID, SetupScreen.ScreenID));
	containerControl.newControl(new EditControl(HaveLogonIDControl.UserPasswordID, SetupScreen.ScreenID, 10, 16));
	containerControl.newControl(new TextControl(HaveLogonIDControl.UserPasswordMsgID, SetupScreen.ScreenID));

	oControl = new CheckControl(HaveLogonIDControl.RememberPasswordID, SetupScreen.ScreenID);
	oControl.setChecked(false);
	containerControl.newControl(oControl);

	containerControl.newControl(new ButtonControl(HaveLogonIDControl.ContinueID, SetupScreen.ScreenID));

	containerControl.newControl(new ButtonControl(HaveLogonIDControl.ForgotPasswordID, SetupScreen.ScreenID));
	containerControl.newControl(new ButtonControl(HaveLogonIDControl.LogonUsingID, SetupScreen.ScreenID));
	containerControl.onButtonLogonUsing();

	return containerControl;
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

/*void*/ HaveLogonIDControl.prototype.onButtonLogonUsing = function()
{
	this.getControl(HaveLogonIDControl.PromptID).setText(this.fShowEmail
		? "Please enter your registered Email and your chosen Password:"
		: "Please enter your registered Logon ID and your chosen PIN:");

	this.getControl(HaveLogonIDControl.UserIDLabelID).setText(this.fShowEmail ? "Email:" : "Logon ID:");
	var oControl = this.getControl(HaveLogonIDControl.UserIDID)
	if(this.fShowEmail)
		oControl.setFieldSize(20, 64);
	else
		oControl.setFieldSize(9, 9);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(HaveLogonIDControl.UserIDMsgID).setText("");

	this.getControl(HaveLogonIDControl.UserPasswordLabelID).setText(this.fShowEmail ? "Password:" : "PIN:");
	oControl = this.getControl(HaveLogonIDControl.UserPasswordID)
	if(this.fShowEmail)
		oControl.setFieldSize(10, 16);
	else
		oControl.setFieldSize(6, 6);
	oControl.setText("");
	oControl.Type = this.fShowEmail ? ect_AlphaNumeric : ect_Numeric;
	this.getControl(HaveLogonIDControl.UserPasswordMsgID).setText("");

	this.getControl(HaveLogonIDControl.LogonUsingID).setText(this.fShowEmail
		? "Logon using Logon ID/PIN" : "Logon using Email/Password");
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

	this.getControl(HaveLogonIDControl.UserIDMsgID).setText("");
	this.getControl(HaveLogonIDControl.UserPasswordMsgID).setText("");

	data = this.getControl(HaveLogonIDControl.UserIDID).getText();
	if(!testStrHasLen(data))
	{
		this.getControl(HaveLogonIDControl.UserIDMsgID).setText((this.fShowEmail ? "Email" : "Logon ID") + " must be entered.");
		this.focusControl(HaveLogonIDControl.UserIDID, true);
		return false;
	}
	oSetupData.UserID = data;

	data = this.getControl(HaveLogonIDControl.UserPasswordID).getText();
	if(!testStrHasLen(data))
	{
		this.getControl(HaveLogonIDControl.UserPasswordMsgID).setText((this.fShowEmail ? "Password" : "PIN") + " must be entered.");
		this.focusControl(HaveLogonIDControl.UserPasswordID, true);
		return false;
	}
	oSetupData.UserPassword = data;

	oSetupData.RememberPassword = this.getControl(HaveLogonIDControl.RememberPasswordID).getChecked();

	return true;
}

/******************************************************************************/
/******************************************************************************/
