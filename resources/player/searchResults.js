/* searchResults.js */

/**********************************************************************************************************************/
/**********************************************************************************************************************/

var gSearchResultsViewData = null;

SearchResultsViewData.ContainerFieldName = "Data";

/**********************************************************************************************************************/

function SearchResultsViewData(reader)
{
	this.ShowSearchList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/**********************************************************************************************************************/

/*SearchResultsViewData*/ SearchResultsViewData.newInstanceFromXmlString = function(/*string*/ dataStr)
{
	if(!testStrHasLen(dataStr))
		return null;

	var dataReader = new XmlDataReader(createXmlDocument(dataStr));
	return dataReader.readObject(SearchResultsViewData.ContainerFieldName, SearchResultsViewData);
}

/**********************************************************************************************************************/

/*void*/ SearchResultsViewData.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowSearchList = reader.readList("ShowSearch", ShowSearch);
}

/**********************************************************************************************************************/

/*void*/ function LoadSearchResultsViewData(/*XML String*/ xmlData)
{
	gSearchResultsViewData = SearchResultsViewData.newInstanceFromXmlString(xmlData);
}

/**********************************************************************************************************************/

/*void*/ function SetSearchResultsImages()
{
	if (gSearchResultsViewData && gSearchResultsViewData.ShowSearchList)
	{
		for(var i = 0; i < gSearchResultsViewData.ShowSearchList.length; i++)
		{
			var showSearch = gSearchResultsViewData.ShowSearchList[i];
			if(testStrHasLen(showSearch.PictureURL))
			{
				var showPosObj = document.getElementById(showSearch.ShowID);
				if(showPosObj)
				{
					var showPos = showPosObj.innerHTML;
					var imageObj = document.getElementById("Search003_ShowList_" + showPos + "_Picture");
					if(imageObj)
						imageObj.src = showSearch.PictureURL;
				}
			}
		}
	}
}

/**********************************************************************************************************************/
/**********************************************************************************************************************/
