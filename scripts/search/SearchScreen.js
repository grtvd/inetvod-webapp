/* SearchScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchScreen.ScreenID = "Search006";
SearchScreen.ShowNameID = "Search006_ShowName";
SearchScreen.ShowNameMsgID = "Search006_ShowName_Msg";
SearchScreen.SearchID = "Search006_Search";
SearchScreen.ProviderID = "Search006_Provider";
SearchScreen.CategoryID = "Search006_Category";
SearchScreen.RatingID = "Search006_Rating";

SearchScreen.SEARCH_PARAM = "search";
SearchScreen.PROVIDERID_PARAM = "provderid";
SearchScreen.CATEGORYID_PARAM = "categoryid";
SearchScreen.RATINGID_PARAM = "ratingid";

/******************************************************************************/

SearchScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new SearchScreen());
}

/******************************************************************************/

SearchScreen.prototype = new Screen();
SearchScreen.prototype.constructor = SearchScreen;

/******************************************************************************/

function SearchScreen()
{
	var oControl;

	this.ScreenID = SearchScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 80, 100);
	//this.fContainerControl.onNavigate = SearchScreen.onNavigate;

	oControl = new EditControl(SearchScreen.ShowNameID, this.ScreenID, 32, 64);
	this.newControl(oControl);
	oControl.Type = ect_AlphaNumeric;
	this.newControl(new ButtonControl(SearchScreen.SearchID, this.ScreenID));
	oControl = new TextControl(SearchScreen.ShowNameMsgID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(SearchScreen.ProviderID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.CategoryID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.RatingID, this.ScreenID));

	this.fSearchData = new SearchData();
}

/******************************************************************************/

/*boolean*/ SearchScreen.prototype.key = function(/*int*/ key, /*Event*/ evt)
{
	if((key == ek_Back) || (key == ek_Escape))
	{
		MainApp.getThe().closePopup();
		return;
	}

	return Screen.prototype.key.call(this, key, evt);
}

/******************************************************************************/

/*void*/ SearchScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oControl;

	if((controlID == SearchScreen.SearchID) || (controlID == SearchScreen.ShowNameID))
	{
		oControl = this.getControl(SearchScreen.ShowNameID);
		this.fSearchData.Search = oControl.getText();

		if(!testStrHasLen(this.fSearchData.Search))
		{
			this.getControl(SearchScreen.ShowNameMsgID).setText("Partial title must be entered.");
			this.fContainerControl.focusControl(SearchScreen.ShowNameID, true);
			return;
		}

		var url = "searchResults.jsp?" + SearchScreen.SEARCH_PARAM + "=" + encodeURIComponent(this.fSearchData.Search);
		if(this.fSearchData.ProviderID != Provider.AllProvidersID)
			url += "&" + SearchScreen.PROVIDERID_PARAM + "=" + this.fSearchData.ProviderID;
		if(this.fSearchData.CategoryID != Category.AllCategoriesID)
			url += "&" + SearchScreen.CATEGORYID_PARAM + "=" + this.fSearchData.CategoryID;
		if(this.fSearchData.RatingID != Rating.AllRatingsID)
			url += "&" + SearchScreen.RATINGID_PARAM + "=" + this.fSearchData.RatingID;
		location.assign(url);
		return;
	}

	if(controlID == SearchScreen.ProviderID)
	{
		ProviderSelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.CategoryID)
	{
		CategorySelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.RatingID)
	{
		RatingSelectScreen.newInstance(this.fSearchData);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*string*/ SearchScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
	{
		if(fromControl == SearchScreen.SearchID)
			return SearchScreen.ShowNameID;
	}

	if(key == ek_RightButton)
	{
		if((fromControl == SearchScreen.ShowNameID)
				|| (fromControl == SearchScreen.ProviderID)
				|| (fromControl == SearchScreen.CategoryID)
				|| (fromControl == SearchScreen.RatingID))
			return SearchScreen.SearchID;
	}

	if(key == ek_DownButton)
	{
		if(fromControl == SearchScreen.ShowNameID)
			return SearchScreen.ProviderID;
	}

	if(key == ek_UpButton)
	{
		if(fromControl == SearchScreen.ProviderID)
			return SearchScreen.ShowNameID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
