/* NowPlayingScreen.js */

/**********************************************************************************************************************/
/**********************************************************************************************************************/

NowPlayingScreen.ScreenID = "Show002";
NowPlayingScreen.BodyID = "Show002_Body";
NowPlayingScreen.ShowListID = "Show002_ShowList";
NowPlayingScreen.RentedShowID = "RentedShowID";
NowPlayingScreen.PictureID = "PictureID";
NowPlayingScreen.SortByNameID = "Show002_SortByName";
NowPlayingScreen.SortByReleasedOnID = "Show002_SortByReleasedOn";
NowPlayingScreen.SortByRentedOnID = "Show002_SortByRentedOn";
NowPlayingScreen.SortByAvailableUntilID = "Show002_SortByAvailableUntil";
NowPlayingScreen.HeaderNameImageID = "Show002_ShowList_Head_Name_Img";
NowPlayingScreen.HeaderReleasedOnImageID = "Show002_ShowList_Head_ReleasedOn_Img";
NowPlayingScreen.HeaderRentedOnImageID = "Show002_ShowList_Head_RentedOn_Img";
NowPlayingScreen.HeaderAvailableUntilImageID = "Show002_ShowList_Head_AvailableUntil_Img";
NowPlayingScreen.NoShowsTextID = "Show002_NoShowsText";

/**********************************************************************************************************************/

var gNowPlayingScreen = null;

/**********************************************************************************************************************/

NowPlayingScreen.getThe = function()
{
	return gNowPlayingScreen;
}

/**********************************************************************************************************************/

NowPlayingScreen.newInstance = function(/*RentedShowSearchList*/ rentedShowSearchList)
{
	gNowPlayingScreen = new NowPlayingScreen(rentedShowSearchList);
	return gNowPlayingScreen;
}

/**********************************************************************************************************************/

function NowPlayingScreen(/*Array*/ rentedShowSearchList)
{
	this.fRentedShowSearchList = rentedShowSearchList;
	//no initial sort - this.fRentedShowSearchList.sort(RentedShowSearchByAvailableUntilCmpr);
	this.oBody = document.getElementById(NowPlayingScreen.BodyID);
	this.oShowList = document.getElementById(NowPlayingScreen.ShowListID);
	this.oNoShowsText = document.getElementById(NowPlayingScreen.NoShowsTextID);

	this.fSortBy = NowPlayingScreen.SortByRentedOnID;
	this.fDescending = false;

	this.createShowList(false);
	this.checkNoShowsTest();

	setTimeout("NowPlayingScreen.getThe().loadPictures()", 250);
}

/**********************************************************************************************************************/

/*void*/ NowPlayingScreen.prototype.checkNoShowsTest = function()
{
	setStyleDisplay(this.oBody, this.fRentedShowSearchList.length > 0);
	if (this.fRentedShowSearchList.length == 0)
		this.oNoShowsText.innerHTML = "Your 'My Shows' list is empty. 'My Shows' keeps track of shows that you pick or rent to be downloaded or watch later.<br><br>It is a good idea to keep many shows in your 'My Shows' list. This will allow new shows to be downloaded while you are watching another show.";
	else
		this.oNoShowsText.innerHTML = "";
}

/**********************************************************************************************************************/

/*void*/ NowPlayingScreen.prototype.createShowList = function(/*boolean*/ showPicture)
{
	this.deleteShowList();

	var oTBody = this.oShowList.tBodies.item(0);
	for(var i = 0; i < this.fRentedShowSearchList.length; i++)
	{
		var rentedShowSearch = this.fRentedShowSearchList[i];
		var oRow = oTBody.insertRow(-1);
		this.createOneShowListItem(oRow, i, rentedShowSearch, showPicture);
	}
}

/**********************************************************************************************************************/

