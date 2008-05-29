/* nowPlaying.js */

/**********************************************************************************************************************/
/**********************************************************************************************************************/

var gNowPlayingViewData = null;

NowPlayingViewData.ContainerFieldName = "Data";

/**********************************************************************************************************************/

function NowPlayingViewData(reader)
{
	this.RentedShowSearchList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/**********************************************************************************************************************/

/*NowPlayingViewData*/ NowPlayingViewData.newInstanceFromXmlString = function(/*string*/ dataStr)
{
	if(!testStrHasLen(dataStr))
		return null;

	var dataReader = new XmlDataReader(createXmlDocument(dataStr));
	return dataReader.readObject(NowPlayingViewData.ContainerFieldName, NowPlayingViewData);
}

/**********************************************************************************************************************/

/*void*/ NowPlayingViewData.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowSearchList = reader.readList("RentedShowSearch", RentedShowSearch);
}

/**********************************************************************************************************************/

/*void*/ function LoadNowPlayingViewData(/*XML String*/ xmlData)
{
	gNowPlayingViewData = NowPlayingViewData.newInstanceFromXmlString(xmlData);
}

/**********************************************************************************************************************/

/*void*/ function SetNowPlayingImages()
{
	if (gNowPlayingViewData && gNowPlayingViewData.RentedShowSearchList)
	{
		for(var i = 0; i < gNowPlayingViewData.RentedShowSearchList.length; i++)
		{
			var rentedShowSearch = gNowPlayingViewData.RentedShowSearchList[i];
			if(testStrHasLen(rentedShowSearch.PictureURL))
			{
				var showPosObj = document.getElementById(rentedShowSearch.RentedShowID);
				if(showPosObj)
				{
					var showPos = showPosObj.innerHTML;
					var imageObj = document.getElementById("Show002_ShowList_" + showPos + "_Picture");
					if(imageObj)
						imageObj.src = rentedShowSearch.PictureURL;
				}
			}
		}
	}
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
