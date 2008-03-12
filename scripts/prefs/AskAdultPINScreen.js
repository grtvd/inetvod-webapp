/* AskAdultPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskAdultPINScreen.ScreenID = "Prefs002";

AskAdultPINScreen.PINID = "Prefs002_PIN";
AskAdultPINScreen.PINMsgID = "Prefs002_PIN_Msg";
AskAdultPINScreen.ContinueID = "Prefs002_Continue";

/******************************************************************************/

AskAdultPINScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new AskAdultPINScreen());
}

/******************************************************************************/

AskAdultPINScreen.prototype = new Screen();
AskAdultPINScreen.prototype.constructor = AskAdultPINScreen;

/******************************************************************************/

function AskAdultPINScreen()
{
	var oControl;

	this.ScreenID = AskAdultPINScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 120);
	oControl = new EditControl(AskAdultPINScreen.PINID, this.ScreenID, 6, 6);
	this.newControl(oControl);
	oControl.Type = ect_Numeric;
	oControl = new TextControl(AskAdultPINScreen.PINMsgID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(AskAdultPINScreen.ContinueID, this.ScreenID));
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	this.getControl(AskAdultPINScreen.PINMsgID).setText("");

	data = this.getControl(AskAdultPINScreen.PINID).getText();
	if(!testStrHasLen(data))
	{
		this.getControl(AskAdultPINScreen.PINMsgID).setText("PIN must be entered.");
		this.fContainerControl.focusControl(AskAdultPINScreen.PINID, true);
		return;
	}

	var oSession = MainApp.getThe().getSession();

	this.Callback = AskAdultPINScreen.prototype.afterEnableAdultAccess;
	oSession.enableAdultAccess(this, data);
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.afterEnableAdultAccess = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		MainApp.getThe().getScreen(PreferencesScreen.ScreenID).updateAdultAccess();
		this.close();
	}
}

/******************************************************************************/
/******************************************************************************/
