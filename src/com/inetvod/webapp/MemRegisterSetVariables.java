/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
 */
package com.inetvod.webapp;

import java.io.Serializable;

import com.inetvod.common.core.StrUtil;

public class MemRegisterSetVariables implements Serializable
{
	/*******************************************************************************************************/
	// Set & Get properties -- START
	/*-----------------------------------------------------------------------------------------------------*/
	private String fPageRedirect;
	public void setPage_Redirect(String page_Redirect) {
		fPageRedirect = page_Redirect;
	}

	public String getPage_Redirect() {
		return fPageRedirect;
	}

	public boolean isLoggedIn()
	{
		return StrUtil.hasLen(fMemberID);
	}

	/***************************************************/
	private String fMemberID;
	public void setMember_id(String member_id) {
		fMemberID = member_id;
	}

	public String getMember_id() {
		return fMemberID ;
	}
	/***************************************************/

	/***************************************************/
	private String fEmail;
	public void setEmail_id(String email_id) {
		fEmail = email_id;
	}

	public String getEmail_id() {
		return fEmail;
	}
	/***************************************************/

	/***************************************************/
	private String fPassword;
	public void setPassword_id(String password_id) {
		fPassword = password_id;
	}

	public String getPassword_id() {
		return fPassword;
	}
	/***************************************************/

	/***************************************************/
	private String fSecretQuestion;
	public void setSecret_question(String secret_question) {
		fSecretQuestion = secret_question;
	}

	public String getSecret_question() {
		return fSecretQuestion;
	}
	/***************************************************/

	/***************************************************/
	private String fSecretAnswer;
	public void setSecret_answer(String secret_answer) {
		fSecretAnswer = secret_answer;
	}

	public String getSecret_answer() {
		return fSecretAnswer;
	}
	/***************************************************/

	/***************************************************/
	private String fFirstName;
	public void setFirst_name(String first_name) {
		fFirstName = first_name;
	}

	public String getFirst_name() {
		return fFirstName;
	}
	/***************************************************/

	/***************************************************/
	private String fLastMame;
	public void setLast_name(String last_name) {
		fLastMame = last_name;
	}

	public String getLast_name() {
		return fLastMame;
	}
	/***************************************************/

	/***************************************************/
	private String fAddress1;
	public void setAddress_1(String address_1) {
		fAddress1 = address_1;
	}

	public String getAddress_1() {
		return fAddress1;
	}
	/***************************************************/

	/***************************************************/
	private String fAddresss;
	public void setAddress_2(String address_2) {
		fAddresss = address_2;
	}

	public String getAddress_2() {
		return fAddresss;
	}
	/***************************************************/

	/***************************************************/
	private String fCity;
	public void setCity(String city) {
		fCity = city;
	}

	public String getCity() {
		return fCity;
	}
	/***************************************************/

	/***************************************************/
	private String fState;
	public void setState(String state) {
		fState = state;
	}

	public String getState() {
		return fState;
	}
	/***************************************************/

	/***************************************************/
	private String fZip;
	public void setZip(String zip) {
		fZip = zip;
	}

	public String getZip() {
		return fZip;
	}
	/***************************************************/

	/***************************************************/
	private String fCountryID;
	public void setCountry_id(String country_id) {
		fCountryID = country_id;
	}

	public String getCountry_id() {
		return fCountryID;
	}
	/***************************************************/

	/***************************************************/
	private String fPhone;
	public void setPhone(String phone) {
		fPhone = phone;
	}

	public String getPhone() {
		return fPhone;
	}
	/***************************************************/

	/***************************************************/
	private String fNameOnCard;
	public void setName_on_card(String name_on_card) {
		fNameOnCard = name_on_card;
	}

	public String getName_on_card() {
		return fNameOnCard;
	}
	/***************************************************/

	/***************************************************/
	private String fCardType;
	public void setCard_type(String card_type) {
		fCardType = card_type;
	}

	public String getCard_type() {
		return fCardType;
	}
	/***************************************************/

	/***************************************************/
	private String fCardNumber;
	public void setCard_number(String card_number) {
		fCardNumber = card_number;
	}

	public String getCard_number() {
		return fCardNumber;
	}
	/***************************************************/

	/***************************************************/
	private String fExpMonth;
	public void setExp_month(String exp_month) {
		fExpMonth = exp_month;
	}

