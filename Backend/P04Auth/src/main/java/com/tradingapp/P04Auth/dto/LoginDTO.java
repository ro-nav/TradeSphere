package com.tradingapp.P04Auth.dto;

public class LoginDTO {

	private String usernameOrEmail;
	private String password;

	public LoginDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LoginDTO(String usernameOrEmail, String password) {
		super();
		this.usernameOrEmail = usernameOrEmail;
		this.password = password;
	}

	public String getUsernameOrEmail() {
		return usernameOrEmail;
	}

	public void setUsernameOrEmail(String usernameOrEmail) {
		this.usernameOrEmail = usernameOrEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
