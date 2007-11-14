/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import com.inetvod.playerClient.rqdata.RentedShowSearchList;

public class NowPlayingView
{
	/* Constants */
	private static final String PAGE = "nowPlaying.jsp";

	/* Fields */
	private RentedShowSearchList fRentedShowSearchList;

	/* Getters and Setters */
	public RentedShowSearchList getRentedShowSearchList() { return fRentedShowSearchList; }

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		if(session.isGuestAccess())
			return;

		fRentedShowSearchList = session.rentedShowList();
	}

	/* Implementation */
	public static String buildPath()
	{
		return PAGE;
	}
}
