/**
 * Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp.player;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.inetvod.common.core.DateUtil;
import com.inetvod.common.core.Logger;
import com.inetvod.common.core.StrUtil;
import com.inetvod.common.data.CategoryID;
import com.inetvod.common.data.ManufacturerID;
import com.inetvod.common.data.ShowID;
import com.inetvod.playerClient.PlayerRequestor;
import com.inetvod.playerClient.request.SignonResp;
import com.inetvod.playerClient.request.StatusCode;
import com.inetvod.playerClient.rqdata.Player;
import com.inetvod.playerClient.rqdata.RentedShowSearchList;
import com.inetvod.playerClient.rqdata.ShowDetail;
import com.inetvod.playerClient.rqdata.ShowSearchList;

public class Session
{
	/* Constants */
	public static final String fNetworkURL  = "http://localhost/inetvod/playerapi/xml"; //TODO host?
	private static final String UserIDCookie = "user";
	private static final String UserPasswordCookie = "password";
	private static final String RememberPasswordCookie = "remember";
	private static final String GuestDataCookie = "guest";
	private static final String SessionDataCookie = "sess";
	private static final String SessionExpiresDataCookie = "sessexp";
	private static final int TenYearsSecs = 315360000;
	private static final String CookieEncoding = "UTF-8";
	private static final String GuestUserID = "guest";

	/* Fields */
	HttpServletRequest fRequest;
	HttpServletResponse fResponse;

	private String fUserID;
	private String fUserPassword;
	private boolean fRememberPassword;
	private boolean fGuestAccess;
	private String fSessionData;
	private Date fSessionExpires;
	HashMap<String, String> fCookieMap;
	private Map<String, String[]> fParameterMap;

	private boolean fHasError;
	private String fMessage;

	/* Getters and Setters */
	public Map<String, String[]> getParameterMap() { return fParameterMap; }
	public String getParameter(String name)
	{
		String[] values = fParameterMap.get(name);
		if((values == null) || (values.length < 1) || !StrUtil.hasLen(values[0]))
			return null;
		return values[0];
	}

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
		catch(Exception e)
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
		Cookie cookie = new Cookie(name, StrUtil.hasLen(value) ? URLEncoder.encode(value, CookieEncoding) : null);

		if(!sessionOnly)
			cookie.setMaxAge((expireSecs == null) ? TenYearsSecs : expireSecs);
		cookie.setPath(StrUtil.hasLen(path) ? path : "/");
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

	private void loadDataSettings() throws ParseException
	{
		fUserID = fCookieMap.get(UserIDCookie);
		fUserPassword = fCookieMap.get(UserPasswordCookie);
		fRememberPassword = "true".equals(fCookieMap.get(RememberPasswordCookie));

		if(!StrUtil.hasLen(fUserPassword))
			fRememberPassword = false;

		fGuestAccess = "true".equals(fCookieMap.get(GuestDataCookie));

		fSessionData = null;
		fSessionExpires = null;
		String expiresStr = fCookieMap.get(SessionExpiresDataCookie);
		if(StrUtil.hasLen(expiresStr))
		{
			Date expiresAt = DateUtil.convertFromISO8601(expiresStr);
			if((expiresAt != null) && ((new Date()).getTime() < expiresAt.getTime()))
			{
				fSessionData = fCookieMap.get(SessionDataCookie);
				fSessionExpires = expiresAt;
			}
		}

		//TODO return StrUtil.hasLen(fUserID);
	}

	private void saveDataSettings(boolean guestAccess) throws UnsupportedEncodingException
	{
		//deleteCookie("user");
		//deleteCookie("password");
		//deleteCookie("remember");

		//saveCookie(UserIDCookie, this.fUserID, false);
		//saveCookie(UserPasswordCookie, this.fUserPassword, !this.fRememberPassword);
		//saveCookie(RememberPasswordCookie, this.fRememberPassword ? "true" : "false", true);

		//deleteCookie("guest");
		fGuestAccess = guestAccess;
		saveCookie(GuestDataCookie, fGuestAccess ? "true" : "false", true);

		//deleteCookie("sess");
		//deleteCookie("sessexp");
		saveCookie(SessionDataCookie, fSessionData, true);
		saveCookie(SessionExpiresDataCookie, DateUtil.convertToISO8601(fSessionExpires), true);
	}

	private boolean checkSignon() throws UnsupportedEncodingException
	{
		if(StrUtil.hasLen(fSessionData))
			return true;

		if(StrUtil.hasLen(fUserID) && StrUtil.hasLen(fUserPassword))
		{
			if(signon(fUserID, fUserPassword))
			{
				saveDataSettings(false);
				return true;
			}
		}

		if(signon(GuestUserID, null))
		{
			saveDataSettings(true);
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

		if(playerRequestor.pingServer())
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

		Player player = Player.newInstance(new ManufacturerID("inetvod"), "webapp", "1", "1.0.0000");
		SignonResp signonResp = playerRequestor.signon(userID, userPassword, player);
		if(StatusCode.sc_Success.equals(playerRequestor.getStatusCode()))
		{
			fSessionData = signonResp.getSessionData();
			fSessionExpires = signonResp.getSessionExpires();
			//TODO
			//this.fMemberPrefs = signonResp.MemberState.MemberPrefs;
			//this.IncludeAdult = this.fMemberPrefs.IncludeAdult;
			//this.CanAccessAdult = (this.IncludeAdult == ina_Always);
			//this.fMemberProviderList = signonResp.MemberState.MemberProviderList;
			//
			//this.fIsUserLoggedOn = true;
			return true;
		}
		else if(StatusCode.sc_InvalidUserIDPassword.equals(playerRequestor.getStatusCode()))
			fUserPassword = null;

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

	public RentedShowSearchList rentedShowList()
	{
		PlayerRequestor playerRequestor = getPlayerRequestor();

		RentedShowSearchList rentedShowSearchList = playerRequestor.rentedShowList();
		if(rentedShowSearchList != null)
		{
			return rentedShowSearchList;
		}

		showRequestError(playerRequestor.getStatusMessage());
		return null;
	}
}