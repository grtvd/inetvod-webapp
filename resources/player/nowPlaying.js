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

/*void*/ function InitNowPlaying(/*XML String*/ xmlData)
{
	gNowPlayingViewData = NowPlayingViewData.newInstanceFromXmlString(xmlData);
	if (gNowPlayingViewData && gNowPlayingViewData.RentedShowSearchList)
		NowPlayingScreen.newInstance(gNowPlayingViewData.RentedShowSearchList);
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
