/* SearchDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchDetailScreen.ScreenID = "Search004";
SearchDetailScreen.PictureID = "Search004_Picture";
SearchDetailScreen.NameID = "Search004_Name";
SearchDetailScreen.EpisodeID = "Search004_Episode";
SearchDetailScreen.ReleasedID = "Search004_Released";
SearchDetailScreen.DescriptionID = "Search004_Description";
SearchDetailScreen.RunningMinsID = "Search004_RunningMins";
SearchDetailScreen.CategoryID = "Search004_Category";
SearchDetailScreen.ProviderID = "Search004_Provider";
SearchDetailScreen.RatingID = "Search004_Rating";
SearchDetailScreen.CostID = "Search004_Cost";
SearchDetailScreen.RentalPeriodHoursID = "Search004_RentalPeriodHours";
SearchDetailScreen.MultiRentalsID = "Search004_MultiRentals";
SearchDetailScreen.RentNowID = "Search004_RentNow";

/******************************************************************************/

SearchDetailScreen.newInstance = function(/*ShowSearch*/ showSearch)
{
	return MainApp.getThe().openScreen(new SearchDetailScreen(showSearch));
}

/******************************************************************************/

SearchDetailScreen.prototype = new Screen();
SearchDetailScreen.prototype.constructor = SearchDetailScreen;

/******************************************************************************/

function SearchDetailScreen(/*ShowSearch*/ showSearch)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fShowID = showSearch.ShowID;
	this.fShowSearch = showSearch;
	this.fShowDetail = null;
	this.ScreenID = SearchDetailScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 22, 80);

	oControl = new ImageControl(SearchDetailScreen.PictureID, this.ScreenID);
	if(testStrHasLen(this.fShowSearch.PictureURL))
		oControl.setSource(this.fShowSearch.PictureURL);
	else
		oControl.setSource("images/no_picture_80.gif");
	this.newControl(oControl);

	oControl = new ButtonControl(SearchDetailScreen.RentNowID, this.ScreenID);
	oControl.setText("Get Now");
	this.newControl(oControl);


	oControl = new TextControl(SearchDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fShowSearch.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fShowSearch.EpisodeName) || testStrHasLen(this.fShowSearch.EpisodeNumber))
	{
		if(testStrHasLen(this.fShowSearch.EpisodeName))
		{
			tempStr = '"' + this.fShowSearch.EpisodeName + '"';
			if(testStrHasLen(this.fShowSearch.EpisodeNumber))
				tempStr += " (" + this.fShowSearch.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fShowSearch.EpisodeNumber;

	}
	oControl = new TextControl(SearchDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(this.buildReleased(this.fShowSearch.ReleasedOn, this.fShowSearch.ReleasedYear));
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.RatingID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CategoryID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.ProviderID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CostID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.RentalPeriodHoursID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.MultiRentalsID, this.ScreenID);
	oControl.setText("");
	this.newControl(oControl);

	this.Callback = SearchDetailScreen.prototype.afterShowDetail;
	oSession.showDetail(this, this.fShowID);
}

/******************************************************************************/

/*void*/ SearchDetailScreen.prototype.afterShowDetail = function(
	/*ShowDetail*/ showDetail, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		var oSession = MainApp.getThe().getSession();
		var oControl;
		var tempStr;

		this.fShowDetail = showDetail;

		var showProvider = this.fShowDetail.ShowProviderList[0];
		var showCost = showProvider.ShowCostList[0];

		oControl = this.findControl(SearchDetailScreen.RentNowID);
		oControl.setText((showCost.ShowCostType == sct_Free) ? "Get Now" : "Rent Now");

		oControl = this.findControl(SearchDetailScreen.DescriptionID);
		oControl.setText(this.fShowDetail.Description);

		tempStr = "n/a";
		if(this.fShowDetail.RunningMins)
			tempStr = this.fShowDetail.RunningMins + " mins";
		oControl = this.findControl(SearchDetailScreen.RunningMinsID);
		oControl.setText(tempStr);

		tempStr = "n/a";
		if(this.fShowDetail.RatingID)
			tempStr = oSession.getRatingName(this.fShowDetail.RatingID)
		oControl = this.findControl(SearchDetailScreen.RatingID);
		oControl.setText(tempStr);

		oControl = this.findControl(SearchDetailScreen.CategoryID);
		oControl.setText(oSession.getCategoryNames(this.fShowDetail.CategoryIDList));

		oControl = this.findControl(SearchDetailScreen.ProviderID);
		oControl.setText(oSession.getProviderName(showProvider.ProviderID));

		oControl = this.findControl(SearchDetailScreen.CostID);
		oControl.setText(showCost.CostDisplay);

		oControl = this.findControl(SearchDetailScreen.RentalPeriodHoursID);
		oControl.setText(showCost.formatRental());

		oControl = this.findControl(SearchDetailScreen.MultiRentalsID);
		if((this.fShowDetail.ShowProviderList.length > 1) || (showProvider.ShowCostList.length > 1))
			oControl.setText("* Additional rentals available.");
		else
			oControl.setText("");
	}
}

/**********************************************************************************************************************/

/*string*/ SearchDetailScreen.prototype.buildReleased = function(/*Date*/ releasedOn, /*int*/ releasedYear)
{
	var released = "";

	if(releasedOn)
	{
		var totalDays = (today().getTime() - releasedOn.getTime()) / MillsPerDay;	//compare to today at midmight

		if(totalDays <= 0.0)	//release after midnight
			released = dateTimeToString(releasedOn, dtf_H_MMa);
		else if(totalDays <= 6)
			released = dayOfWeekToString(releasedOn.getDay()) + " " + dateTimeToString(releasedOn, dtf_Ha);
		else if(totalDays <= 13)
			released = dateTimeToString(releasedOn, dtf_M_D) + " " + dateTimeToString(releasedOn, dtf_Ha);
		else
			released = dateTimeToString(releasedOn, dtf_M_D_YYYY);
	}
	else if(releasedYear)
		released = releasedYear.toString();

	return released;
}

/******************************************************************************/

/*boolean*/ SearchDetailScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ SearchDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == SearchDetailScreen.RentNowID)
	{
		if(this.fShowDetail == null)	// ShowDetail not yet loaded
		{
			showMsg("Sorry, the page is still loading, please try again.");
			return;
		}

		if(!oSession.isGuestAccess())
		{
			RentScreen.newInstance(this.fShowDetail);
			return;
		}

		this.Callback = SearchDetailScreen.prototype.doAfterSignon;

		if(!oSession.haveUserID())
		{
			SetupScreen.newInstance(this);
			return;
		}

		if(!oSession.haveUserPassword())
		{
			LogonScreen.newInstance(this);
			return;
		}

		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SearchDetailScreen.prototype.doAfterSignon = function()
{
	RentScreen.newInstance(this.fShowDetail);
}

/******************************************************************************/
/******************************************************************************/
