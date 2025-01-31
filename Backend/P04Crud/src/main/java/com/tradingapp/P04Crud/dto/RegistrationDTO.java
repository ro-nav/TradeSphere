package com.tradingapp.P04Crud.dto;

import java.sql.Date;

public class RegistrationDTO {
	private String username;

	private String firstName;

	private String lastName;

	private String contactNumber;

	private String email;

	private Date dateOfBirth;

	private String panCardNumber;

	private String password;

	private String roleType;

	// Trader-specific fields
	private String bankAccountNumber;
	private String ifscCode;

	// Analyst-specific fields
	private String specialization;

	public RegistrationDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RegistrationDTO(String username, String firstName, String lastName, String contactNumber, String email,
			Date dateOfBirth, String panCardNumber, String password, String roleType, String bankAccountNumber,
			String ifscCode, String specialization) {
		super();
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.contactNumber = contactNumber;
		this.email = email;
		this.dateOfBirth = dateOfBirth;
		this.panCardNumber = panCardNumber;
		this.password = password;
		this.roleType = roleType;
		this.bankAccountNumber = bankAccountNumber;
		this.ifscCode = ifscCode;
		this.specialization = specialization;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public java.sql.Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(java.sql.Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getPanCardNumber() {
		return panCardNumber;
	}

	public void setPanCardNumber(String panCardNumber) {
		this.panCardNumber = panCardNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
}
