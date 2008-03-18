/**
 * Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import java.io.ByteArrayInputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Constructor;
import java.util.Date;

import com.inetvod.common.core.DataReader;
import com.inetvod.common.core.DataWriter;
import com.inetvod.common.core.Readable;
import com.inetvod.common.core.StrUtil;
import com.inetvod.common.core.Writeable;
import com.inetvod.common.core.XmlDataReader;
import com.inetvod.common.core.XmlDataWriter;
import com.inetvod.playerClient.request.SignonResp;
import com.inetvod.playerClient.rqdata.MemberPrefs;
import com.inetvod.playerClient.rqdata.MemberProvider;
import com.inetvod.playerClient.rqdata.MemberProviderList;

public class SessionStore implements Readable, Writeable
{
	/* Constants */
	public static Constructor<SessionStore> CtorDataReader = DataReader.getCtor(SessionStore.class);
	private static final String ContainerFieldName = "SessionStore";

	/* Fields */
	private boolean fGuestAccess;
	private String fSessionData;
	private Date fSessionExpires;

	private MemberPrefs fMemberPrefs;
	private MemberProviderList fMemberProviderList;

	private boolean fCanAccessAdult;

	/* Getters and Setters */
	public boolean getGuestAccess() { return fGuestAccess; }
	public void setGuestAccess(boolean guestAccess) { fGuestAccess = guestAccess; }

	public String getSessionData() { return fSessionData; }
	public void setSessionData(String sessionData) { fSessionData = sessionData; }

	public Date getSessionExpires() { return fSessionExpires; }
	public void setSessionExpires(Date sessionExpires) { fSessionExpires = sessionExpires; }

	public MemberPrefs getMemberPrefs() { return fMemberPrefs; }
	public void setMemberPrefs(MemberPrefs memberPrefs) { fMemberPrefs = memberPrefs; }

	public MemberProviderList getMemberProviderList() { return fMemberProviderList; }
	public void setMemberProviderList(MemberProviderList memberProviderList) { fMemberProviderList = memberProviderList; }

	public boolean getCanAccessAdult() { return fCanAccessAdult; }
	public void setCanAccessAdult(boolean canAccessAdult) { fCanAccessAdult = canAccessAdult; }

	/* Construction */
	private SessionStore()
	{
	}

	public SessionStore(DataReader reader) throws Exception
	{
		readFrom(reader);
	}

	public static SessionStore newInstance()
	{
		return new SessionStore();
	}

	public static SessionStore newInstanceFromXmlString(String xmlString) throws Exception
	{
		if(!StrUtil.hasLen(xmlString))
			return new SessionStore();

		byte[] xmlBytes = xmlString.getBytes("UTF-8");
		ByteArrayInputStream inputStream = new ByteArrayInputStream(xmlBytes);
		XmlDataReader reader = new XmlDataReader(inputStream);
		return reader.readObject(ContainerFieldName, CtorDataReader);
	}

	public static String toXmlString(SessionStore sessionStore) throws Exception
	{
		if(sessionStore == null)
			return null;

		StringWriter stringWriter = new StringWriter();
		new XmlDataWriter(new PrintWriter(stringWriter), "UTF-8").writeObject(ContainerFieldName, sessionStore);
		return stringWriter.toString();
	}

	/* Implementation */
	public void readFrom(DataReader reader) throws Exception
	{
		fGuestAccess = reader.readBoolean("GuestAccess");
		fSessionData = reader.readString("SessionData", SignonResp.SessionDataMaxLength);
		fSessionExpires = reader.readDateTime("SessionExpires");
		fMemberPrefs = reader.readObject("MemberPrefs", MemberPrefs.CtorDataReader);
		fMemberProviderList = reader.readList("MemberProvider", MemberProviderList.Ctor, MemberProvider.CtorDataReader);
		fCanAccessAdult = reader.readBoolean("CanAccessAdult");
	}

	public void writeTo(DataWriter writer) throws Exception
	{
		writer.writeBoolean("GuestAccess", fGuestAccess);
		writer.writeString("SessionData", fSessionData, SignonResp.SessionDataMaxLength);
		writer.writeDateTime("SessionExpires", fSessionExpires);
		writer.writeObject("MemberPrefs", fMemberPrefs);
		writer.writeList("MemberProvider", fMemberProviderList);
		writer.writeBoolean("CanAccessAdult", fCanAccessAdult);
	}
}
