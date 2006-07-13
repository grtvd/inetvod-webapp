/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.inetvod.common.core.CompUtil;
import com.inetvod.common.core.CountryID;
import com.inetvod.common.core.Logger;
import com.inetvod.common.core.StrUtil;
import com.inetvod.common.crypto.CryptoDigest;
import com.inetvod.common.data.Address;
import com.inetvod.common.data.ConnectionSpeed;
import com.inetvod.common.data.CreditCard;
import com.inetvod.common.data.CreditCardType;
import com.inetvod.common.data.IncludeAdult;
import com.inetvod.common.data.MemberID;
import com.inetvod.common.data.RatingID;
import com.inetvod.common.data.RatingIDList;
import com.inetvod.common.dbdata.Member;
import com.inetvod.common.dbdata.MemberAccount;
import com.inetvod.common.dbdata.MemberLogon;
import com.inetvod.common.dbdata.MemberPrefs;
import com.inetvod.common.dbdata.RatingList;

public class MemRegister extends MemRegisterSetVariables
{
	/*******************************************************************************************************/
	// Registering a New User -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void new_Member()
	{
		Member member = null;
		MemberLogon memberLogon = null;
		MemberPrefs memberPrefs = null;

		try
		{
			setError_flag(false);
			setEmail_Exist_Flag(false); // Check for email Id exist or not

			if (MemberLogon.findByEmail(getEmail_id()) != null)
			{
				setEmail_Exist_Flag(true);
				return;
			}

			// Create Member ID
			member = Member.newInstance();
			member.update();

			// Get member Id
			MemberID memberID = member.getMemberID();

			// Create instance of Member Logon details and pass Member ID
			memberLogon = MemberLogon.newInstance(memberID);
			memberLogon.setEmail(getEmail_id());

			memberLogon.setPassword(CryptoDigest.encrypt(getPassword_id()));
			memberLogon.setSecretQuestion(getSecret_question());
			memberLogon.setSecretAnswer(getSecret_answer());
			memberLogon.setTermsAcceptedVersion("1.0.0");
			memberLogon.setTermsAcceptedOn(new Date());
			memberLogon.update();

			// Create MemberPrefs
			memberPrefs = MemberPrefs.newInstance(memberID);
			memberPrefs.update();

			setMember_id(memberID.toString());
		}
		catch(Exception e)
		{
			setError_flag(true);
			try { if(memberPrefs != null) memberPrefs.delete(); } catch(Exception e2) { }
			try { if(memberLogon != null) memberLogon.delete(); } catch(Exception e2) { }
			try { if(member != null) member.delete(); } catch(Exception e2) { }
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

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
		}
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Members Personal Information  -- END
	/*******************************************************************************************************/

	public void setValueFromQuery(HttpServletRequest request, String queryField, String dataField)
	{
		String value = request.getParameter(queryField);
		if(StrUtil.hasLen(value))
		{
			if(FIRST_NAME_FLD.equals(dataField))
				setFirst_name(value);
			else if(LAST_NAME_FLD.equals(dataField))
				setLast_name(value);
			else if(ADDRESS_1_FLD.equals(dataField))
				setAddress_1(value);
			else if(ADDRESS_2_FLD.equals(dataField))
				setAddress_2(value);
			else if(CITY_FLD.equals(dataField))
				setCity(value);
			else if(STATE_FLD.equals(dataField))
				setState(value);
			else if(ZIP_FLD.equals(dataField))
				setZip(value);
			else if(COUNTRY_FLD.equals(dataField))
				setCountry_id(value);
			else if(EMAIL_FLD.equals(dataField))
				setEmail_id(value);
			else if(SECRET_QUESTION_FLD.equals(dataField))
				setSecret_question(value);
			else if(SECRET_ANSWER_FLD.equals(dataField))
				setSecret_answer(value);
		}
	}

	/*******************************************************************************************************/
	// Update Personal Information -- START
	/*-----------------------------------------------------------------------------------------------------*/
	public void update_Personal_Info(String mem_id)
	{
		try
		{
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Update Member Details
			Member member = Member.get(member_id);
			member.setFirstName(getFirst_name());
			member.setLastName(getLast_name());
			member.update();

			// Create instance of Member Account and fetch data into array
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			if(StrUtil.hasLen(getAddress_1()) || StrUtil.hasLen(getAddress_2()) || StrUtil.hasLen(getCity())
				|| StrUtil.hasLen(getState()) || StrUtil.hasLen(getZip()) || StrUtil.hasLen(getCountry_id()))
			{
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
			else if(mem_Account.getHomeAddress() != null)
			{
				mem_Account.setHomeAddress(null);
				mem_Account.update();
			}
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "update_Personal_Info", e);
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account and fetch data into array
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			if(StrUtil.hasLen(getName_on_card()) || StrUtil.hasLen(getCard_type()) || StrUtil.hasLen(getCard_number())
				|| StrUtil.hasLen(getSecurity_code()) || StrUtil.hasLen(getExp_month()) || StrUtil.hasLen(getExp_year())
				|| StrUtil.hasLen(getAddress_1()) || StrUtil.hasLen(getAddress_2()) || StrUtil.hasLen(getCity())
				|| StrUtil.hasLen(getState()) || StrUtil.hasLen(getZip()) || StrUtil.hasLen(getCountry_id())
				|| StrUtil.hasLen(getPhone()))
			{
				// Create instance of Credit Card
				CreditCard creditCard = new CreditCard();

				creditCard.setNameOnCC(getName_on_card());
				creditCard.setCCType(CreditCardType.convertFromString(getCard_type()));
				creditCard.setCCNumber(getCard_number());
				creditCard.setCCSIC(getSecurity_code());
				creditCard.setExpireDate(Integer.parseInt(getExp_month()), Integer.parseInt(getExp_year()));

				// Create instance of Address from Member Account
				Address address = new Address();

				address.setAddrStreet1(getAddress_1());
				address.setAddrStreet2(getAddress_2());
				address.setCity(getCity());
				address.setState(getState());
				address.setPostalCode(getZip());
				address.setPhone(getPhone());
				address.setCountry(new CountryID(getCountry_id()));

				// set address to credit card details
				creditCard.setBillingAddress(address);

				// set credit card details to member account
				mem_Account.setCreditCard(creditCard);
				mem_Account.update();
			}
			else if(mem_Account.getCreditCard() != null)
			{
				mem_Account.setCreditCard(null);
				mem_Account.update();
			}
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "update_Card_Details", e);
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member and fetch data into array
			Member member = Member.get(member_id);
			setFirst_name(Check_For_Null(member.getFirstName()) + " " + Check_For_Null(member.getLastName()));

			// Instance of Logon
			MemberLogon memLogon = MemberLogon.getCreate(member_id);
			setEmail_id(memLogon.getEmail());
			setPlayer_logon("" + memLogon.getLogonID());

			// Create instance of Member Account and fetch data into array
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			// Create instance of Address from Member Account
			Address address = mem_Account.getHomeAddress();
			if (address != null) // Chcek if Address object is null
			{
				setAddress_1(Check_For_Null(address.getAddrStreet1()));
				setAddress_2(Check_For_Null(address.getAddrStreet2()));

				StringBuilder sb = new StringBuilder();
				sb.append(address.getCity());
				if(StrUtil.hasLen(address.getState()) || StrUtil.hasLen(address.getPostalCode()))
				{
					if(sb.length() != 0)
						sb.append(", ");
					sb.append(address.getState());
					if(StrUtil.hasLen(address.getState()))
						sb.append(" ");
					sb.append(address.getPostalCode());
				}
				setCity(sb.toString());
			}
			else
				setAddress_1("not supplied");

			// Create instance of Credit Card from Member Account
			String card_details = "not supplied";
			CreditCard creditCard = mem_Account.getCreditCard();

			if (creditCard != null)
			{
				setName_on_card(Check_For_Null(creditCard.getNameOnCC()));

				//Creating object of Card Type and fetching value
				CreditCardType ccType = creditCard.getCCType();

				if (ccType != null)
					card_details = ccType.toString();

				int str_length = Check_For_Null(creditCard.getCCNumber()).length();
				if (str_length > 4)
					card_details = card_details + "  ...." + Check_For_Null(creditCard.getCCNumber()).substring(str_length - 4);
			}

			setCard_number(card_details);

			//Instance of Member Pref to fetch the data
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);

			StringBuilder parent_det = new StringBuilder();
			if (mem_Prefs.getIncludeDownload())
				parent_det.append("Downloaded");

			if (mem_Prefs.getIncludeStreaming())
			{
				if (parent_det.length() != 0)
					parent_det.append(", ");
				parent_det.append("Streamed, ");
				parent_det.append(ConnectionSpeed.convertToString(mem_Prefs.getConnectionSpeed()));
			}
			setParental_details(parent_det.toString());

			RatingList ratingList = RatingList.find();
			if(mem_Prefs.getIncludeRatingIDList().size() == ratingList.size())
				setRatingId("All ratings");
			else
				setRatingId("Some ratings");

			IncludeAdult include_Adult = mem_Prefs.getIncludeAdult();

			String str_Include_Adult_Text = "";
			if (IncludeAdult.Never.equals(include_Adult))
				str_Include_Adult_Text = ", adult content never accessible";
			else if (IncludeAdult.PromptPassword.equals(include_Adult))
				str_Include_Adult_Text = ", adult content accessible on password";
			else if (IncludeAdult.Always.equals(include_Adult))
				str_Include_Adult_Text = ", adult content always accessible";

			setInclude_adult(str_Include_Adult_Text );
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "overView_Details", e);
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account and fetch data into array
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);

			IncludeAdult include_Adult = mem_Prefs.getIncludeAdult();

			setInclude_adult("" + include_Adult);

			RatingIDList ratingList = mem_Prefs.getIncludeRatingIDList();

			String arr_List = "";
			for(RatingID rating : ratingList)
			{
				arr_List = arr_List + "," + rating;
			}

			arr_List += ",";
			setRatingId(arr_List);

			MemberAccount mem_Account = MemberAccount.getCreate(member_id);
			Date birthDate = mem_Account.getBirthDate();

			String strOutDt = "";//Check_For_Null(birthDate);
			if (birthDate != null)
			{
				strOutDt = new SimpleDateFormat("M/d/yyyy").format(birthDate );
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Create instance of Member Account store data
			MemberAccount mem_Account = MemberAccount.getCreate(member_id);

			if(getBirth_date().length() > 0)
			{
				SimpleDateFormat sim = new SimpleDateFormat("M/d/yyyy");
				Date datum = sim.parse(getBirth_date());

				mem_Account.setBirthDate(datum);
			}
			else
				mem_Account.setBirthDate(null);

			mem_Account.update();

			// Create instance of Member Account and store data
			MemberPrefs mem_Prefs = MemberPrefs.getCreate(member_id);

			mem_Prefs.setIncludeAdult(IncludeAdult.convertFromString(getInclude_adult()));

			if(StrUtil.hasLen(getAdult_pin()))
			{
				mem_Prefs.setAdultPIN(CryptoDigest.encrypt(getAdult_pin()));
			}
			else
				mem_Prefs.setAdultPIN(null);

			// Create intance of RatingIDList
			RatingIDList ratingIDList = mem_Prefs.getIncludeRatingIDList();
			ratingIDList.clear();
			String [] ratings = getRating();
			for(String rating : ratings)
			{
				ratingIDList.add(new RatingID(rating));
			}

			mem_Prefs.update();

		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "update_Parental_Details", e);
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

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
		try
		{
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Instance of Logon
			MemberLogon memLogon = MemberLogon.getCreate(member_id);
			memLogon.setPIN(CryptoDigest.encrypt(getPin()));
			memLogon.update();
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "Player_Logon_Pin_Update", e);
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

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
		try
		{
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);
			setEmail_Exist_Flag(false); // Check for email Id exist or not

			MemberLogon memLogon = MemberLogon.findByEmail(getEmail_id());

			if (memLogon == null)
			{
				// Cast Member ID
				MemberID member_id = new MemberID(mem_id);

				// Instance of Logon
				memLogon = MemberLogon.get(member_id);
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

			// Instance of Logon
			MemberLogon memLogon = MemberLogon.findByEmail(email);

			if (memLogon != null)
			{
				str_Quest_Ans[0] = memLogon.getSecretQuestion();
				str_Quest_Ans[1] = memLogon.getSecretAnswer();
			}

			setQuest_ans(str_Quest_Ans);
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Email_Id_Check", e);
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

			// Instance of Logon
			MemberLogon memLogon = MemberLogon.findByEmail(getEmail_id());
			if (memLogon != null)
			{
				memLogon.setPassword(CryptoDigest.encrypt(getPassword_id()));
				memLogon.update();
			}
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Password_Reset", e);
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
			if(!StrUtil.hasLen(mem_id))
			{
				setError_flag(true);
				return;
			}

			setError_flag(false);

			// Cast Member ID
			MemberID member_id = new MemberID(mem_id);

			// Instance of Logon
			MemberLogon memLogon = MemberLogon.get(member_id);
			if(CompUtil.areEqual(memLogon.getPassword(), CryptoDigest.encrypt(exist_Password)))
			{
				memLogon.setPassword(CryptoDigest.encrypt(new_Password));
				memLogon.update();
				flag = true;
			}
			setFlag(flag);
		}
		catch(Exception e)
		{
			setError_flag(true);
			Logger.logErr(this, "member_Password_Update", e);
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

			// Instance of Logon
			MemberLogon memLogon = MemberLogon.findByEmailPassword(email, CryptoDigest.encrypt(pass));

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
			if(str_Value == null)
				str_Value = "";
		}
		catch(Exception e)
		{
			Logger.logErr(this, "Check_For_Null", e);
		}
		return str_Value;
	}
	/*-----------------------------------------------------------------------------------------------------*/
	// Check for Null -- END
	/*******************************************************************************************************/
}
