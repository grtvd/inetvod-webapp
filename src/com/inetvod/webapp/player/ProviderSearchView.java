/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import javax.servlet.http.HttpServletRequest;

public class ProviderSearchView
{
	/* Constants */
	private static final String PAGE = "/player/providerSearch.jsp";

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		if(!session.isSystemDataLoaded())
			session.loadSystemData();
	}

	/* Implementation */
	public static String buildPath(HttpServletRequest httpServletRequest)
	{
		if (httpServletRequest != null)
			return httpServletRequest.getContextPath() + buildPath();
		return buildPath();
	}

	public static String buildPath()
	{
		return PAGE;
	}
}
