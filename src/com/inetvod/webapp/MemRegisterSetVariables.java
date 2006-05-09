/**
 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
 * Confidential and Proprietary
 * See Legal.txt for additional notices.
 */

/*
 * Class		:		MemRegisterSetVariables 
 * Purpose		:		Set properties 
 */

package com.inetvod.webapp;

public class MemRegisterSetVariables implements java.io.Serializable
{
	/*******************************************************************************************************/
	// Set & Get properties -- START
	/*-----------------------------------------------------------------------------------------------------*/
	private String page_Redirect;
	public void setPage_Redirect(String page_Redirect) {
		this.page_Redirect = page_Redirect;
	}

	public String getPage_Redirect() {
		return page_Redirect;
	}

	/***************************************************/
	private String member_id;
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}

	public String getMember_id() {
		return member_id ;
	}
	/***************************************************/

	/***************************************************/
	private String email_id;
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	public String getEmail_id() {
		return email_id;
	}
	/***************************************************/

	/***************************************************/
	private String password_id;
	public void setPassword_id(String password_id) {
		this.password_id = password_id;
	}

	public String getPassword_id() {
		return password_id;
	}
	/***************************************************/

	/***************************************************/
	private String secret_question;
	public void setSecret_question(String secret_question) {
		this.secret_question = secret_question;
	}

	public String getSecret_question() {
		return secret_question;
	}
	/***************************************************/

	/***************************************************/
	private String secret_answer;
	public void setSecret_answer(String secret_answer) {
		this.secret_answer = secret_answer;
	}

	public String getSecret_answer() {
		return secret_answer;
	}
	/***************************************************/

	/***************************************************/
	private String first_name;
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getFirst_name() {
		return first_name;
	}
	/***************************************************/

	/***************************************************/
	private String last_name;
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getLast_name() {
		return last_name;
	}
	/***************************************************/

	/***************************************************/
	private String address_1;
	public void setAddress_1(String address_1) {
		this.address_1 = address_1;
	}

	public String getAddress_1() {
		return address_1;
	}
	/***************************************************/

	/***************************************************/
	private String address_2;
	public void setAddress_2(String address_2) {
		this.address_2 = address_2;
	}

	public String getAddress_2() {
		return address_2;
	}
	/***************************************************/

	/***************************************************/
	private String city;
	public void setCity(String city) {
		this.city = city;
	}

	public String getCity() {
		return city;
	}
	/***************************************************/

	/***************************************************/
	private String state;
	public void setState(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}
	/***************************************************/

	/***************************************************/
	private String zip;
	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getZip() {
		return zip;
	}
	/***************************************************/

	/***************************************************/
	private String country_id;
	public void setCountry_id(String country_id) {
		this.country_id = country_id;
	}

	public String getCountry_id() {
		return country_id;
	}
	/***************************************************/

	/***************************************************/
	private String phone;
	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPhone() {
		return phone;
	}
	/***************************************************/

	/***************************************************/
	private String name_on_card;
	public void setName_on_card(String name_on_card) {
		this.name_on_card = name_on_card;
	}

	public String getName_on_card() {
		return name_on_card;
	}
	/***************************************************/

	/***************************************************/
	private String card_type;
	public void setCard_type(String card_type) {
		this.card_type = card_type;
	}

	public String getCard_type() {
		return card_type;
	}
	/***************************************************/

	/***************************************************/
	private String card_number;
	public void setCard_number(String card_number) {
		this.card_number = card_number;
	}

	public String getCard_number() {
		return card_number;
	}
	/***************************************************/

	/***************************************************/
	private String exp_month;
	public void setExp_month(String exp_month) {
		this.exp_month = exp_month;
	}

	public String getExp_month() {
		return exp_month;
	}
	/***************************************************/

	/***************************************************/
	private String exp_year;
	public void setExp_year(String exp_year) {
		this.exp_year = exp_year;
	}

	public String getExp_year() {
		return exp_year;
	}
	/***************************************************/

	/***************************************************/
	private String security_code;
	public void setSecurity_code(String security_code) {
		this.security_code = security_code;
	}

	public String getSecurity_code() {
		return security_code;
	}
	/***************************************************/

	/***************************************************/
	private String include_adult;
	public void setInclude_adult(String include_adult) {
		this.include_adult = include_adult;
	}

	public String getInclude_adult() {
		return include_adult;
	}
	/***************************************************/

	/***************************************************/
	private String adult_pin;
	public void setAdult_pin(String adult_pin) {
		this.adult_pin = adult_pin;
	}

	public String getAdult_pin() {
		return adult_pin;
	}
	/***************************************************/

	/***************************************************/
	private String birth_date;
	public void setBirth_date(String birth_date) {
		this.birth_date = birth_date;
	}

	public String getBirth_date() {
		return birth_date;
	}
	/***************************************************/

	/***************************************************/
	private String [] rating;
	public void setRating(String [] rating) {
		this.rating = rating;
	}

	public String [] getRating() {
		return rating;
	}

	/***************************************************/

	/***************************************************/
	private boolean download;
	public void setDownload(boolean download) {
		this.download = download;
	}

	public boolean getDownload() {
		return download;
	}
	/***************************************************/

	/***************************************************/
	private boolean streaming;
	public void setStreaming(boolean streaming) {
		this.streaming = streaming;
	}

	public boolean getStreaming() {
		return streaming;
	}
	/***************************************************/

	/***************************************************/
	private String speed;
	public void setSpeed(String speed) {
		this.speed = speed;
	}

	public String getSpeed() {
		return speed;
	}
	/***************************************************/

	/***************************************************/
	private String pin;
	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getPin() {
		return pin;
	}
	/***************************************************/

	/***************************************************/
	private String player_logon;
	public void setPlayer_logon(String player_logon) {
		this.player_logon = player_logon;
	}

	public String getPlayer_logon() {
		return player_logon;
	}
	/***************************************************/

	/***************************************************/
	private String parental_details;
	public void setParental_details(String parental_details) {
		this.parental_details = parental_details;
	}

	public String getParental_details() {
		return parental_details;
	}
	/***************************************************/

	/***************************************************/
	private String ratingId;
	public void setRatingId(String ratingId) {
		this.ratingId = ratingId;
	}

	public String getRatingId() {
		return ratingId;
	}
	/***************************************************/

	/***************************************************/
	private String str_date;
	public void setStr_date(String str_date) {
		this.str_date = str_date;
	}

	public String getStr_date() {
		return str_date;
	}
	/***************************************************/

	/***************************************************/
	private String [] quest_ans;
	public void setQuest_ans(String [] quest_ans) {
		this.quest_ans = quest_ans;
	}

	public String [] getQuest_ans() {
		return quest_ans;
	}
	/***************************************************/

	/***************************************************/
	private boolean flag;
	public void setFlag(boolean flag) {
		this.flag = flag;
	}

	public boolean getFlag() {
		return flag;
	}
	/***************************************************/

	/***************************************************/
	private boolean error_flag;
	public void setError_flag(boolean error_flag) {
		this.error_flag = error_flag;
	}

	public boolean getError_flag() {
		return error_flag;
	}
	/***************************************************/

	/***************************************************/
	private boolean email_Exist_Flag;
	public void setEmail_Exist_Flag(boolean email_Exist_Flag) {
		this.email_Exist_Flag = email_Exist_Flag;
	}

	public boolean getEmail_Exist_Flag() {
		return email_Exist_Flag;
	}
	/***************************************************/
	/*-----------------------------------------------------------------------------------------------------*/
	// Set & Get properties -- END
	/*******************************************************************************************************/
}
