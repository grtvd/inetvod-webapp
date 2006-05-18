/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.inetvod.common.core.Logger;

public class ReadXMLFile
{
	public static String Country = "country.xml";
	public static String ConnectionSpeed = "connection_speed.xml";
	public static String CreditCardType = "card_type.xml";
	public static String SecretQuestion = "secret_question.xml";

	private static String RecordElementName = "Entry";
	private static String RecordTextName = "Param_Name";
	private static String RecordValue = "Param_Value";

	private static String fXmlFilePath;

	private ReadXMLFile()
	{
	}

	public static void setXmlFilePath(String xmlFilePath)
	{
		fXmlFilePath = xmlFilePath;
	}

	public static String [][] readXML(String list_Name)
	{
		String [][] arrayList = null;
		String file_Name;
		try
		{
			if(Country.equals(list_Name))
				file_Name = Country;
			else if(CreditCardType.equals(list_Name))
				file_Name = CreditCardType;
			else if(ConnectionSpeed.equals(list_Name))
				file_Name = ConnectionSpeed;
			else if(SecretQuestion.equals(list_Name))
				file_Name = SecretQuestion;
			else
				throw new Exception(String.format("Unknown list_Name(%s)", list_Name));

			DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
			Document doc = docBuilder.parse(new File(new File(fXmlFilePath), file_Name));

			NodeList listOfRecords = doc.getElementsByTagName(RecordElementName);
			int totalRecords = listOfRecords.getLength();
			arrayList = new String[totalRecords][2];

			for(int s = 0; s < listOfRecords.getLength(); s++)
			{
				Node firstRecordsNode = listOfRecords.item(s);
				if(firstRecordsNode.getNodeType() == Node.ELEMENT_NODE)
				{
					Element firstRecordsElement = (Element)firstRecordsNode;

					//-------
					NodeList firstNameList = firstRecordsElement.getElementsByTagName(RecordTextName);
					Element firstNameElement = (Element)firstNameList.item(0);

					NodeList textFNList = firstNameElement.getChildNodes();
					arrayList[s][0] = textFNList.item(0).getNodeValue().trim();

					//-------
					NodeList lastNameList = firstRecordsElement.getElementsByTagName(RecordValue);
					Element lastNameElement = (Element)lastNameList.item(0);

					NodeList textLNList = lastNameElement.getChildNodes();
					arrayList[s][1] = textLNList.item(0).getNodeValue().trim();
				}//end of if clause

			}//end of for loop with s var
		}
		catch(Exception e)
		{
			Logger.logErr(new ReadXMLFile(), "readXML", e);
		}

		return arrayList;
	}
}