	public String getExp_month() {
		return fExpMonth;
	}
	/***************************************************/

	/***************************************************/
	private String fExpYear;
	public void setExp_year(String exp_year) {
		fExpYear = exp_year;
	}

	public String getExp_year() {
		return fExpYear;
	}
	/***************************************************/

	/***************************************************/
	private String fSecurityCode;
	public void setSecurity_code(String security_code) {
		fSecurityCode = security_code;
	}

	public String getSecurity_code() {
		return fSecurityCode;
	}
	/***************************************************/

	/***************************************************/
	private String fIncludeAdult;
	public void setInclude_adult(String include_adult) {
		fIncludeAdult = include_adult;
	}

	public String getInclude_adult() {
		return fIncludeAdult;
	}
	/***************************************************/

	/***************************************************/
	private String fAdultPIN;
	public void setAdult_pin(String adult_pin) {
		fAdultPIN = adult_pin;
	}

	public String getAdult_pin() {
		return fAdultPIN;
	}
	/***************************************************/

	/***************************************************/
	private String fBirthDate;
	public void setBirth_date(String birth_date) {
		fBirthDate = birth_date;
	}

	public String getBirth_date() {
		return fBirthDate;
	}
	/***************************************************/

	/***************************************************/
	private String [] fRating;
	public void setRating(String [] rating) {
		fRating = rating;
	}

	public String [] getRating() {
		return fRating;
	}

	/***************************************************/

	/***************************************************/
	private boolean fDownload;
	public void setDownload(boolean download) {
		fDownload = download;
	}

	public boolean getDownload() {
		return fDownload;
	}
	/***************************************************/

	/***************************************************/
	private boolean fStreaming;
	public void setStreaming(boolean streaming) {
		fStreaming = streaming;
	}

	public boolean getStreaming() {
		return fStreaming;
	}
	/***************************************************/

	/***************************************************/
	private String fSpeed;
	public void setSpeed(String speed) {
		fSpeed = speed;
	}

	public String getSpeed() {
		return fSpeed;
	}
	/***************************************************/

	/***************************************************/
	private String fPIN;
	public void setPin(String pin) {
		fPIN = pin;
	}

	public String getPin() {
		return fPIN;
	}
	/***************************************************/

	/***************************************************/
	private String fPlayerLogon;
	public void setPlayer_logon(String player_logon) {
		fPlayerLogon = player_logon;
	}

	public String getPlayer_logon() {
		return fPlayerLogon;
	}
	/***************************************************/

	/***************************************************/
	private String fParentalDetails;
	public void setParental_details(String parental_details) {
		fParentalDetails = parental_details;
	}

	public String getParental_details() {
		return fParentalDetails;
	}
	/***************************************************/

	/***************************************************/
	private String fRatingID;
	public void setRatingId(String ratingId) {
		fRatingID = ratingId;
	}

	public String getRatingId() {
		return fRatingID;
	}
	/***************************************************/

	/***************************************************/
	private String fStrDate;
	public void setStr_date(String str_date) {
		fStrDate = str_date;
	}

	public String getStr_date() {
		return fStrDate;
	}
	/***************************************************/

	/***************************************************/
	private String [] fQuestAns;
	public void setQuest_ans(String [] quest_ans) {
		fQuestAns = quest_ans;
	}

	public String [] getQuest_ans() {
		return fQuestAns;
	}
	/***************************************************/

	/***************************************************/
	private boolean fFlag;
	public void setFlag(boolean flag) {
		fFlag = flag;
	}

	public boolean getFlag() {
		return fFlag;
	}
	/***************************************************/

	/***************************************************/
	private boolean fErrorFlag;
	public void setError_flag(boolean error_flag) {
		fErrorFlag = error_flag;
	}

	public boolean getError_flag() {
		return fErrorFlag;
	}
	/***************************************************/

	/***************************************************/
	private boolean fEmai_ExistFlag;
	public void setEmail_Exist_Flag(boolean email_Exist_Flag) {
		fEmai_ExistFlag = email_Exist_Flag;
	}

	public boolean getEmail_Exist_Flag() {
		return fEmai_ExistFlag;
	}
	/***************************************************/
	/*-----------------------------------------------------------------------------------------------------*/
	// Set & Get properties -- END
	/*******************************************************************************************************/
}
