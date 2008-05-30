/* RentedShowDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

RentedShowDetailScreen.ScreenID = "Show003";
RentedShowDetailScreen.PictureID = "Show003_Picture";
RentedShowDetailScreen.StatusIconID = "Show003_StatusIcon";
RentedShowDetailScreen.NameID = "Show003_Name";
RentedShowDetailScreen.EpisodeID = "Show003_Episode";
RentedShowDetailScreen.ReleasedID = "Show003_Released";
RentedShowDetailScreen.DescriptionID = "Show003_Description";
RentedShowDetailScreen.RunningMinsID = "Show003_RunningMins";
RentedShowDetailScreen.CategoryID = "Show003_Category";
RentedShowDetailScreen.ProviderID = "Show003_Provider";
RentedShowDetailScreen.RatingID = "Show003_Rating";
RentedShowDetailScreen.CostID = "Show003_Cost";
RentedShowDetailScreen.RentalPeriodHoursID = "Show003_RentalPeriodHours";
RentedShowDetailScreen.RentedOnLabelID = "Show003_RentedOnLabel";
RentedShowDetailScreen.RentedOnID = "Show003_RentedOn";
RentedShowDetailScreen.AvailableUntilID = "Show003_AvailableUntil";
RentedShowDetailScreen.WatchNowID = "Show003_WatchNow";
RentedShowDetailScreen.DeleteNowID = "Show003_DeleteNow";

/******************************************************************************/

RentedShowDetailScreen.newInstance = function(/*RentedShowSearch*/ rentedShowSearch)
{
	return MainApp.getThe().openScreen(new RentedShowDetailScreen(rentedShowSearch));
}

/******************************************************************************/

RentedShowDetailScreen.prototype = new Screen();
RentedShowDetailScreen.prototype.constructor = RentedShowDetailScreen;

/******************************************************************************/

function RentedShowDetailScreen(/*RentedShowSearch*/ rentedShowSearch)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fRentedShowID = rentedShowSearch.RentedShowID;
	this.fRentedShowSearch = rentedShowSearch;
	this.fRentedShow = null;
	this.ScreenID = RentedShowDetailScreen.ScreenID;
	this.ScreenTitle = "playing";
	this.ScreenTitleImage = "titlePlaying.gif";
	this.fDownloadStatus = "";

	this.fContainerControl = new ContainerControl(this.ScreenID, 22, 80);

	oControl = new ImageControl(RentedShowDetailScreen.PictureID, this.ScreenID);
	if(testStrHasLen(this.fRentedShowSearch.PictureURL))
		oControl.setSource(this.fRentedShowSearch.PictureURL);
	else
		oControl.setSource("images/no_picture_80.gif");
	this.newControl(oControl);

	this.newControl(new ButtonControl(RentedShowDetailScreen.WatchNowID, this.ScreenID));
	this.newControl(new ButtonControl(RentedShowDetailScreen.DeleteNowID, this.ScreenID));

	oControl = new ImageControl(RentedShowDetailScreen.StatusIconID, this.ScreenID);
	oControl.setSource("images/ballRed24.gif");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fRentedShowSearch.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fRentedShowSearch.EpisodeName) || testStrHasLen(this.fRentedShowSearch.EpisodeNumber))
	{
		if(testStrHasLen(this.fRentedShowSearch.EpisodeName))
		{
			tempStr = '"' + this.fRentedShowSearch.EpisodeName + '"';
			if(testStrHasLen(this.fRentedShowSearch.EpisodeNumber))
				tempStr += " (" + this.fRentedShowSearch.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fRentedShowSearch.EpisodeNumber;

	}
	oControl = new TextControl(RentedShowDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText("&nbsp;");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RatingID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CategoryID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(this.fRentedShowSearch.ProviderID));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CostID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentalPeriodHoursID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentedOnLabelID, this.ScreenID)
	oControl.setText("Added On:");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentedOnID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(RentedShowDetailScreen.AvailableUntilID, this.ScreenID);
	if(this.fRentedShowSearch.AvailableUntil)
		tempStr = dateTimeToString(this.fRentedShowSearch.AvailableUntil, dtf_M_D_H_MM_AM);
	oControl.setText(tempStr);
	this.newControl(oControl);

	this.Callback = RentedShowDetailScreen.prototype.afterRentedShow;
	oSession.rentedShow(this, this.fRentedShowID);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.afterRentedShow = function(
	/*RentedShow*/ rentedShow, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		var oSession = MainApp.getThe().getSession();
		var oControl;
		var tempStr;

		this.fRentedShow = rentedShow;

		oControl = this.findControl(RentedShowDetailScreen.DescriptionID);
		oControl.setText(this.fRentedShow.Description);

		tempStr = "n/a";
		if(this.fRentedShow.ReleasedOn)
			tempStr = dateTimeToString(this.fRentedShow.ReleasedOn, dtf_M_D_YYYY, true);
		else if(this.fRentedShow.ReleasedYear)
			tempStr = this.fRentedShow.ReleasedYear.toString();
		oControl = this.findControl(RentedShowDetailScreen.ReleasedID);
		oControl.setText(tempStr);

		tempStr = "n/a";
		if(this.fRentedShow.RunningMins)
			tempStr = this.fRentedShow.RunningMins + " mins";
		oControl = this.findControl(RentedShowDetailScreen.RunningMinsID);
		oControl.setText(tempStr);

		tempStr = "n/a";
		if(this.fRentedShow.RatingID)
			tempStr = oSession.getRatingName(this.fRentedShow.RatingID)
		oControl = this.findControl(RentedShowDetailScreen.RatingID);
		oControl.setText(tempStr);

		oControl = this.findControl(RentedShowDetailScreen.CategoryID);
		oControl.setText(oSession.getCategoryNames(this.fRentedShow.CategoryIDList));

		oControl = this.findControl(RentedShowDetailScreen.CostID);
		oControl.setText(this.fRentedShow.ShowCost.CostDisplay);
	
		tempStr = "n/a";
		oControl = this.findControl(RentedShowDetailScreen.RentalPeriodHoursID);
		if(this.fRentedShow.ShowCost.RentalPeriodHours)
			tempStr = this.fRentedShow.ShowCost.RentalPeriodHours + " hrs";
		oControl.setText(tempStr);

		oControl = this.findControl(RentedShowDetailScreen.RentedOnLabelID)
		oControl.setText((this.fRentedShow.ShowCost.ShowCostType == sct_Free) ? "Added On:" : "Rented On:");

		oControl = this.findControl(RentedShowDetailScreen.RentedOnID);
		oControl.setText(dateTimeToString(this.fRentedShow.RentedOn, dtf_M_D_H_MM_AM));
	}
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.idle = function()
{
	if(this.fDownloadStatus != DownloadStatus_Completed)
	{
		var oSession = MainApp.getThe().getSession();

		oSession.downloadRefresh();
		var newDownloadStatus = oSession.getDownloadRentedShowStatus(this.fRentedShowID);

		if(this.fDownloadStatus != newDownloadStatus)
		{
			this.fDownloadStatus = newDownloadStatus;

			var oControl = this.findControl(RentedShowDetailScreen.StatusIconID);

			if(this.fDownloadStatus == DownloadStatus_InProgress)
				oControl.setSource("images/ballYellow24.gif");
			else if(this.fDownloadStatus == DownloadStatus_Completed)
				oControl.setSource("images/ballGreen24.gif");
			else //if(this.fDownloadStatus == DownloadStatus_NotStarted)
				oControl.setSource("images/ballRed24.gif");
			//else
			//	oControl.setSource("images/ballOrange32.gif");
		}
	}

	Screen.prototype.idle.call(this);
}

