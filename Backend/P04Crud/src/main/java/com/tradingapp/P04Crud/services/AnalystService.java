package com.tradingapp.P04Crud.services;

import java.util.ArrayList;
import java.util.List;
//import java.util.stream.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tradingapp.P04Crud.dto.AnalystDTO;
import com.tradingapp.P04Crud.entities.Analyst;
import com.tradingapp.P04Crud.repositiories.AnalystRepository;

@Service
public class AnalystService {

	@Autowired
	private AnalystRepository analystRepository;

	public List<AnalystDTO> getUnapprovedAnalysts() {
		List<Analyst> unapprovedAnalysts = analystRepository.findByIsApprovedFalse();
		List<AnalystDTO> list = new ArrayList<>();

		for (Analyst a : unapprovedAnalysts) {
			AnalystDTO obj = new AnalystDTO();
			obj.setAnalystId(a.getAnalystId());
			obj.setUsername(a.getUser().getUsername());
			obj.setFirstName(a.getUser().getFname());
			obj.setLastName(a.getUser().getLname());
			obj.setEmail(a.getUser().getEmail());

			// Handle potential null for specialization
			obj.setSpecialization(a.getSpecialization() != null ? a.getSpecialization().getSpecialization() : null);

			obj.setIsApproved(a.getIsApproved());

			list.add(obj); // Add the object to the list
		}

		return list;
	}

	// Method for admin to approve an analyst
	public String approveAnalyst(Integer analystId) {
		try {
			// Find the analyst by ID
			Analyst analyst = analystRepository.findById(analystId)
					.orElseThrow(() -> new Exception("Analyst not found."));

			// Check if the analyst is already approved
			if (analyst.getIsApproved()) {
				return "Analyst is already approved.";
			}

			// Update the approval status
			analyst.setIsApproved(true);

			// Save the updated analyst
			analystRepository.save(analyst);

			return "Analyst approved successfully.";
		} catch (Exception e) {
			return "Error approving analyst: " + e.getMessage();
		}
	}

	public Analyst findByUsername(Integer analystId) {
		return analystRepository.findById(analystId).orElseThrow(() -> new RuntimeException("Analyst not found"));
	}
}