/* ExtraAPI.js */

/******************************************************************************/
/******************************************************************************/

ExtraAPI.SUCCESS_RESULT = "OK";
ExtraAPI.FAILED_RESULT = "FAIL";

ExtraAPI.ADD_CONTENT_DUPLICATE_RESULT = "DUP";

/******************************************************************************/

ExtraAPI.newInstance = function()
{
	return new ExtraAPI();
}

/******************************************************************************/

function ExtraAPI()
{
}

/******************************************************************************/

/*string*/ ExtraAPI.prototype.addContent = function(/*string*/ url)
{
	var session = MainApp.getThe().getSession();
	var httpRequestor = HTTPRequestor.newInstance();

	return httpRequestor.sendRequest(session.getExtraAPIURL() + "/ac", url);
}

/******************************************************************************/
/******************************************************************************/
