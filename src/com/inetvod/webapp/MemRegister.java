/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * Confidential and Proprietary
 * See Legal.txt for additional notices.
 */

/*
 * Class		:		memRegister
 * Purpose		:		Registration of User
 */

package com.inetvod.webapp;

import com.inetvod.common.dbdata.*;
import com.inetvod.common.data.*;
import com.inetvod.common.core.*;

import java.util.*;
import java.util.Date;
import java.text.SimpleDateFormat;

public class MemRegister extends MemRegisterSetVariables
{
	/*******************************************************************************************************/
	// Registering a New User -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void new_Member()
	{
		try
		{
			setError_flag(false);
			setEmail_Exist_Flag(false); // Check for email Id exist or not

			MemberLogon memLogon = null;
			memLogon = MemberLogon.findByEmail(getEmail_id());

			if (memLogon == null)
			{

				// Create Member ID
				Member member = Member.newInstance();
				member.update();
				
				// Get member Id
				MemberID mem_id = member.getMemberID();

				// Create instance of Member Logon details and pass Member ID
				memLogon = MemberLogon.newInstance(mem_id);
				memLogon.setEmail(getEmail_id());

				memLogon.setPassword(PasswordService.encrypt(getPassword_id()));
				//memLogon.setPassword(getPassword_id());
				memLogon.setSecretQuestion(getSecret_question());
				memLogon.setSecretAnswer(PasswordService.encrypt(getSecret_answer()));
				memLogon.setTermsAcceptedVersion("1.0.0");	
				memLogon.setTermsAcceptedOn(new Date());
				memLogon.update();

				setMember_id(mem_id.toString()); 
			}
			else
				setEmail_Exist_Flag(true);


		}
		catch(Exception e) 
		{
			setError_flag(true);
			//System.out.println("Error in new_member() in com.inetvod.webapp.memRegister.java === " + e);
			Logger.logErr(this, "new_Member", e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Registering a New User -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Members Personal Information -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Personal(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member and fetch data into array
			Member member = Member.get(member_id);
			setFirst_name(Check_For_Null(member.getFirstName()));
			setLast_name(Check_For_Null(member.getLastName()));

			// Create instance of Member Account and fetch data into array
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			// Create instance of Address from Member Account
			Address address = mem_Account.getHomeAddress();
			if (address != null) // Check if Address object is null 
			{
				setAddress_1(Check_For_Null(address.getAddrStreet1()));
				setAddress_2(Check_For_Null(address.getAddrStreet2()));
				setCity(Check_For_Null(address.getCity()));
				setState(Check_For_Null(address.getState()));
				setZip(Check_For_Null(address.getPostalCode()));
				CountryID cntId = address.getCountry();
				if (cntId == null)
					setCountry_id("");
				else
					setCountry_id(cntId.toString());			
			}
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Personal", e);
			//System.out.println("Error in member_Personal() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Members Personal Information  -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Update Personal Information -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void update_Personal_Info(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Update Member Details
			Member member = Member.get(member_id);
			member.setFirstName(getFirst_name());
			member.setLastName(getLast_name());
			member.update();
			
			if(getAddress_1().length() > 0 || getAddress_2().length() > 0 || getCity().length() > 0 || getState().length() > 0 || getZip().length() > 0)
			{
				// Create instance of Member Account and fetch data into array
				MemberAccount mem_Account = MemberAccount.getCreate(member_id);

				// Create instance of Address from Member Account
				Address address = new Address();
				
				address.setAddrStreet1(getAddress_1());
				address.setAddrStreet2(getAddress_2());
				address.setCity(getCity());
				address.setState(getState());
				address.setPostalCode(getZip());

				CountryID cntId = new CountryID(getCountry_id());
				address.setCountry(cntId);

				mem_Account.setHomeAddress(address);
				mem_Account.update();
			}
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "update_Personal_Info", e);
			//System.out.println("Error in new_member() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Update Personal Information -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Members Card Details-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Card_Details(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account and fetch data into array
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			// Create instance of Credit Card from Member Account
			CreditCard creditCard = mem_Account.getCreditCard();

			if (creditCard != null) // Chcek if CreditCard object is null 
			{
				setName_on_card(Check_For_Null(creditCard.getNameOnCC()));
				
				//Creating object of Card Type and fetching value
				CreditCardType ccType = creditCard.getCCType();
				if (ccType == null)
					setCard_type("0");
				else 
					setCard_type(ccType.toString());

				setCard_number(Check_For_Null(creditCard.getCCNumber()));
				setExp_month("" + creditCard.getExpireDateMonth());
				setExp_year("" + creditCard.getExpireDateYear());
				setSecurity_code(Check_For_Null(creditCard.getCCSIC()));

				// Instance of billing address
				Address address = creditCard.getBillingAddress();
				if (address != null) // Chcek if Address object is null 
				{
					setAddress_1(Check_For_Null(address.getAddrStreet1()));
					//setAddress_2(Check_For_Null(address.getAddrStreet2()));
					setCity(Check_For_Null(address.getCity()));
					setState(Check_For_Null(address.getState()));
					setZip(Check_For_Null(address.getPostalCode()));

					// Creating object of country to fetch data
					CountryID cntId = address.getCountry();
					if (cntId == null)
						setCountry_id("");
					else
						setCountry_id(cntId.toString());	
					
					setPhone(Check_For_Null(address.getPhone()));
				}		
			}
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Card_Details", e);
			//System.out.println("Error in member_Personal() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// // Members Card Details  -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Update Card Details -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void update_Card_Details(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account and fetch data into array
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			// Create instance of Credit Card 
			CreditCard creditCard = new CreditCard();

			creditCard.setNameOnCC(getName_on_card());
			creditCard.setCCNumber(getCard_number());
			creditCard.setCCSIC(getSecurity_code());
			creditCard.setExpireDate(Integer.parseInt(getExp_month()), Integer.parseInt(getExp_year()));

			// instance of Credt Card Type 
			CreditCardType ccType = CreditCardType.convertFromString(getCard_type());
			creditCard.setCCType(ccType);

			// Create instance of Address from Member Account
			Address address = new Address();
			
			address.setAddrStreet1(getAddress_1());
			//address.setAddrStreet2(getAddress_2());
			address.setCity(getCity());
			address.setState(getState());
			address.setPostalCode(getZip());
			address.setPhone(getPhone());

			// object of country
			CountryID cntId = new CountryID(getCountry_id());
			address.setCountry(cntId);

			// set address to credit card details
			creditCard.setBillingAddress(address);

			// set credit card details to member account
			mem_Account.setCreditCard(creditCard);
			mem_Account.update();
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "update_Card_Details", e);
			//System.out.println("Error in update_Card_Details() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Update Card Details -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Overview Page Details  -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void overView_Details(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.getCreate(member_id);
			setEmail_id(memLogon.getEmail());
			setPlayer_logon("" + memLogon.getLogonID());

			// Create instance of Member Account and fetch data into array
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			// Create instance of Member and fetch data into array
			Member member = Member.get(member_id);
			setFirst_name(Check_For_Null(member.getFirstName()) + " " + Check_For_Null(member.getLastName()));

			// Create instance of Address from Member Account
			Address address = mem_Account.getHomeAddress();
			if (address != null) // Chcek if Address object is null 
				setAddress_1(Check_For_Null(address.getAddrStreet1()) + " " + Check_For_Null(address.getAddrStreet2()) + "<br>" + Check_For_Null(address.getCity()) + " " + Check_For_Null(address.getState()) + " " + Check_For_Null(address.getPostalCode()));
			else
				setAddress_1("no address supplied");

			// Create instance of Credit Card from Member Account
			String card_details = "";
			CreditCard creditCard = mem_Account.getCreditCard();

			if (creditCard != null)
			{
				setName_on_card(Check_For_Null(creditCard.getNameOnCC()));

				//Creating object of Card Type and fetching value
				CreditCardType ccType = creditCard.getCCType();

				if (ccType == null)
					card_details = "no credit card supplied " ;
				else 
					card_details = ccType.toString(); 		

				int str_length = Check_For_Null(creditCard.getCCNumber()).length();
				if (str_length > 4)
					card_details = card_details + "  ...." + Check_For_Null(creditCard.getCCNumber()).substring(str_length - 4);
			}
			else
				card_details = "no credit card supplied " ;

			setCard_number(card_details); 

			//Instance of Member Pref to fetch the data
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);
			ConnectionSpeed conn_Speed = mem_Prefs.getConnectionSpeed();

			String parent_det = "";
			if (mem_Prefs.getIncludeDownload())
			{
				parent_det  = "Downloaded";
			}

			if (mem_Prefs.getIncludeStreaming())
			{

				if (parent_det .length() > 1)
					parent_det  = parent_det  + " , Streamed, " + Check_For_Null("" + conn_Speed);
				else
					parent_det  = "Streamed, " + Check_For_Null("" + conn_Speed);
			}
			setParental_details(parent_det);

			IncludeAdult include_Adult = mem_Prefs.getIncludeAdult();

			String str_Include_Adult = Check_For_Null("" + include_Adult);
			String str_Include_Adult_Text = "";
			if (str_Include_Adult.equals("Never"))
				str_Include_Adult_Text = ", adult content never accessible";
			else if (str_Include_Adult.equals("PromptPassword"))
					str_Include_Adult_Text = ", adult content accessible on password";
			else if (str_Include_Adult.equals("Always"))
					str_Include_Adult_Text = ", adult content always accessible";

			setInclude_adult(str_Include_Adult_Text );
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "overView_Details", e);
			//System.out.println("Error in overView_Details() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Overview Page Details -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Members Parental Details-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Parental_Details(String mem_id)
	{

		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account and fetch data into array
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);