/*void*/ NowPlayingScreen.prototype.createOneShowListItem = function(/*Element*/ oTableRow, /*int*/ pos,
	/*RentedShowSearch*/ rentedShowSearch, /*boolean*/ showPicture)
{
	oTableRow.className = "listRow";
	oTableRow.onclick = new Function("NowPlayingScreen.getThe().openRentedShowDetail('" + rentedShowSearch.RentedShowID + "');");

	// cell for spacing (also holding span for RentedShowID)
	var oCell = oTableRow.insertCell(-1);
	//oCell.width = 0;

	// span to hold RentedShowID
	var oSpan = document.createElement("span");
	oSpan.id = rentedShowSearch.RentedShowID;
	oSpan.style.display = "none";
	oCell.insertBefore(oSpan, null);

	// cell with table containing Picture, Name, EpisodeName
	var oMainCell = oTableRow.insertCell(-1);

	// table containing Picture, Name, EpisodeName
	var oTable = document.createElement("table");
	oTable.cellPadding = 0;
	oTable.cellSpacing = 0;
	oMainCell.insertBefore(oTable, null);

	// row for Picture, Name
	var oRow = oTable.insertRow(-1);

	// cell for Picture
	oCell = oRow.insertCell(-1);
	oCell.rowSpan = 2;
	oCell.width = 48;
	oCell.height = 48;
	oCell.vAlign = "top";

	// image for Picture
	var oImage = document.createElement("img");
	oImage.id = this.buildRowItemID(NowPlayingScreen.PictureID, pos);
	oImage.border = "0";
	setStyleProperty(oImage, "width", "48px");
	oImage.alt = "";
	oCell.insertBefore(oImage, null);
	oImage.src = (showPicture && testStrHasLen(rentedShowSearch.PictureURL)) ? rentedShowSearch.PictureURL
		: "images/no_picture_48.gif";

	// cell for Name
	oCell = oRow.insertCell(-1);
	oCell.className = "listItem";
	oCell.innerHTML = rentedShowSearch.Name;

	// row for EpisodeName
	oRow = oTable.insertRow(-1);

	// cell for EpisodeName
	oCell = oRow.insertCell(-1);
	oCell.className = "listSmallWrapItem";
	oCell.innerHTML = rentedShowSearch.EpisodeName;


	// cell for Released
	oCell = oTableRow.insertCell(-1);
	oCell.className = "listSmallItem";
	oCell.innerHTML = this.buildReleased(rentedShowSearch.ReleasedOn, rentedShowSearch.ReleasedYear);

	// cell for Added
	oCell = oTableRow.insertCell(-1);
	oCell.className = "listSmallItem";
	oCell.innerHTML = this.buildRentedOn(rentedShowSearch.RentedOn);

	// cell for AvailableUntil
	oCell = oTableRow.insertCell(-1);
	oCell.className = "listSmallItem";
	oCell.innerHTML = this.buildAvailableUntil(rentedShowSearch.AvailableUntil);
}

/**********************************************************************************************************************/

/*string*/ NowPlayingScreen.prototype.buildRowItemID = function(/*string*/ itemID, /*int*/ pos)
{
	return NowPlayingScreen.ShowListID + "_" + pos + "_" + itemID;
}

/**********************************************************************************************************************/

/*string*/ NowPlayingScreen.prototype.buildReleased = function(/*Date*/ releasedOn, /*int*/ releasedYear)
{
	var released = "";

	if(releasedOn)
	{
		var now = new Date();
		var totalDays = (now.getTime() - releasedOn.getTime()) / MillsPerDay;

		if(totalDays < 1)
			released = "Today";
		else if(totalDays <= 7)
			released = dayOfWeekToString(releasedOn.getUTCDay());
		else if(totalDays <= 365)
			released = dateTimeToString(releasedOn, dtf_M_D, true);
		else
			released = releasedOn.getUTCFullYear().toString();
	}
	else if(releasedYear)
		released = releasedYear.toString();

	return released;
}

/**********************************************************************************************************************/

/*string*/ NowPlayingScreen.prototype.buildRentedOn = function(/*Date*/ rentedOn)
{
	var rented = "";

	if(rentedOn != null)
	{
		var now = new Date();
		var totalDays = (now.getTime() - rentedOn.getTime()) / MillsPerDay;

		if(totalDays <= 1)
			rented = dateTimeToString(rentedOn, dtf_H_MMa);
		else if(totalDays <= 7)
			rented = dayOfWeekToString(rentedOn.getDay(), false) + " " + dateTimeToString(rentedOn, dtf_Ha);
		else
			rented = dateTimeToString(rentedOn, dtf_M_D);
	}

	return rented;
}

/**********************************************************************************************************************/

