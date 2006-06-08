/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;

import java.io.File;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.inetvod.common.core.Logger;
import com.inetvod.common.cryto.CryptoKeyStore;
import com.inetvod.common.dbdata.Category;
import com.inetvod.common.dbdata.DatabaseAdaptor;
import com.inetvod.common.dbdata.Member;
import com.inetvod.common.dbdata.MemberAccount;
import com.inetvod.common.dbdata.MemberLogon;
import com.inetvod.common.dbdata.MemberPrefs;
import com.inetvod.common.dbdata.MemberProvider;
import com.inetvod.common.dbdata.MemberSession;
import com.inetvod.common.dbdata.Provider;
import com.inetvod.common.dbdata.ProviderConnection;
import com.inetvod.common.dbdata.Rating;
import com.inetvod.common.dbdata.RentedShow;
import com.inetvod.common.dbdata.Show;
import com.inetvod.common.dbdata.ShowCategory;
import com.inetvod.common.dbdata.ShowProvider;

public class WebAppServlet extends HttpServlet
{
	public void init() throws ServletException
	{
		try
		{
			String confDir = getServletContext().getRealPath("/META-INF");

			// set the XML reader
			ReadXMLFile.setXmlFilePath(confDir);

			// set the log file
			Logger.initialize((new File(new File(confDir), "log4j.xml")).getAbsolutePath(),
				getServletContext().getInitParameter("logdir"));

			// setup db connection
			DatabaseAdaptor.setDBConnectFile(getServletContext().getInitParameter("dbconnect"));

			// init the CrytoKeyStore
			CryptoKeyStore.load(getServletContext().getInitParameter("cryptokeystore"));

			// prime UUID, first hit is big
			UUID.randomUUID();
		}
		catch(Exception e)
		{
			throw new ServletException(e.getMessage(), e);
		}

		// Preload DatabaseAdaptors
		Provider.getDatabaseAdaptor();
		ProviderConnection.getDatabaseAdaptor();
		Category.getDatabaseAdaptor();
		Rating.getDatabaseAdaptor();
		Member.getDatabaseAdaptor();
		MemberLogon.getDatabaseAdaptor();
		MemberAccount.getDatabaseAdaptor();
		MemberPrefs.getDatabaseAdaptor();
		MemberSession.getDatabaseAdaptor();
		MemberProvider.getDatabaseAdaptor();
		Show.getDatabaseAdaptor();
		ShowProvider.getDatabaseAdaptor();
		ShowCategory.getDatabaseAdaptor();
		RentedShow.getDatabaseAdaptor();
	}
}
