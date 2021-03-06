/* RatingSelectScreen.js */

/******************************************************************************/
/******************************************************************************/

RatingSelectScreen.ScreenID = "Search008";
RatingSelectScreen.RatingsID = "Search008_Ratings";

/******************************************************************************/

RatingSelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new RatingSelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.RatingID))
	{
		var oTextListControl = oScreen.getControl(RatingSelectScreen.RatingsID);
		oTextListControl.setFocusedItemByName(oSearchData.RatingID);
	}

	return oScreen;
}

/******************************************************************************/

RatingSelectScreen.prototype = new Screen();
RatingSelectScreen.prototype.constructor = RatingSelectScreen;

/******************************************************************************/

function RatingSelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = RatingSelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Rating", 300, "listCtrItem_normal"));

	this.fContainerControl = new ContainerControl(this.ScreenID, 80, 100);

	this.fSearchData = oSearchData;

	// load the Ratings
	var oSession = MainApp.getThe().getSession();
	var ratingList = oSession.getRatingList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Rating.AllRatingsID, oSession.getRatingName(Rating.AllRatingsID)));
	for(var i = 0; i < ratingList.length; i++)
		itemList.push(new NameValuePair(ratingList[i].RatingID, ratingList[i].Name));

	this.newControl(new TextListControl(RatingSelectScreen.RatingsID, this.ScreenID,
		oRowItemList, itemList));
}

/******************************************************************************/

/*void*/ RatingSelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(RatingSelectScreen.RatingsID);
	this.fSearchData.RatingID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.RatingID);
	oButtonControl.setText(oSession.getRatingName(this.fSearchData.RatingID));

	this.close();
}

/******************************************************************************/
/******************************************************************************/
