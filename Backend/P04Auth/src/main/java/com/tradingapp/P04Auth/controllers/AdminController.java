package com.tradingapp.P04Auth.controllers;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.P04Auth.entities.UserToken;
import com.tradingapp.P04Auth.repositories.UserTokenRepository;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth/admin")
public class AdminController {

	@Autowired
	private UserTokenRepository userTokenRepository;

	@PostMapping("/saveToken")
	public ResponseEntity<String> saveOrUpdateTokens(@RequestBody UserToken userToken) {
		Optional<UserToken> existingToken = userTokenRepository.findByClientCode(userToken.getClientCode());

		if (existingToken.isPresent()) {
			UserToken tokenToUpdate = existingToken.get();
			tokenToUpdate.setJwtToken(userToken.getJwtToken());
			tokenToUpdate.setRefreshToken(userToken.getRefreshToken());
			tokenToUpdate.setFeedToken(userToken.getFeedToken());
			tokenToUpdate.setCreatedAt(LocalDateTime.now());
			userTokenRepository.save(tokenToUpdate);
		} else {
			userTokenRepository.save(userToken);
		}

		return ResponseEntity.ok("Tokens saved/updated successfully");
	}

}
