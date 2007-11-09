/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;

import java.util.HashMap;

import com.inetvod.common.core.StrUtil;

public class PageMenuMap
{
	/* Fields */
	private static HashMap<String, String> fPageMenuMap;

	static
	{
		fPageMenuMap = new HashMap<String,String>();
		fPageMenuMap.put("/player/nowPlaying.jsp", "NowPlaying");
		fPageMenuMap.put("/player/searchResults.jsp?categoryid=featured", "Featured");
		fPageMenuMap.put("/player/categorySearch.jsp", "SearchByCategory");
		fPageMenuMap.put("/player/providerSearch.jsp", "SearchByProvider");
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
