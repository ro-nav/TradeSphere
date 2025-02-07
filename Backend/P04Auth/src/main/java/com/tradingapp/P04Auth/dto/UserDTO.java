package com.tradingapp.P04Auth.dto;

public class UserDTO {
	private Integer userid;
	private String username;
	private String email;
	private String role;
	private String jwtToken;
	private boolean isApproved;

	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserDTO(Integer userid, String username, String email, String role, String jwtToken) {
		super();
		this.userid = userid;
		this.username = username;
		this.email = email;
		this.role = role;
		this.jwtToken = jwtToken;
	}

	public UserDTO(Integer userid, String username, String email, String role, boolean isApproved, String jwtToken) {
		super();
		this.userid = userid;
		this.username = username;
		this.email = email;
		this.role = role;
		this.jwtToken = jwtToken;
		this.isApproved = isApproved;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

}
