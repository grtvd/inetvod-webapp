/* StartupFlows.js */

/******************************************************************************/
/******************************************************************************/

function StartupInitGeneral()
{
	MainApp.getThe().init();
	MainApp.getThe().getSession().loadDataSettings();
}

/******************************************************************************/

function StartupInitMember()
{
	StartupInitGeneral();
	if(!MainApp.getThe().getSession().isUserLoggedOn())
		document.location = "../member/mem_logon.jsp";
}

/******************************************************************************/

function StartupLoadSystemData()
{
	var oSession = MainApp.getThe().getSession();

	if(!oSession.isSystemDataLoaded())
		oSession.loadSystemData();
}

/******************************************************************************/
/******************************************************************************/

function StartupFlow()
{
	this.Data = null;
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupLogon()
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();
	oStartupFlow.Callback = StartupFlow.prototype.Logon_afterLogon;

	LogonScreen.newInstance(oStartupFlow);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.Logon_afterLogon = function()
{
	document.location.reload(true);
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupSearch()
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.Search_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.Search_afterLoadSystemData(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.Search_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchScreen.newInstance();
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
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

/*void*/ function StartupRentedShowDetail(/*RentedShowSearch*/ rentedShowSearch)
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();
	oStartupFlow.Data = rentedShowSearch;

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
	if(statusCode == sc_Success)
	{
		RentedShowDetailScreen.newInstance(this.Data);
	}
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupPreferences()
{
	var oMainApp = MainApp.getThe();
	oMainApp.openPopup();

	var oSession = oMainApp.getSession();
	oSession.loadDataSettings();

	var oStartupFlow = new StartupFlow();

	if(!oSession.isSystemDataLoaded())
	{
		oStartupFlow.Callback = StartupFlow.prototype.Preferences_afterLoadSystemData;
		oSession.loadSystemData(oStartupFlow);
		return;
	}

	oStartupFlow.Preferences_afterLoadSystemData(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ StartupFlow.prototype.Preferences_afterLoadSystemData = function(
	/*object*/ data, /*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		PreferencesScreen.newInstance();
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/
