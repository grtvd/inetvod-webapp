/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;


import java.security.MessageDigest;

import com.inetvod.common.core.Logger;
import sun.misc.BASE64Encoder;

public final class PasswordService
{
	public static String encrypt(String plaintext) throws Exception
	{
		synchronized(PasswordService.class)
		{
			MessageDigest md;
			try
			{
				md = MessageDigest.getInstance("SHA"); //step 2
				md.update(plaintext.getBytes("UTF-8")); //step 3

				byte raw[] = md.digest(); //step 4
				return (new BASE64Encoder()).encode(raw); //step 5
			}
			catch(Exception e)
			{
				Logger.logErr(new PasswordService(), "encrypt", e);
				throw e;
			}
		}
	}
}
