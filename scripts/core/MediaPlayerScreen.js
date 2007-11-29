/* MediaPlayerScreen.js */

/******************************************************************************/
/******************************************************************************/

MediaPlayerScreen.ScreenID = "Player001";
MediaPlayerScreen.MediaPlayerID = "Player001_MediaPlayer";

/******************************************************************************/

MediaPlayerScreen.newInstance = function(/*string*/ url, /*string*/ useApp)
{
	var oScreen = MainApp.getThe().openScreen(new MediaPlayerScreen(url, useApp));
	oScreen.playMedia();
	return oScreen;
}

/******************************************************************************/

MediaPlayerScreen.prototype = new Screen();
MediaPlayerScreen.prototype.constructor = MediaPlayerScreen;

/******************************************************************************/

function MediaPlayerScreen(/*string*/ url, /*string*/ useApp)
{
	this.fURL = url;
	this.fUseApp = useApp;
	this.ScreenID = MediaPlayerScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 12, 42);

	this.fMediaPlayer = document.getElementById(MediaPlayerScreen.MediaPlayerID);
	if(this.fMediaPlayer == null)
		throw "MediaPlayerScreen::ctor(url): Can't find UI object, ID(" + MediaPlayerScreen.MediaPlayerID + ")";

	this.fPlayerSource = this.buildPlayerURL();
}

/******************************************************************************/

/*void*/ MediaPlayerScreen.prototype.close = function()
{
	this.fMediaPlayer.style.visibility = "hidden";
	this.fMediaPlayer.src = "";

	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ MediaPlayerScreen.prototype.playMedia = function()
{
	if(testStrHasLen(this.fPlayerSource))
	{
		this.fMediaPlayer.src = this.fPlayerSource;
		this.fMediaPlayer.style.visibility = "visible";
	}
	else
		showMsg("I don't know how to play this Show.");
}

/******************************************************************************/

/*string*/ MediaPlayerScreen.prototype.buildPlayerURL = function()
{
	if(Application_QuickTimePlayer == this.fUseApp)
		return "playQuickTime.jsp?url=" + this.fURL;

	if(Application_WindowsMediaPlayer == this.fUseApp)
		return "playWindowsMedia.jsp?url=" + this.fURL;

	return null;
}

/******************************************************************************/
/******************************************************************************/
