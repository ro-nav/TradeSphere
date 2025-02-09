package com.tradingapp.P04Crud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.P04Crud.dto.RegistrationDTO;
import com.tradingapp.P04Crud.dto.UpdateProfileDTO;
import com.tradingapp.P04Crud.services.UserService;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/crud/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody RegistrationDTO dto) {
		try {
			String message = userService.registerUser(dto);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PutMapping("/updateProfile/{userId}")
	public ResponseEntity<String> updateProfile(@PathVariable Integer userId, @RequestBody UpdateProfileDTO request) {
		try {
			String response = userService.updateProfile(userId, request);
			return ResponseEntity.ok(response); // Return a 200 OK response with success message
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
		}
	}

	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getUserProfile(@PathVariable Integer userId) {
		try {
			RegistrationDTO user = userService.getUserProfile(userId);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			// Log the error (optional)
			e.printStackTrace();

			// Return a 404 status if user or role is not found
			if (e.getMessage().contains("not found")) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}

			// Return a generic 500 error for other exceptions
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
		}
	}
}
