/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * Confidential and Proprietary
 * See Legal.txt for additional notices.
 */

/*
 * Class		:		PasswordService
 * Purpose		:		Encryption of Password
 */

package com.inetvod.webapp;


import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
//import org.myorg.SystemUnavailableException;
import sun.misc.BASE64Encoder;
import sun.misc.CharacterEncoder;
import com.inetvod.common.core.*;

public final class PasswordService
{
  //private static PasswordService instance;

  public PasswordService()
  {
  }

  public static synchronized String encrypt(String plaintext) 
  {
    MessageDigest md = null;
    try
    {
      md = MessageDigest.getInstance("SHA"); //step 2
    }
    catch(Exception e)
    {
      Logger.logErr(new PasswordService(), "encrypt", e);
	  //System.out.println("Exception -- " + e);
    }
    try
    {
      md.update(plaintext.getBytes("UTF-8")); //step 3
    }
    catch(Exception e)
    {
      Logger.logErr(new PasswordService(), "encrypt", e);
    }

    byte raw[] = md.digest(); //step 4
    String hash = (new BASE64Encoder()).encode(raw); //step 5
    return hash; //step 6
  }
  
  /*
  public static synchronized PasswordService getInstance() //step 1
  {
    if(instance == null)
    {
       instance = new PasswordService(); 
    } 
    return instance;
  }
  */
}
