/* StartupFlows.js */

/******************************************************************************/
/******************************************************************************/

function StartupInitialCheck(/*string*/ startScreen)
{
	var oMainApp = MainApp.getThe();
	var oSession = oMainApp.getSession();

	oMainApp.reset();
	oMainApp.openPopup();
	oMainApp.setStartScreen(startScreen);

	/* connect to the server */
	if(!oSession.CanPingServer)
	{
		oSession.pingServer(StartupInitial_afterPingServer);
	}
	else
		StartupInitial_afterPingServer(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ function StartupInitial_afterPingServer(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	if(statusCode != sc_Success)
	{
		MainApp.getThe().closePopup();
		return;
	}

	var oSession = MainApp.getThe().getSession();

	if(!oSession.loadDataSettings())
	{
		SetupScreen.newInstance();
		return;
	}

	if(oSession.haveSessionData())
	{
		oSession.loadSystemData(StartupInitial_afterLoadSystemData);
		return;
	}

	if(!oSession.haveUserPassword())
	{
		AskPINScreen.newInstance();
		return;
	}

	oSession.signon(StartupInitial_afterSignon);
}

/******************************************************************************/

/*void*/ function StartupInitial_afterSignon(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		oSession.saveDataSettings();

		oSession.loadSystemData(StartupInitial_afterLoadSystemData);
	}
	else if(statusCode == sc_InvalidUserIDPassword)
	{
		AskPINScreen.newInstance();
	}
}

/******************************************************************************/

/*void*/ function StartupInitial_afterLoadSystemData(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		MainApp.getThe().openStartScreen();
	}
	else
	{
		oSession.clearLogonInfo();
		MainApp.getThe().closePopup();
	}
}

/******************************************************************************/
/******************************************************************************/

/*void*/ function StartupSearchDetail(/*ShowID*/ showID)
{
	StartupInitialCheck("MainApp.getThe().getSession().showDetail(StartupSearchDetail_afterShowDetail, '" + showID + "');");
}

/******************************************************************************/

/*void*/ function StartupSearchDetail_afterShowDetail(/*ShowDetail*/ showDetail,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
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
	StartupInitialCheck("MainApp.getThe().getSession().rentedShow(StartupRentedShowDetail_afterRentedShow, '" + rentedShowID + "');");
}

/******************************************************************************/

/*void*/ function StartupRentedShowDetail_afterRentedShow(/*RentedShow*/ rentedShow,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		RentedShowDetailScreen.newInstance(rentedShow);
	else
		MainApp.getThe().closePopup();
}

/******************************************************************************/
/******************************************************************************/
