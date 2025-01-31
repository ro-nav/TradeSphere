package com.tradingapp.P04Crud.dto;

public class AnalystDTO {

	private Integer analystId;
	private String username;
	private String firstName;
	private String lastName;
	private String email;
	private String specialization;
	private Boolean isApproved;

	public AnalystDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AnalystDTO(Integer analystId, String username, String firstName, String lastName, String email,
			String specialization, Boolean isApproved) {
		super();
		this.analystId = analystId;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.specialization = specialization;
		this.isApproved = isApproved;
	}

	public Integer getAnalystId() {
		return analystId;
	}

	public void setAnalystId(Integer analystId) {
		this.analystId = analystId;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

}
