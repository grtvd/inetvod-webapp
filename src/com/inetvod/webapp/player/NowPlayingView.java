/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import com.inetvod.playerClient.rqdata.RentedShowSearchList;

public class NowPlayingView
{
	/* Fields */
	private RentedShowSearchList fRentedShowSearchList;

	/* Getters and Setters */
	public RentedShowSearchList getRentedShowSearchList() { return fRentedShowSearchList; }

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		fRentedShowSearchList = session.rentedShowList();
		if(!session.hasError() && (fRentedShowSearchList != null) && (fRentedShowSearchList.size() == 0))
			session.setMessage("Your Now Playing list is empty. Shows that you rent will be listed here.<br>\n"
				+ "<br>\n"
				+ "It is a good idea to rent multiple shows at a time. This will allow new shows to\n"
				+ "be downloaded while your are watching another show.");
	}

	/* Implementation */
}
