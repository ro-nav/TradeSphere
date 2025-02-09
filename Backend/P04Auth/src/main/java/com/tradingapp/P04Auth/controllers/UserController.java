package com.tradingapp.P04Auth.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.P04Auth.dto.LoginDTO;
import com.tradingapp.P04Auth.dto.UserDTO;
import com.tradingapp.P04Auth.services.UserService;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO request) {
		try {
			UserDTO user = userService.loginUser(request);
			return ResponseEntity.ok(user); // Return 200 OK with user details
		} catch (Exception e) {
			// Standardized error response
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("error", "Authentication failed", "details", e.getMessage()));
		}
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String response = userService.forgotPassword(email);
		return ResponseEntity.ok(Map.of("message", response));
	}

	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
		String token = request.get("token");
		String newPassword = request.get("newPassword");
		String response = userService.resetPassword(token, newPassword);

		if (response.equals("Password has been reset successfully.")) {
			return ResponseEntity.ok(Map.of("message", response));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", response));
		}
	}
}
