/**
 * Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import java.io.PrintWriter;
import java.io.StringWriter;

import com.inetvod.common.core.DataWriter;
import com.inetvod.common.core.Writeable;
import com.inetvod.common.core.XmlDataWriter;
import com.inetvod.playerClient.rqdata.RentedShowSearchList;

public class NowPlayingViewData implements Writeable
{
	/* Constants */
	private static final String ContainerFieldName = "Data";

	/* Fields */
	private RentedShowSearchList fRentedShowSearchList;

	/* Construction */
	private NowPlayingViewData(RentedShowSearchList rentedShowSearchList)
	{
		fRentedShowSearchList = rentedShowSearchList;
	}

	public static NowPlayingViewData newInstance(RentedShowSearchList rentedShowSearchList)
	{
		return new NowPlayingViewData(rentedShowSearchList);
	}

	public static String toXmlString(NowPlayingViewData data) throws Exception
	{
		if(data == null)
			return null;

		StringWriter stringWriter = new StringWriter();
		new XmlDataWriter(new PrintWriter(stringWriter), "UTF-8").writeObject(ContainerFieldName, data);
		return stringWriter.toString();
	}

	/* Implementation */
	public void writeTo(DataWriter writer) throws Exception
	{
		writer.writeList("RentedShowSearch", fRentedShowSearchList);
	}
}
