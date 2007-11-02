/* AskPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskPINScreen.ScreenID = "Startup004";

AskPINScreen.PINID = "Startup004_PIN";
AskPINScreen.ContinueID = "Startup004_Continue";

/******************************************************************************/

AskPINScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new AskPINScreen());
}

/******************************************************************************/

AskPINScreen.prototype = new Screen();
AskPINScreen.prototype.constructor = AskPINScreen;

/******************************************************************************/

function AskPINScreen()
{
	var oControl;

	this.ScreenID = AskPINScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 200);

	oControl = new EditControl(AskPINScreen.PINID, this.ScreenID, 6, 6);
	this.newControl(oControl);
//TODO?	oControl.AutoButton = true;
	this.newControl(new ButtonControl(AskPINScreen.ContinueID, this.ScreenID));
}

/******************************************************************************/

/*boolean*/ AskPINScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	var handled = Screen.prototype.key.call(this, key, evt);

	if((key == ek_Back) || (key == ek_Escape))
	{
		if(!this.isOpen())
			MainApp.getThe().closePopup();
	}

	return handled;
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

		oSession.loadSystemData(StartupInitial_afterLoadSystemData);
	}
}

/******************************************************************************/
/******************************************************************************/
