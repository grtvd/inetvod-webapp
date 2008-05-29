/**
 * Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import java.io.StringWriter;
import java.io.PrintWriter;

import com.inetvod.common.core.Writeable;
import com.inetvod.common.core.XmlDataWriter;
import com.inetvod.common.core.DataWriter;
import com.inetvod.playerClient.rqdata.ShowSearchList;

public class SearchResultsViewData implements Writeable
{
	/* Constants */
	private static final String ContainerFieldName = "Data";

	/* Fields */
	private ShowSearchList fShowSearchList;

	/* Construction */
	private SearchResultsViewData(ShowSearchList showSearchList)
	{
		fShowSearchList = showSearchList;
	}

	public static SearchResultsViewData newInstance(ShowSearchList showSearchList)
	{
		return new SearchResultsViewData(showSearchList);
	}

	public static String toXmlString(SearchResultsViewData data) throws Exception
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
		writer.writeList("ShowSearch", fShowSearchList);
	}
}
