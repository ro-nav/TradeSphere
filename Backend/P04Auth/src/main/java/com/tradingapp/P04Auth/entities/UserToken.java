package com.tradingapp.P04Auth.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_tokens")
public class UserToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "client_code")
	private String clientCode;

	@Column(name = "jwt_token", columnDefinition = "TEXT")
	private String jwtToken;

	@Column(name = "refresh_token", columnDefinition = "TEXT")
	private String refreshToken;

	@Column(name = "feed_token", columnDefinition = "TEXT")
	private String feedToken;

	@Column(name = "created_at")
	private LocalDateTime createdAt = LocalDateTime.now();

	public UserToken() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserToken(Integer id, String clientCode, String jwtToken, String refreshToken, String feedToken,
			LocalDateTime createdAt) {
		super();
		this.id = id;
		this.clientCode = clientCode;
		this.jwtToken = jwtToken;
		this.refreshToken = refreshToken;
		this.feedToken = feedToken;
		this.createdAt = createdAt;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getClientCode() {
		return clientCode;
	}

	public void setClientCode(String clientCode) {
		this.clientCode = clientCode;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getFeedToken() {
		return feedToken;
	}

	public void setFeedToken(String feedToken) {
		this.feedToken = feedToken;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}
