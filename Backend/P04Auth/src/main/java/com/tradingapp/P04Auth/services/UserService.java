package com.tradingapp.P04Auth.services;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tradingapp.P04Auth.dto.LoginDTO;
import com.tradingapp.P04Auth.dto.UserDTO;
import com.tradingapp.P04Auth.entities.Analyst;
import com.tradingapp.P04Auth.entities.User;
import com.tradingapp.P04Auth.entities.UserToken;
import com.tradingapp.P04Auth.repositories.AnalystRepository;
import com.tradingapp.P04Auth.repositories.UserRepository;
import com.tradingapp.P04Auth.repositories.UserTokenRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AnalystRepository analystRepository;

	@Autowired
	UserTokenRepository userTokenRepository;

	@Autowired
	private JavaMailSender mailSender;

//	@Autowired
//	private PasswordEncoder passwordEncoder; // For encrypting passwords

	public UserDTO loginUser(LoginDTO request) throws Exception {
		// Find the user by username or email
		User user = userRepository.findByUsernameOrEmail(request.getUsernameOrEmail(), request.getUsernameOrEmail());

		if (user == null) {
			throw new Exception("User not found.");
		}

		// Check if the password matches (for now, we will directly compare the
		// password)
		if (!user.getPasswordHash().equals(request.getPassword())) {
			throw new Exception("Invalid credentials.");
		}

		Optional<UserToken> token = userTokenRepository.findByClientCode("AAAC496985");
		if (token.isEmpty()) {
			throw new Exception("Token not found.");
		}
		// Assuming we are just returning a success message for now (JWT can be
		// implemented later)
		if (user.getRole().getType().equalsIgnoreCase("Analyst")) {
			Analyst analyst = analystRepository.findByUser(user);
			return new UserDTO(user.getUserId(), user.getUsername(), user.getEmail(), user.getRole().getType(),
					analyst.getIsApproved(), token.get().getJwtToken());
		} else {
			return new UserDTO(user.getUserId(), user.getUsername(), user.getEmail(), user.getRole().getType(),
					token.get().getJwtToken());
		}
	}

	public String forgotPassword(String email) {
		Optional<User> userOpt = userRepository.findByEmail(email);

		if (userOpt.isEmpty()) {
			return "User with this email does not exist";
		}

		User user = userOpt.get();
		String token = UUID.randomUUID().toString(); // Generate unique token

		// Store token in the user entity (Assuming you add a column for resetToken)
		user.setResetToken(token);
		user.setTokenExpiry(LocalDateTime.now().plusMinutes(10));
		userRepository.save(user);

		// Send email with reset link
		String resetOTP = "\n\nOTP: " + token;
		sendResetEmail(user.getEmail(), resetOTP);

		return "Password reset link sent to your email.";
	}

	private void sendResetEmail(String email, String resetOTP) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("Reset Your Password");
		message.setText("Use the OTP to reset your password: " + resetOTP);
		mailSender.send(message);
	}

	public String resetPassword(String token, String newPassword) {
		Optional<User> userOpt = userRepository.findByResetToken(token);

		if (userOpt.isEmpty()) {
			return "Invalid or expired token.";
		}

		User user = userOpt.get();

		// Check if the token is expired
		if (user.getTokenExpiry().isBefore(LocalDateTime.now())) {
			user.setResetToken(null);
			user.setTokenExpiry(null);
		} else {
			user.setPasswordHash(newPassword); // Encrypt the new password
			user.setResetToken(null);
			user.setTokenExpiry(null);
		}
		userRepository.save(user);

		return user.getResetToken() == null ? "Token has expired. Please request a new reset link."
				: "Password has been reset successfully.";
	}

}
