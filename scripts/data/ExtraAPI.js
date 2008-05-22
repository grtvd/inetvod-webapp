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

/*string*/ ExtraAPI.prototype.addContent = function(/*string*/ url, /*object*/ callbackObj)
{
	var session = MainApp.getThe().getSession();
	var httpRequestor = HTTPRequestor.newInstance();

	httpRequestor.sendRequestAsync(session.getExtraAPIURL() + "/ac", url, callbackObj);
}

/******************************************************************************/

/*string*/ ExtraAPI.prototype.sendFeedback = function(/*string*/ subject, /*string*/ body,
	/*object*/ callbackObj)
{
	var session = MainApp.getThe().getSession();
	var httpRequestor = HTTPRequestor.newInstance();

	var feedbackData = new FeedbackData();
	feedbackData.MemberUserID = session.getUserID();
	feedbackData.Subject = subject;
	feedbackData.Body = body;

	var dataWriter = new XmlDataWriter();
	dataWriter.writeObject(FeedbackData.Name, feedbackData);

	httpRequestor.sendRequestAsync(session.getExtraAPIURL() + "/fb", dataWriter.toString(), callbackObj);
}

/******************************************************************************/
/******************************************************************************/

FeedbackData.Name = "feedbackdata";
FeedbackData.MemberUserIDMaxLength = 64;
FeedbackData.SubjectMaxLength = 128;
FeedbackData.BodyMaxLength = 8192;

/******************************************************************************/

function FeedbackData()
{
	this.MemberUserID = null;
	this.Subject = null;
	this.Body = null;
}

/******************************************************************************/

/*void*/ FeedbackData.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("memberuserid", this.MemberUserID, FeedbackData.MemberUserIDMaxLength);
	writer.writeString("subject", this.Subject, FeedbackData.SubjectMaxLength);
	writer.writeString("body", this.Body, FeedbackData.BodyMaxLength);
}

/******************************************************************************/
/******************************************************************************/
