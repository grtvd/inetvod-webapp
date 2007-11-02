/* StartScreen.js */

/******************************************************************************/
/******************************************************************************/

StartScreen.ScreenID = "StartUp001";
StartScreen.StartID = "StartUp001_Start";

/******************************************************************************/

StartScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new StartScreen());
}

/******************************************************************************/

StartScreen.prototype = new Screen();
StartScreen.prototype.constructor = StartScreen;

/******************************************************************************/

function StartScreen()
{
	this.ScreenID = StartScreen.ScreenID;
	this.ScreenTitle = "welcome";
	this.ScreenTitleImage = "titleWelcome.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 80, 120);
	this.newControl(new ButtonControl(StartScreen.StartID, this.ScreenID));
}

/******************************************************************************/

/*void*/ StartScreen.prototype.onButton = function(/*string*/ controlID)
{
	this.close();
	StartupInitialCheck();
}

/******************************************************************************/
/******************************************************************************/