/******************************************************************************/

/*boolean*/ RentedShowDetailScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == RentedShowDetailScreen.WatchNowID)
	{
		this.Callback = RentedShowDetailScreen.prototype.afterWatchShow;
		oSession.watchShow(this, this.fRentedShowID);
		return;
	}
	else if(controlID == RentedShowDetailScreen.DeleteNowID)
	{
		this.Callback = RentedShowDetailScreen.prototype.afterReleaseShow;
		oSession.releaseShow(this, this.fRentedShowID);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.afterWatchShow = function(/*License*/ license,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode != sc_Success)
		return;

	var oSession = MainApp.getThe().getSession();
	oSession.downloadRefresh();

	var useApp = oSession.determineAppForShow(license.ShowURL);
	var downloadStatus = oSession.getDownloadRentedShowStatus(this.fRentedShowID);

	var playLocal = false;

	// downloadStatus will be null if DownloadServiceMgr is not insalled
	if(downloadStatus == DownloadStatus_Completed)
		playLocal = true;
	else if((downloadStatus == DownloadStatus_InProgress) && (useApp == Application_WindowsMediaPlayer))
		playLocal = true;

	if(playLocal)
	{
		if(!oSession.playDownloadedRentedShow(this.fRentedShowID, useApp))
		{
			playLocal = false;
			showMsg("An error occurred while trying to play locally.  Show will be streamed.");
		}
	}

	if(!playLocal)
		MediaPlayerScreen.newInstance(license.ShowURL, useApp);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.afterReleaseShow = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		document.location.reload(true);
//		this.close();
//		MainApp.getThe().closePopup();

		//		var oNowPlayingScreen = MainApp.getThe().findScreen(NowPlayingScreen.ScreenID);
//		if(oNowPlayingScreen != null)
//			oNowPlayingScreen.removeRentedShow(this.fRentedShowID);
	}
}

/******************************************************************************/
/******************************************************************************/
