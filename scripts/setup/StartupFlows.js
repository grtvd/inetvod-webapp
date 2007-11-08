/* StartupFlows.js */

/******************************************************************************/
/******************************************************************************/

function StartupFlow()
{
	this.Data = null;
}

/******************************************************************************/

/*void*/ function StartupSearchDetail(/*ShowID*/ showID)
{
	var oMainApp = MainApp.getThe();

	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();
	oStartupFlow.Data = showID;

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.SearchDetail_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.SearchDetail_afterLoadSystemData(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.SearchDetail_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.Callback = StartupFlow.prototype.StartupSearchDetail_afterShowDetail;
		oSession.showDetail(this, this.Data);
	}
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.StartupSearchDetail_afterShowDetail = function(
	/*ShowDetail*/ showDetail, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchDetailScreen.newInstance(showDetail);
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupRentedShowDetail(/*RentedShowID*/ rentedShowID)
{
//	StartupInitialCheck("MainApp.getThe().getSession().rentedShow(StartupRentedShowDetail_afterRentedShow, '" + rentedShowID + "');");

	var oMainApp = MainApp.getThe();

	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();
	oStartupFlow.Data = rentedShowID;

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.RentedShowDetail_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.RentedShowDetail_afterLoadSystemData(null, sc_Success, null);

}

/******************************************************************************/

/*void*/ StartupFlow.prototype.RentedShowDetail_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.Callback = StartupFlow.prototype.RentedShowDetail_afterRentedShow;
		oSession.rentedShow(this, this.Data);
	}
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.RentedShowDetail_afterRentedShow = function(
	/*RentedShow*/ rentedShow, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		RentedShowDetailScreen.newInstance(rentedShow);
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/
