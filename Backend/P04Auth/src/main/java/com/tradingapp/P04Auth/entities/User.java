package com.tradingapp.P04Auth.entities;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Integer userId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id")
	@JsonBackReference
	private Role role;

	@Column(name = "username")
	private String username;

	@Column(name = "first_name")
	private String fname;

	@Column(name = "last_name")
	private String lname;

	@Column(name = "contact_number")
	private String contact;

	@Column(name = "email")
	private String email;

	@Column(name = "date_of_birth")
	private Date dob;

	@Column(name = "pan_card_number")
	private String pan_card;

	@Column(name = "password_hash")
	private String passwordHash;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private Status status = Status.ACTIVE;

	@Column(name = "created_at")
	private LocalDateTime createdAt = LocalDateTime.now();

	@Column(name = "updated_at")
	private LocalDateTime updatedAt = LocalDateTime.now();

	@Column(name = "reset_token")
	private String resetToken;
	
	@Column(name = "token_expiry")
	private LocalDateTime tokenExpiry;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonBackReference
	private Set<Trader> Trader = new HashSet<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonBackReference
	private Set<Analyst> analysts = new HashSet<>();

	// Enum for Status
	public enum Status {
		ACTIVE, INACTIVE
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(Integer userId, Role role, String username, String fname, String lname, String contact, String email,
			Date dob, String pan_card, String passwordHash, Status status, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.userId = userId;
		this.role = role;
		this.username = username;
		this.fname = fname;
		this.lname = lname;
		this.contact = contact;
		this.email = email;
		this.dob = dob;
		this.pan_card = pan_card;
		this.passwordHash = passwordHash;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
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

	public String getPan_card() {
		return pan_card;
	}

	public void setPan_card(String pan_card) {
		this.pan_card = pan_card;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}

	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}
	
	public LocalDateTime getTokenExpiry() {
		return tokenExpiry;
	}

	public void setTokenExpiry(LocalDateTime tokenExpiry) {
		this.tokenExpiry = tokenExpiry;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	public Set<Trader> getTrader() {
		return Trader;
	}

	public void setTrader(Set<Trader> trader) {
		Trader = trader;
	}

	public Set<Analyst> getAnalysts() {
		return analysts;
	}

	public void setAnalysts(Set<Analyst> analysts) {
		this.analysts = analysts;
	}

	// Convenience method to add an analyst
	public void addAnalyst(Analyst analyst) {
		analysts.add(analyst);
		analyst.setUser(this);
	}

	// Convenience method to remove an analyst
	public void removeAnalyst(Analyst analyst) {
		analysts.remove(analyst);
		analyst.setUser(null);
	}
}
