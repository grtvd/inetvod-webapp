/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

public class ProviderSearchView
{
	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		if(!session.isSystemDataLoaded())
			session.loadSystemData();
	}

	/* Implementation */
}
