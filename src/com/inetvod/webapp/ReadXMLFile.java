/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * Confidential and Proprietary
 * See Legal.txt for additional notices.
 */

/*
 * Class		:		ReadXMLFile 
 * Purpose		:		Read xml file to populate dropdown lists in the web forms
 */
 
package com.inetvod.webapp;

import com.inetvod.common.core.Logger;

import java.io.File;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException; 

public class ReadXMLFile
{

	private static String xml_File_Path			= null;
	private static String country_File_Name		= "country.xml";
	private static String con_Speed_File_Name	= "connection_speed.xml";
	private static String card_Type_File_Name	= "card_type.xml";
	private static String secret_Quest_File_Name = "secret_question.xml";
	private static String recordElementName		= "Entry";
	private static String recordTextName		= "Param_Name";
	private static String recordValue			= "Param_Value";


	public static void setXmlFilePath(String temp_Xml_File_Path)
	{
		xml_File_Path = temp_Xml_File_Path;
	}

	/*******************************************************************************************************/
	//Method to read XML file to fill drop down list -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public static String [][] readXML (String list_Name)
	{
		String [][] arrayList = null; 
		String file_Name = null;
		try 
		{
			if (list_Name.equals("Country"))
				file_Name = country_File_Name;
			else if (list_Name.equals("Card_Type"))
					file_Name = card_Type_File_Name;	
			else if (list_Name.equals("Con_Speed"))
					file_Name = con_Speed_File_Name;	
			else if (list_Name.equals("Quest"))
					file_Name = secret_Quest_File_Name;	

            DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
//            Document doc = docBuilder.parse (new File(CallServlet.openServlet_And_Return_Cnn_String(filePathParam, servlet_url)));
            Document doc = docBuilder.parse (new File(xml_File_Path  + file_Name));


            NodeList listOfRecords = doc.getElementsByTagName(recordElementName);
            int totalRecords = listOfRecords.getLength();
			arrayList = new String[totalRecords][2];

           // System.out.println("Total no of records : " + totalRecords);

            for(int s=0; s<listOfRecords.getLength() ; s++){


                Node firstRecordsNode = listOfRecords.item(s);
                if(firstRecordsNode.getNodeType() == Node.ELEMENT_NODE){

                    Element firstRecordsElement = (Element)firstRecordsNode;

                    //-------                    
					NodeList firstNameList = firstRecordsElement.getElementsByTagName(recordTextName);
                    Element firstNameElement = (Element)firstNameList.item(0);

                    NodeList textFNList = firstNameElement.getChildNodes();
					arrayList[s][0] =  ((Node)textFNList.item(0)).getNodeValue().trim();
  //                  System.out.println("Text : " + ((Node)textFNList.item(0)).getNodeValue().trim());

                    //-------                    
					NodeList lastNameList = firstRecordsElement.getElementsByTagName(recordValue);
                    Element lastNameElement = (Element)lastNameList.item(0);

                    NodeList textLNList = lastNameElement.getChildNodes();
					arrayList[s][1] =  ((Node)textLNList.item(0)).getNodeValue().trim();
//                   System.out.println("Value : " + ((Node)textLNList.item(0)).getNodeValue().trim());

                }//end of if clause

            }//end of for loop with s var
        }
		catch (Exception e) 
		{
			Logger.logErr(new ReadXMLFile(), "readXML", e);
		}

        return arrayList;
    }
	/*******************************************************************************************************/
	//Method to read XML file to fill drop down list -- END
	/*-----------------------------------------------------------------------------------------------------*/
}