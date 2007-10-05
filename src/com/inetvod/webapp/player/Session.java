/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.inetvod.common.core.Logger;
import com.inetvod.common.core.StrUtil;
import com.inetvod.common.data.CategoryID;
import com.inetvod.common.data.ShowID;
import com.inetvod.playerClient.PlayerRequestor;
import com.inetvod.playerClient.request.SignonResp;
import com.inetvod.playerClient.request.StatusCode;
import com.inetvod.playerClient.rqdata.ShowDetail;
import com.inetvod.playerClient.rqdata.ShowSearchList;

public class Session
{
	/* Constants */
	public static final String fNetworkURL  = "http://" + "localhost" + "/inetvod/playerapi/xml"; //TODO host
	private static final String UserIDCookie = "user";
	private static final String UserPasswordCookie = "password";
	private static final String RememberPasswordCookie = "remember";
	private static final String SessionDataCookie = "sess";
	private static final int TenYearsSecs = 315360000;
	private static final String CookieEncoding = "UTF-8";

	/* Fields */
	HttpServletRequest fRequest;
	HttpServletResponse fResponse;

	private String fUserID;
	private String fUserPassword;
	private boolean fRememberPassword;
	private String fSessionData;
	HashMap<String, String> fCookieMap;
	private Map<String, String[]> fParameterMap;

	private boolean fHasError;
	private String fMessage;

	/* Getters and Setters */
	public Map<String, String[]> getParameterMap() { return fParameterMap; }

	public boolean hasError() { return fHasError; }
	public void setError(String message)
	{
		fHasError = true;
		fMessage = StrUtil.hasLen(message) ? message : "An unknown error has occurred. Please try again. If the problem persists, please contact customer service.";
	}

	public boolean hasMessage() { return StrUtil.hasLen(fMessage); }
	public String getMessage() { return fMessage; }
	public void setMessage(String message) { fMessage = message; }

	/* Construction */

	/* Implementation */
	public void load(HttpServletRequest request, HttpServletResponse response)
	{
		try
		{
			fRequest = request;
			fResponse = response;
			parseCookies();
			parseParameters();

			if(!pingServer())
				return;
			loadDataSettings();
			checkSignon();
		}
		catch(UnsupportedEncodingException e)
		{
			Logger.logWarn(this, "load", e);
			setError(null);
		}
	}

	private void parseCookies() throws UnsupportedEncodingException
	{
		HashMap<String, String> cookieMap = new HashMap<String, String>();

		Cookie[] cookies = fRequest.getCookies();
		if(cookies != null)
			for(Cookie cookie : cookies)
				if(StrUtil.hasLen(cookie.getValue()))
					cookieMap.put(cookie.getName(), URLDecoder.decode(cookie.getValue(), CookieEncoding));

		fCookieMap = cookieMap;
	}

	private void saveCookie(String name, String value, boolean sessionOnly, Integer expireSecs, String path,
		String domain, boolean secure) throws UnsupportedEncodingException
	{
		Cookie cookie = new Cookie(name, URLEncoder.encode(value, CookieEncoding));

		if(!sessionOnly)
			cookie.setMaxAge((expireSecs == null) ? TenYearsSecs : expireSecs);
		if(StrUtil.hasLen(path))
			cookie.setPath(path);
		if(StrUtil.hasLen(domain))
			cookie.setDomain(domain);
		cookie.setSecure(secure);

		fResponse.addCookie(cookie);
	}

	private void saveCookie(String name, String value, boolean sessionOnly) throws UnsupportedEncodingException
	{
		saveCookie(name, value, sessionOnly, null, null, null, false);
	}

	private void parseParameters()
	{
		//noinspection unchecked
		fParameterMap = fRequest.getParameterMap();
	}

	private void loadDataSettings()
	{
		fUserID = fCookieMap.get(UserIDCookie);
		fUserPassword = fCookieMap.get(UserPasswordCookie);
		fRememberPassword = "true".equals(fCookieMap.get(RememberPasswordCookie));
		fSessionData = fCookieMap.get(SessionDataCookie);

		if(!StrUtil.hasLen(fUserPassword))
			fRememberPassword = false;

		//TODO return StrUtil.hasLen(fUserID);
	}

	private boolean checkSignon() throws UnsupportedEncodingException
	{
		if(StrUtil.hasLen(fSessionData))
			return true;

		//TODO change to Guest account
		if (!StrUtil.hasLen(fUserID))
		{
			fUserID = "100000000";
			fUserPassword = "123456";
		}

		if(signon(fUserID, fUserPassword))
		{
			saveCookie(SessionDataCookie, fSessionData, true);
			return true;
		}

		return false;
	}

	private PlayerRequestor getPlayerRequestor()
	{
		return PlayerRequestor.newInstance(fNetworkURL, fSessionData);
	}

	private void showRequestError(String message)
	{
		if(!StrUtil.hasLen(message))
			setError("An error occurred trying to communicate with the iNetVOD servers. Please try again.");
		else
			setError(message);
	}

	private boolean pingServer()
	{
		PlayerRequestor playerRequestor = getPlayerRequestor();

		playerRequestor.pingServer();
		if(StatusCode.sc_Success.equals(playerRequestor.getStatusCode()))
		{
			//TODO this.CanPingServer = true;
			return true;
		}

		showRequestError(playerRequestor.getStatusMessage());
		return false;
	}

	private boolean signon(String userID, String userPassword)
	{
		PlayerRequestor playerRequestor = getPlayerRequestor();

		SignonResp signonResp = playerRequestor.signon(userID, userPassword);
		if(StatusCode.sc_Success.equals(playerRequestor.getStatusCode()))
		{
			fSessionData = signonResp.getSessionData();
			//TODO
			//this.fSessionExpires = signonResp.SessionExpires;
			//this.fMemberPrefs = signonResp.MemberState.MemberPrefs;
			//this.IncludeAdult = this.fMemberPrefs.IncludeAdult;
			//this.CanAccessAdult = (this.IncludeAdult == ina_Always);
			//this.fMemberProviderList = signonResp.MemberState.MemberProviderList;
			//
			//this.fIsUserLoggedOn = true;
			return true;
		}
		else if(StatusCode.sc_InvalidUserIDPassword.equals(playerRequestor.getStatusCode()))
			this.fUserPassword = null;

		showRequestError(playerRequestor.getStatusMessage());
		return false;
	}

	public ShowSearchList showSearch(CategoryID categoryID)
	{
		PlayerRequestor playerRequestor = getPlayerRequestor();

		ShowSearchList showSearchList = playerRequestor.showSearch(categoryID);
		if(StatusCode.sc_Success.equals(playerRequestor.getStatusCode()))
		{
			//TODO
			//if(showSearchResp.ReachedMax)
			//	showMsg("Over " + ShowSearchRqst.MaxResults + " shows were found.  Please try narrowing your search criteria.");
			return showSearchList;
		}

		showRequestError(playerRequestor.getStatusMessage());
		return null;
	}

	public ShowDetail showDetail(ShowID showID)
	{
		return getPlayerRequestor().showDetail(showID);
	}
}
