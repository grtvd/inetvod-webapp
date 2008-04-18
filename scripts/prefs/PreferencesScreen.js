/* PreferencesScreen.js */

/******************************************************************************/
/******************************************************************************/

PreferencesScreen.ScreenID = "Prefs001";
PreferencesScreen.AccessAdultValueID = "Prefs001_AccessAdultValue";
PreferencesScreen.AccessAdultButtonID = "Prefs001_AccessAdultButton";
PreferencesScreen.ResetFactoryButtonID = "Prefs001_ResetFactoryButton";

/******************************************************************************/

PreferencesScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new PreferencesScreen());
}

/******************************************************************************/

PreferencesScreen.prototype = new Screen();
PreferencesScreen.prototype.constructor = PreferencesScreen;

/******************************************************************************/

function PreferencesScreen()
{
	var oControl;

	this.ScreenID = PreferencesScreen.ScreenID;
	this.ScreenTitle = "prefs";
	this.ScreenTitleImage = "titlePrefs.gif";
	this.fNeedReload = false;

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);

	oControl = new TextControl(PreferencesScreen.AccessAdultValueID, this.ScreenID);
	this.newControl(oControl);

	oControl = new ButtonControl(PreferencesScreen.AccessAdultButtonID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(PreferencesScreen.ResetFactoryButtonID, this.ScreenID));

	this.updateAdultAccess();
}

/******************************************************************************/

/*boolean*/ PreferencesScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		if (this.fNeedReload)
			document.location.reload();
		else
			MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ PreferencesScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == PreferencesScreen.AccessAdultButtonID)
	{
		this.fNeedReload = true;	//TODO move logic to set only if user enters correct pin.
		AskAdultPINScreen.newInstance();
		return;
	}

	if(controlID == PreferencesScreen.ResetFactoryButtonID)
	{
		MainApp.getThe().getSession().resetDataSettings();
		MainApp.getThe().reset();
		document.location = "../index.jsp";
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*boolean*/ PreferencesScreen.prototype.updateAdultAccess = function()
{
	var oSession = MainApp.getThe().getSession();

	var oControl = this.getControl(PreferencesScreen.AccessAdultValueID);
	oControl.setText(oSession.CanAccessAdult ? "Enabled" : "Disabled");

	oControl = this.getControl(PreferencesScreen.AccessAdultButtonID);
	oControl.setEnabled(!oSession.CanAccessAdult && (oSession.IncludeAdult == ina_PromptPassword));
}

/******************************************************************************/
/******************************************************************************/
