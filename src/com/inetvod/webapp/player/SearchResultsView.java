/**
 * Copyright � 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import com.inetvod.common.core.StrUtil;
import com.inetvod.common.data.CategoryID;
import com.inetvod.common.data.ProviderID;
import com.inetvod.common.data.RatingID;
import com.inetvod.playerClient.rqdata.ShowSearchList;

public class SearchResultsView
{
	/* Constants */
	private static final String PAGE = "searchResults.jsp";
	private static final String SEARCH_PARAM = "search";
	private static final String PROVIDERID_PARAM = "provderid";
	private static final String CATEGORYID_PARAM = "categoryid";
	private static final String RATINGID_PARAM = "ratingid";

	/* Fields */
	private ShowSearchList fShowSearchList;

	/* Getters and Setters */
	public ShowSearchList getShowSearchList() { return fShowSearchList; }

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		String search = null;
		ProviderID providerID = null;
		CategoryID categoryID = null;
		RatingID ratingID = null;

		String param = session.getParameter(SEARCH_PARAM);
		if(StrUtil.hasLen(param))
			search = param;
		param = session.getParameter(PROVIDERID_PARAM);
		if(StrUtil.hasLen(param))
			providerID = new ProviderID(param);
		param = session.getParameter(CATEGORYID_PARAM);
		if(StrUtil.hasLen(param))
			categoryID = new CategoryID(param);
		param = session.getParameter(RATINGID_PARAM);
		if(StrUtil.hasLen(param))
			ratingID = new RatingID(param);

		if(!StrUtil.hasLen(search) && (providerID == null) && (categoryID == null) && (ratingID == null))
		{
			session.setError(null);
			return;
		}

		fShowSearchList = session.showSearch(search, providerID, categoryID, ratingID);
		if(!session.hasError() && (fShowSearchList != null) && (fShowSearchList.size() == 0))
			session.setMessage("No shows were found matching your search criteria.  Please try again.");
	}

	/* Implementation */
	public static String buildPath(ProviderID providerID, CategoryID categoryID)
	{
		if((providerID == null) && (categoryID == null))
			return PAGE;

		StringBuilder sb = new StringBuilder();
		if(providerID != null)
		{
			sb.append(PROVIDERID_PARAM);
			sb.append("=");
			sb.append(providerID);
		}

		if(categoryID != null)
		{
			if(sb.length() > 0)
				sb.append("&");
			sb.append(CATEGORYID_PARAM);
			sb.append("=");
			sb.append(categoryID);
		}

		return String.format("%s?%s", PAGE, sb.toString());
	}
}
