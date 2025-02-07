package com.tradingapp.P04Crud.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "specialization")
public class Specialization {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "specialization_id")
	private Integer specializationId;

	@Column(name = "specialization_name")
	private String specialization;

	@OneToMany(mappedBy = "specialization")
	@JsonBackReference
	private Set<Analyst> analysts = new HashSet<>();

	public Specialization() {
	}

	public Specialization(String specialization) {
		this.specialization = specialization;
	}

	public Integer getSpecializationId() {
		return specializationId;
	}

	public void setSpecializationId(Integer specializationId) {
		this.specializationId = specializationId;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public Set<Analyst> getAnalysts() {
		return analysts;
	}

	public void setAnalysts(Set<Analyst> analysts) {
		this.analysts = analysts;
	}

	public void addAnalyst(Analyst analyst) {
		analysts.add(analyst);
		analyst.setSpecialization(this);
	}

	public void removeAnalyst(Analyst analyst) {
		analysts.remove(analyst);
		analyst.setSpecialization(null);
	}

}