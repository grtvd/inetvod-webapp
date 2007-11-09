/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;

import java.util.HashMap;

import com.inetvod.common.core.StrUtil;
import com.inetvod.common.data.CategoryID;
import com.inetvod.webapp.player.CategorySearchView;
import com.inetvod.webapp.player.NowPlayingView;
import com.inetvod.webapp.player.ProviderSearchView;
import com.inetvod.webapp.player.SearchResultsView;

public class PageMenuMap
{
	/* Constants */
	private static final String PAGE_BASE = "/player/";

	/* Fields */
	private static HashMap<String, String> fPageMenuMap;

	static
	{
		fPageMenuMap = new HashMap<String,String>();
		fPageMenuMap.put(String.format("%s%s", PAGE_BASE, NowPlayingView.buildPath()), "NowPlaying");
		fPageMenuMap.put(String.format("%s%s", PAGE_BASE, SearchResultsView.buildPath(null, CategoryID.Featured)), "Featured");
		fPageMenuMap.put(String.format("%s%s", PAGE_BASE, CategorySearchView.buildPath()), "SearchByCategory");
		fPageMenuMap.put(String.format("%s%s", PAGE_BASE, ProviderSearchView.buildPath()), "SearchByProvider");
		fPageMenuMap.put("/player/search.jsp", "SearchByName");
		fPageMenuMap.put("/player/preferences.jsp", "Preferences");
	}

	/* Implementation */
	public static String mapMenuFromPage(String page, String query)
	{
		String url = page;
		if(StrUtil.hasLen(query))
			url = String.format("%s?%s", page, query);
		String menu = fPageMenuMap.get(url);
		if(StrUtil.hasLen(menu))
			return menu;
		return "";
	}
}
