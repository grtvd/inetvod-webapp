/* PageHeader */

/******************************************************************************/
/******************************************************************************/

function headerCheckFields()
{
	var oMainApp = MainApp.getThe();
	var oSession = oMainApp.getSession();
	var isUserLoggedOn = oSession.isUserLoggedOn();

	var oUIObj = document.getElementById("HeaderLogon")
	setStyleDisplay(oUIObj, !isUserLoggedOn);

	oUIObj = document.getElementById("HeaderUser");
	oUIObj.innerHTML = (isUserLoggedOn && oSession.haveUserID()) ? oSession.getUserID() : "";
	setStyleDisplay(oUIObj, isUserLoggedOn);

	oUIObj = document.getElementById("HeaderRegister");
	setStyleDisplay(oUIObj, !isUserLoggedOn);

	oUIObj = document.getElementById("HeaderLogout");
	setStyleDisplay(oUIObj, isUserLoggedOn);
}

/******************************************************************************/

function headerLogout()
{
	var oMainApp = MainApp.getThe();
	var oSession = oMainApp.getSession();
	oSession.logoffDataSettings();
	oMainApp.reset();

	document.location = "../index.jsp";
}

/******************************************************************************/
/******************************************************************************/
