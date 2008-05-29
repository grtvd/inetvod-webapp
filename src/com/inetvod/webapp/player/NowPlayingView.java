/**
 * Copyright © 2007-2008 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import javax.servlet.http.HttpServletRequest;

import com.inetvod.playerClient.rqdata.RentedShowSearchList;
import com.inetvod.common.core.Logger;

public class NowPlayingView
{
	/* Constants */
	private static final String PAGE = "/player/nowPlaying.jsp";

	/* Fields */
	private String fNowPlayingViewDataXml;
	private RentedShowSearchList fRentedShowSearchList;

	/* Getters and Setters */
	public String getNowPlayingViewDataXml() { return fNowPlayingViewDataXml; }
	public RentedShowSearchList getRentedShowSearchList() { return fRentedShowSearchList; }

	/* Construction */
	public void load(Session session)
	{
		if(session.hasError())
			return;

		if(session.isGuestAccess())
			return;

		fRentedShowSearchList = session.rentedShowList();
		try
		{
			fNowPlayingViewDataXml = NowPlayingViewData.toXmlString(NowPlayingViewData.newInstance(
				fRentedShowSearchList));
		}
		catch(Exception e)
		{
			Logger.logWarn(this, "load", e);
			session.setError(null);
		}
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
