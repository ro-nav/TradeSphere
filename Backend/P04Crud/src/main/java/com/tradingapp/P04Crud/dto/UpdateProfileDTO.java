package com.tradingapp.P04Crud.dto;

import java.sql.Date;

public class UpdateProfileDTO {
	private String username;
	private String fname;
	private String lname;
	private String contact;
	private String email;
	private Date dob;
	private String pancard;
	private String password;

	private String accNo;
	private String ifsc;

	private String specialization;

	public UpdateProfileDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UpdateProfileDTO(String username, String fname, String lname, String contact, String email, Date dob,
			String pancard, String password, String accNo, String ifsc, String specialization) {
		super();
		this.username = username;
		this.fname = fname;
		this.lname = lname;
		this.contact = contact;
		this.email = email;
		this.dob = dob;
		this.pancard = pancard;
		this.password = password;
		this.accNo = accNo;
		this.ifsc = ifsc;
		this.specialization = specialization;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getPancard() {
		return pancard;
	}

	public void setPancard(String pancard) {
		this.pancard = pancard;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAccNo() {
		return accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	public String getIfsc() {
		return ifsc;
	}

	public void setIfsc(String ifsc) {
		this.ifsc = ifsc;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
}
