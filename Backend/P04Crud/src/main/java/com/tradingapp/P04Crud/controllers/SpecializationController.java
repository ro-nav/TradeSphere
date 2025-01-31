package com.tradingapp.P04Crud.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.P04Crud.entities.Specialization;
import com.tradingapp.P04Crud.services.SpecializationService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/spec")
public class SpecializationController {

	@Autowired
	private SpecializationService specializationService;

	@GetMapping("/getAll")
	public ResponseEntity<List<Specialization>> getAllDoctors() {
		return ResponseEntity.ok(specializationService.getAllSpecialization());
	}
}
