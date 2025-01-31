package com.tradingapp.P04Crud.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.P04Crud.dto.AnalystDTO;
import com.tradingapp.P04Crud.services.AnalystService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private AnalystService analystService;

	@GetMapping("/analysts/unapproved")
	public List<AnalystDTO> getUnapprovedAnalysts() {
		return analystService.getUnapprovedAnalysts();
	}

	@PutMapping("/approve-analyst/{analystId}")
	public String approveAnalyst(@PathVariable Integer analystId) {
		try {
			return analystService.approveAnalyst(analystId);
		} catch (Exception e) {
			return "Error approving analyst: " + e.getMessage();
		}
	}
}
