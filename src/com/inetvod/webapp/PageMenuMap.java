/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;

import java.util.HashMap;

import com.inetvod.common.core.StrUtil;
import com.inetvod.common.core.Logger;

public class PageMenuMap
{
	/* Fields */
	private static HashMap<String, String> fPageMenuMap;
	private static String fDefaultMenu = "NowPlaying";

	static
	{
		fPageMenuMap = new HashMap<String,String>();
		fPageMenuMap.put("/player/nowPlaying.jsp", "NowPlaying");
		fPageMenuMap.put("/player/searchResults.jsp", "Featured");
		fPageMenuMap.put("/player/categorySearch.jsp", "SearchByCategory");
		fPageMenuMap.put("/player/providerSearch.jsp", "SearchByProvider");
		fPageMenuMap.put("/player/search.jsp", "SearchByName");
		fPageMenuMap.put("/player/preferences.jsp", "Preferences");
	}

	/* Implementation */
	public static String mapMenuFromPage(String page)
	{
		String menu = fPageMenuMap.get(page);
		if(StrUtil.hasLen(menu))
			return menu;
		Logger.logErr(PageMenuMap.class, "mapMenuFromPage", String.format("Unknown page(%s)", page));
		return fDefaultMenu;
	}
}
