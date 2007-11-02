/* NotInstalledScreen.js */

/******************************************************************************/
/******************************************************************************/

NotInstalledScreen.ScreenID = "StartUp002";
NotInstalledScreen.ContinueID = "StartUp002_Continue";

/******************************************************************************/

NotInstalledScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new NotInstalledScreen());
}

/******************************************************************************/

NotInstalledScreen.prototype = new Screen();
NotInstalledScreen.prototype.constructor = NotInstalledScreen;

/******************************************************************************/

function NotInstalledScreen()
{
	this.ScreenID = NotInstalledScreen.ScreenID;
	this.ScreenTitle = "setup";
	this.ScreenTitleImage = "titleSetup.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 200);

	this.newControl(new ButtonControl(NotInstalledScreen.ContinueID, this.ScreenID));
}

/******************************************************************************/

/*void*/ NotInstalledScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(MainApp.getThe().getSession().checkInstall())
	{
		this.close();
		StartupInitialCheck();
	}
	else
		showMsg("iNetVOD has not yet been installed.");
}

/******************************************************************************/
/******************************************************************************/
