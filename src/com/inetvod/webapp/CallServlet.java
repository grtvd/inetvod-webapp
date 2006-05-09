/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * Confidential and Proprietary
 * See Legal.txt for additional notices.
 */

/*
 * Class		:		CallServlet
 * Purpose		:		Call servlet to fetch values from web.xml
 */

package com.inetvod.webapp;

import java.net.URL;
import java.net.URLConnection;
import java.io.ObjectInputStream;

public class CallServlet
{
	/*******************************************************************************************************/
	//this method is used call the servlet and fetch the connection file path from web.xml
	/*-----------------------------------------------------------------------------------------------------*/
	public static String openServlet_And_Return_Cnn_String(String param, String servlet_url)
	{
		String str = "";
		try
		{
			String urlpath = servlet_url + "/servlet/InetVodServlet?query=" + param;
			//System.out.println("CallServlet servlet_path = " + urlpath);
			URL url1 = new URL(urlpath);
			URLConnection urlconnection = url1.openConnection();
	
			urlconnection.setUseCaches(false);
			urlconnection.setDoOutput(true);

			ObjectInputStream objectinputstream = new ObjectInputStream(urlconnection.getInputStream());
			str =(String)objectinputstream.readObject();
			//System.out.println(param + " = " + str);
			objectinputstream.close();
		}
		catch(Exception e)
		{
			System.out.println("CallServlet.openServlet_And_Return_Cnn_String....." + e.toString());
		}

		return str;
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//this method is used call the servlet and fetch the connection file path from web.xml
	/*******************************************************************************************************/
}