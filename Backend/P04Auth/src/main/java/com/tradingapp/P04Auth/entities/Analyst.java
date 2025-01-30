package com.tradingapp.P04Auth.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "analysts")
public class Analyst {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "analyst_id")
	private Integer analystId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "specialization_id")
	@JsonBackReference
	private Specialization specialization;

	@Column(name = "is_approved")
	private Boolean isApproved = false;

	public Analyst() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Analyst(Integer analystId, User user, Specialization specialization, Boolean isApproved) {
		super();
		this.analystId = analystId;
		this.user = user;
		this.specialization = specialization;
		this.isApproved = isApproved;
	}

	public Integer getAnalystId() {
		return analystId;
	}

	public void setAnalystId(Integer analystId) {
		this.analystId = analystId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Specialization getSpecialization() {
		return specialization;
	}

	public void setSpecialization(Specialization specialization) {
		this.specialization = specialization;
	}

	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

}
