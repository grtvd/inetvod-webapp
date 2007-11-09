/**
 * Copyright � 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

public class CategorySearchView
{
	/* Constants */
	private static final String PAGE = "categorySearch.jsp";

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		if(!session.isSystemDataLoaded())
			session.loadSystemData();
	}

	/* Implementation */
	public static String buildPath()
	{
		return PAGE;
	}
}
