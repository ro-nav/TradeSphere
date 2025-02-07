package com.tradingapp.P04Crud.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tradingapp.P04Crud.entities.Specialization;
import com.tradingapp.P04Crud.repositiories.SpecializationRepository;

@Service
public class SpecializationService {

	@Autowired
	private SpecializationRepository specializationRepository;

	public List<Specialization> getAllSpecializations() {
		return specializationRepository.findAll();
	}
}
