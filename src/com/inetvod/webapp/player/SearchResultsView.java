/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import com.inetvod.common.core.StrUtil;
import com.inetvod.common.data.CategoryID;
import com.inetvod.playerClient.rqdata.ShowSearchList;

public class SearchResultsView
{
	/* Constants */
	public static final String CATEGORYID_PARAM = "categoryid";

	/* Fields */
	private ShowSearchList fShowSearchList;

	/* Getters and Setters */

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		String[] values = session.getParameterMap().get(CATEGORYID_PARAM);
		if((values == null) || (values.length < 1) || !StrUtil.hasLen(values[0]))
		{
			session.setError(null);
			return;
		}

		fShowSearchList = session.showSearch(new CategoryID(values[0]));
		if(!session.hasError() && (fShowSearchList != null) && (fShowSearchList.size() == 0))
			session.setMessage("No shows were found matching your search criteria.  Please try again.");
	}

	/* Implementation */
	public ShowSearchList getShowSearchList()
	{
		return fShowSearchList;
	}
}
