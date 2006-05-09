/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * Confidential and Proprietary
 * See Legal.txt for additional notices.
 */

/*
 * Class		:		InetVodServlet
 * Purpose		:		Servlet to fetch the value from web.xml and initiate logger
 */

package com.inetvod.webapp;

import java.io.File;
import java.io.IOException;
import java.io.ObjectOutputStream;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.xml.DOMConfigurator;
import com.inetvod.common.dbdata.*;

public class InetVodServlet extends HttpServlet{

	String str = null;

	//this method is used when servlet first time loaded & initialize config object
	public void init(ServletConfig config) throws ServletException 
	//public void init() throws ServletException 
	{
		super.init(config);
		//System.out.println("------------------------------------------------");
		//System.out.println("------------------------ " + getServletContext().getRealPath("/"));
		try
		{
			ReadXMLFile.setXmlFilePath(getServletContext().getRealPath("/"));
			String realPath = config.getServletContext().getRealPath("/log4j.xml");
			File log4jFile = new File(realPath);
	
			//System.out.println("InetVodServlet realPath = " + log4jFile);
			DOMConfigurator.configure(log4jFile.toURL());

			str = config.getInitParameter("dbconnect");
			DatabaseAdaptor.setDBConnectFile(str);
			//System.out.println("------------------------------------------------");
		}
		catch (Exception e){
			System.out.println("init -- " + e );
		}
	}

	public void doGet(HttpServletRequest req, HttpServletResponse res)	throws  ServletException 
	{

	}

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws  ServletException 
	{

	}
}
