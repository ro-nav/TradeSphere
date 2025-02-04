package com.tradingapp.P04Crud.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "traders")
public class Trader {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trader_id")
	private Integer traderId;

	@OneToOne()
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	@Column(name = "bank_account_number")
	private String accNo;

	@Column(name = "ifsc_code")
	private String ifsc;

	public Trader() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Trader(Integer traderId, User user, String accNo, String ifsc) {
		super();
		this.traderId = traderId;
		this.user = user;
		this.accNo = accNo;
		this.ifsc = ifsc;
	}

	public Integer getTraderId() {
		return traderId;
	}

	public void setTraderId(Integer traderId) {
		this.traderId = traderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

}