			IncludeAdult include_Adult = mem_Prefs.getIncludeAdult();

			setInclude_adult("" + include_Adult);

			setPin(mem_Prefs.getAdultPIN());

			RatingIDList ratingList = mem_Prefs.getIncludeRatingIDList();

			String arr_List = ""; 
			for (int i = 0 ;i < ratingList.size(); i++ )
			{
				arr_List = arr_List + "," + ratingList.get(i);
			}

			arr_List = arr_List + ",";
			setRatingId(arr_List);

			MemberAccount mem_Account = MemberAccount.getCreate(member_id);
			Date birthDate = mem_Account.getBirthDate();

			String strOutDt = "";//Check_For_Null(birthDate);
			if (birthDate != null)
			{
				strOutDt = new SimpleDateFormat("MM/dd/yyyy").format(birthDate );
			}
/*
			if(strOutDt.length() > 0)
				strOutDt = new SimpleDateFormat("MM/dd/yyyy").format(birthDate );
*/
			setStr_date(strOutDt);
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Parental_Details", e);
			//System.out.println("Error in member_Parental_Details() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Members Parental Details  -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Update Parental Details -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void update_Parental_Details(String mem_id)
	{
		try
		{
			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account store data
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			if(getBirth_date().length() > 0)
			{
				SimpleDateFormat sim = new SimpleDateFormat("MM/dd/yyyy");
				java.util.Date datum = new java.util.Date();
				datum = sim.parse(getBirth_date());

				mem_Account.setBirthDate(datum);
			}
			else
				mem_Account.setBirthDate(null);

			mem_Account.update();

			// Create instance of Member Account and store data
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);

			mem_Prefs.setIncludeAdult(IncludeAdult.convertFromString(getInclude_adult()));

			if(getAdult_pin().length() > 0)
			{
				//mem_Prefs.setAdultPIN(PasswordService.encrypt(getAdult_pin()));
				mem_Prefs.setAdultPIN(getAdult_pin());
			}
			else
				mem_Prefs.setAdultPIN("");

			// Create intance of RatingIDList
			RatingIDList ratingIDList = mem_Prefs.getIncludeRatingIDList();
			ratingIDList.clear();
			String [] rating = getRating();
			for (int i = 0; i < rating.length ; i++)
			{
				ratingIDList.add(new RatingID(rating[i]));
			}

			mem_Prefs.update();

		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "update_Parental_Details", e);
			//System.out.println("Error in update_Parental_Details() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Update Parental Details  -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Members Content Formats -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Content_Details(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account and fetch data into array
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);

			setDownload(mem_Prefs.getIncludeDownload());
			setStreaming(mem_Prefs.getIncludeStreaming());

			ConnectionSpeed conn_Speed = mem_Prefs.getConnectionSpeed();
			setSpeed(Check_For_Null("" + conn_Speed));

		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Content_Details", e);
			//System.out.println("Error in member_Content_Details() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Members Content Formats -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Members Content Update -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Content_Update(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account and fetch data into array
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);

			ConnectionSpeed conn_Speed = ConnectionSpeed.convertFromString(getSpeed());

			mem_Prefs.setIncludeDownload(getDownload());
			mem_Prefs.setIncludeStreaming(getStreaming());
			mem_Prefs.setConnectionSpeed(conn_Speed);
			mem_Prefs.update();
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Content_Update", e);
			//System.out.println("Error in member_Content_Update() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Members Content Update  -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Player Logon -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void Player_Logon_Id(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.getCreate(member_id);
			setPlayer_logon(Check_For_Null("" + memLogon.getLogonID()));
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "Player_Logon_Id", e);
			//System.out.println("Error in update_Card_Details() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Player Logon -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Player Logon Update-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void Player_Logon_Pin_Update(String mem_id)
	{
		String player_Logon_Id = "";
		try
		{
			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.getCreate(member_id);
//			memLogon.setPIN(PasswordService.encrypt(pin));
			memLogon.setPIN(getPin());
			memLogon.update();
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "Player_Logon_Pin_Update", e);
			//System.out.println("Error in Player_Logon_Pin_Update() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Player Logon Update-- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Member Email Id -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Email_Id(String mem_id)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.getCreate(member_id);
			setEmail_id(Check_For_Null(memLogon.getEmail()));
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "member_Email_Id", e);
			//System.out.println("Error in member_Email_Id() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Member Email Id -- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Member Email Id Update-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Email_Id_Update(String mem_id)
	{
		String player_Logon_Id = "";
		try
		{
			setError_flag(false);
			setEmail_Exist_Flag(false); // Check for email Id exist or not

			MemberLogon memLogon = null;
			memLogon = MemberLogon.findByEmail(getEmail_id());

			if (memLogon == null)
			{
				// Cast Member ID
				MemberID member_id = new MemberID(mem_id);

				// Instance of Logon 
				memLogon = MemberLogon.getCreate(member_id);
				memLogon.setEmail(getEmail_id());
				memLogon.update();
			}
			else
				setEmail_Exist_Flag(true);
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "member_Email_Id_Update", e);
			//System.out.println("Error in Player_Logon_Pin_Update() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Member Email Id Update-- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Check Question, Answer for Reset Password-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Email_Id_Check(String email)
	{
		String [] str_Quest_Ans = {"", ""};
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.findByEmail(email);

			if (memLogon != null)
			{
				if(email.equals(Check_For_Null(memLogon.getEmail())))
				{
					str_Quest_Ans[0] = memLogon.getSecretQuestion();
					str_Quest_Ans[1] = memLogon.getSecretAnswer();
				}
			}

			setQuest_ans(str_Quest_Ans);
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "member_Email_Id_Check", e);
			//System.out.println("Error in member_Email_Id_Check() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Check Question Answer for Reset Password-- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Reset Password-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Password_Reset()
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.findByEmail(getEmail_id());
			if (memLogon != null)
			{
				memLogon.setPassword(PasswordService.encrypt(getPassword_id()));
				memLogon.update();
			}
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "member_Password_Reset", e);
			//System.out.println("Error in member_Email_Id_Check() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Reset Password-- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Player Logon Update-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Password_Update(String mem_id, String exist_Password, String new_Password)
	{
		boolean flag = false;
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.getCreate(member_id);
			String str_pass = memLogon.getPassword();
			if (str_pass.equals(PasswordService.encrypt(exist_Password)))
			{
				memLogon.setPassword(PasswordService.encrypt(new_Password));
				memLogon.update();
				flag = true;
			}
			setFlag(flag);
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "member_Password_Update", e);
			//System.out.println("Error in member_Password_Update() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Player Logon Update-- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	//Logon Check-- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void member_Logon_Check(String email, String pass)
	{
		try
		{
			setError_flag(false);
			// Create DB Connection
			//DatabaseAdaptor.setDBConnectFile(CallServlet.openServlet_And_Return_Cnn_String("dbconnect", servlet_url));

			// Instance of Logon 
			MemberLogon memLogon = MemberLogon.findByEmailPassword(email, PasswordService.encrypt(pass));

			if(memLogon != null)
			{
				MemberID member_id= memLogon.getMemberID();
				setMember_id("" + member_id);
			}
		}
		catch(Exception e) 
		{
			setError_flag(true);
			Logger.logErr(this, "member_Logon_Check", e);
			//System.out.println("Error in member_Email_Id_Check() in com.inetvod.webapp.memRegister.java === " + e);
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	//Logon Check-- END
	/*******************************************************************************************************/

	/*******************************************************************************************************/
	// Check for Null -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public String Check_For_Null(String str_Value)
	{
		try
		{
			if(str_Value == null )
				str_Value = "";
		}
		catch(Exception e)
		{
			Logger.logErr(this, "Check_For_Null", e);
			//System.out.println("Error in Check_For_Null() in com.inetvod.webapp.memRegister.java === " + e);
		}
		return str_Value;
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Check for Null -- END
	/*******************************************************************************************************/
}