/*string*/ NowPlayingScreen.prototype.buildAvailableUntil = function(/*Date*/ availableUntil)
{
	var expires = "n/a";

	if(availableUntil != null)
	{
		var now = new Date();
		var totalDays = (availableUntil.getTime() - now.getTime()) / MillsPerDay;

		if(totalDays < 0)
			expires = "Expired";
		else if(totalDays <= 1)
			expires = dateTimeToString(availableUntil, dtf_H_MMa);
		else if(totalDays <= 7)
		{
			expires = dayOfWeekToString(availableUntil.getDay(), false)
				+ " " + dateTimeToString(availableUntil, dtf_Ha);
		}
		else
			expires = dateTimeToString(availableUntil, dtf_M_D);
	}

	return expires;
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.deleteShowList = function()
{
	for(var j = this.oShowList.tBodies.length - 1; j >= 0; j--)
		for(var i = this.oShowList.tBodies.item(j).rows.length - 1; i >= 0; i--)
			this.oShowList.tBodies.item(j).deleteRow(i);
}

/**********************************************************************************************************************/

/*void*/ NowPlayingScreen.prototype.sortSortList = function(/*string*/ controlID)
{
	var oSortImg = null;
	var sortFnc;

	if(this.fSortBy == NowPlayingScreen.SortByNameID)
		oSortImg = document.getElementById(NowPlayingScreen.HeaderNameImageID);
	else if(this.fSortBy == NowPlayingScreen.SortByReleasedOnID)
		oSortImg = document.getElementById(NowPlayingScreen.HeaderReleasedOnImageID);
	else if(this.fSortBy == NowPlayingScreen.SortByRentedOnID)
		oSortImg = document.getElementById(NowPlayingScreen.HeaderRentedOnImageID);
	else if(this.fSortBy == NowPlayingScreen.SortByAvailableUntilID)
		oSortImg = document.getElementById(NowPlayingScreen.HeaderAvailableUntilImageID);

	if(oSortImg)
		oSortImg.src = "../images/spacer.gif";

	if(controlID == NowPlayingScreen.SortByReleasedOnID)
	{
		this.fDescending = (this.fSortBy == NowPlayingScreen.SortByReleasedOnID) ? !this.fDescending : false;
		this.fSortBy = NowPlayingScreen.SortByReleasedOnID;
		sortFnc = (this.fDescending ? RentedShowSearchByReleasedOnDescCmpr : RentedShowSearchByReleasedOnCmpr);
		oSortImg = document.getElementById(NowPlayingScreen.HeaderReleasedOnImageID);
	}
	else if(controlID == NowPlayingScreen.SortByRentedOnID)
	{
		this.fDescending = (this.fSortBy == NowPlayingScreen.SortByRentedOnID) ? !this.fDescending : false;
		this.fSortBy = NowPlayingScreen.SortByRentedOnID;
		sortFnc = (this.fDescending ? RentedShowSearchByRentedOnDescCmpr : RentedShowSearchByRentedOnCmpr);
		oSortImg = document.getElementById(NowPlayingScreen.HeaderRentedOnImageID);
	}
	else if(controlID == NowPlayingScreen.SortByAvailableUntilID)
	{
		this.fDescending = (this.fSortBy == NowPlayingScreen.SortByAvailableUntilID) ? !this.fDescending : false;
		this.fSortBy = NowPlayingScreen.SortByAvailableUntilID;
		sortFnc = (this.fDescending ? RentedShowSearchByAvailableUntilDescCmpr : RentedShowSearchByAvailableUntilCmpr);
		oSortImg = document.getElementById(NowPlayingScreen.HeaderAvailableUntilImageID);
	}
	else
	{
		this.fDescending = (this.fSortBy == NowPlayingScreen.SortByNameID) ? !this.fDescending : false;
		this.fSortBy = NowPlayingScreen.SortByNameID;
		sortFnc = (this.fDescending ? RentedShowSearchByNameDescCmpr : RentedShowSearchByNameCmpr);
		oSortImg = document.getElementById(NowPlayingScreen.HeaderNameImageID);
	}
	oSortImg.src = this.fDescending ? "images/sort_desc.gif" : "images/sort_asc.gif";

	this.fRentedShowSearchList.sort(sortFnc);
}

/**********************************************************************************************************************/

/*void*/ NowPlayingScreen.prototype.loadPictures = function()
{
	for(var i = 0; i < this.fRentedShowSearchList.length; i++)
	{
		var rentedShowSearch = this.fRentedShowSearchList[i];
		if(testStrHasLen(rentedShowSearch.PictureURL))
		{
			var imageObj = document.getElementById(this.buildRowItemID(NowPlayingScreen.PictureID, i));
			if(imageObj)
				imageObj.src = rentedShowSearch.PictureURL;
		}
	}
}

/**********************************************************************************************************************/

/*void*/ NowPlayingScreen.prototype.openRentedShowDetail = function(/*RentedShowID*/ rentedShowID)
{
	var rentedShowSearch = arrayFindItemByCmpr(this.fRentedShowSearchList, new RentedShowSearchToIDCmpr(rentedShowID));
	if(rentedShowSearch)
		StartupRentedShowDetail(rentedShowSearch);
}

/**********************************************************************************************************************/

/*void*/ NowPlayingScreen.prototype.removeRentedShow = function(/*RentedShowID*/ rentedShowID)
{
	arrayRemoveByCmpr(this.fRentedShowSearchList, new RentedShowSearchToIDCmpr(rentedShowID));

	var found = false;
	for(var i = 0; (i < this.oShowList.rows.length) && !found; i++)
	{
		var oRow = this.oShowList.rows.item(i);
		var oSpans = oRow.getElementsByTagName("span");
		for(var j = 0; (j < oSpans.length) && !found; j++)
		{
			if(oSpans[j].id == rentedShowID)
			{
				this.oShowList.deleteRow(i);
				found = true;
			}
		}
	}

	this.checkNoShowsTest();
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onButton = function(/*string*/ controlID)
{
	if((controlID == NowPlayingScreen.SortByNameID) || (controlID == NowPlayingScreen.SortByReleasedOnID)
		|| (controlID == NowPlayingScreen.SortByRentedOnID) || (controlID == NowPlayingScreen.SortByAvailableUntilID))
	{
		this.sortSortList(controlID);
		this.createShowList(true);
	}
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
