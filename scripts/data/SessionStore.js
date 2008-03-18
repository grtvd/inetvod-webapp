/* SessionStore */

/******************************************************************************/
/******************************************************************************/

SessionStore.ContainerFieldName = "SessionStore";

/******************************************************************************/

function SessionStore(reader)
{
	this.GuestAccess = true;
	this.SessionData = null;
	this.SessionExpires = null;

	this.MemberPrefs = null;
	this.MemberProviderList = null;

	this.CanAccessAdult = false;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*SessionStore*/ SessionStore.newInstanceFromXmlString = function(/*string*/ sessionStr)
{
	if(!testStrHasLen(sessionStr))
		return null;

	var dataReader = new XmlDataReader(createXmlDocument(sessionStr));
	return dataReader.readObject(SessionStore.ContainerFieldName, SessionStore);
}

/******************************************************************************/

/*string*/ SessionStore.toXmlString = function(/*SessionStore*/ sessionStore)
{
	if(sessionStore == null)
		return null;

	var dataWriter = new XmlDataWriter();
	dataWriter.writeObject(SessionStore.ContainerFieldName, sessionStore);
	return dataWriter.toString();
}

/******************************************************************************/

/*void*/ SessionStore.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.GuestAccess = reader.readBoolean("GuestAccess");
	this.SessionData = reader.readString("SessionData", SignonResp.SessionDataMaxLength);
	this.SessionExpires = reader.readDateTime("SessionExpires");
	this.MemberPrefs = reader.readObject("MemberPrefs", MemberPrefs);
	this.MemberProviderList = reader.readList("MemberProvider", MemberProvider);

	this.CanAccessAdult = reader.readBoolean("CanAccessAdult");
}

/******************************************************************************/

/*void*/ SessionStore.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeBoolean("GuestAccess", this.GuestAccess);
	writer.writeString("SessionData", this.SessionData, SignonResp.SessionDataMaxLength);
	writer.writeDateTime("SessionExpires", this.SessionExpires);
	writer.writeObject("MemberPrefs", this.MemberPrefs);
	writer.writeList("MemberProvider", this.MemberProviderList);

	writer.writeBoolean("CanAccessAdult", this.CanAccessAdult);
}

/******************************************************************************/
/******************************************************************************/
