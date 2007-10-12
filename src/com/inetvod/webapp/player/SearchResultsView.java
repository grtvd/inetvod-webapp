/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import com.inetvod.common.data.CategoryID;
import com.inetvod.playerClient.rqdata.ShowSearchList;

public class SearchResultsView
{
	/* Constants */
	public static final String CATEGORYID_PARAM = "categoryid";

	/* Fields */
	private ShowSearchList fShowSearchList;

	/* Getters and Setters */
	public ShowSearchList getShowSearchList() { return fShowSearchList; }

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		String value = session.getParameter(CATEGORYID_PARAM);
		if(value == null)
		{
			session.setError(null);
			return;
		}

		fShowSearchList = session.showSearch(new CategoryID(value));
		if(!session.hasError() && (fShowSearchList != null) && (fShowSearchList.size() == 0))
			session.setMessage("No shows were found matching your search criteria.  Please try again.");
	}

	/* Implementation */
}
