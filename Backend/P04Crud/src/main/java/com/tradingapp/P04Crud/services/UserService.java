package com.tradingapp.P04Crud.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tradingapp.P04Crud.dto.RegistrationDTO;
import com.tradingapp.P04Crud.dto.UpdateProfileDTO;
import com.tradingapp.P04Crud.entities.Analyst;
import com.tradingapp.P04Crud.entities.Role;
import com.tradingapp.P04Crud.entities.Specialization;
import com.tradingapp.P04Crud.entities.Trader;
import com.tradingapp.P04Crud.entities.User;
import com.tradingapp.P04Crud.repositiories.AnalystRepository;
import com.tradingapp.P04Crud.repositiories.RoleRepository;
import com.tradingapp.P04Crud.repositiories.SpecializationRepository;
import com.tradingapp.P04Crud.repositiories.TraderRepository;
import com.tradingapp.P04Crud.repositiories.UserRepository;

@Service
public class UserService {

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TraderRepository traderRepository;

	@Autowired
	private AnalystRepository analystRepository;

	@Autowired
	private SpecializationRepository specializationRepository;

	public String registerUser(RegistrationDTO dto) throws Exception {
		// Check if user already exists
		if (userRepository.findByUsername(dto.getUsername()) != null
				|| userRepository.findByEmail(dto.getEmail()) != null) {
			throw new IllegalArgumentException("User with the same username or email already exists");
		}

		// Get the role for the user (Trader or Analyst)
		Role role = roleRepository.findByType(dto.getRoleType());
		if (role == null) {
			throw new Exception("Invalid role type.");
		}

		// Create new user entity
		User user = new User();
		user.setUsername(dto.getUsername());
		user.setFname(dto.getFirstName());
		user.setLname(dto.getLastName());
		user.setContact(dto.getContactNumber());
		user.setEmail(dto.getEmail());
		user.setDob(dto.getDateOfBirth());
		user.setPan_card(dto.getPanCardNumber());
		user.setPasswordHash(dto.getPassword());
		user.setRole(role);

		// Save the user to the database
		userRepository.save(user);

		// Register as Trader or Analyst
		if ("Trader".equalsIgnoreCase(dto.getRoleType())) {
			Trader trader = new Trader();
			trader.setUser(user);
			trader.setAccNo(dto.getBankAccountNumber());
			trader.setIfsc(dto.getIfscCode());
			traderRepository.save(trader);
			return "Trader registered successfully";
		} else {
			Optional<Specialization> specialization = specializationRepository
					.findBySpecialization(dto.getSpecialization());
			if (specialization.isEmpty()) {
				throw new IllegalArgumentException("Invalid specialization");
			}
			Analyst analyst = new Analyst();
			analyst.setUser(user);
			analyst.setSpecialization(specialization.get());
			analystRepository.save(analyst);
			return "Analyst registered successfully";
		}
	}

	public String updateProfile(Integer userId, UpdateProfileDTO request) throws Exception {
		// Check if user exists
		User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));

		// Update user-level fields
		if (request.getUsername() != null && !request.getUsername().isEmpty()) {
			user.setUsername(request.getUsername());
		}

		if (request.getFname() != null && !request.getFname().isEmpty()) {
			user.setFname(request.getFname());
		}

		if (request.getLname() != null && !request.getLname().isEmpty()) {
			user.setLname(request.getLname());
		}

		if (request.getContact() != null && !request.getContact().isEmpty()) {
			user.setContact(request.getContact());
		}

		if (request.getEmail() != null && !request.getEmail().isEmpty()) {
			user.setEmail(request.getEmail());
		}

		if (request.getDob() != null) {
			user.setDob(request.getDob());
		}

		if (request.getPancard() != null && !request.getPancard().isEmpty()) {
			user.setPan_card(request.getPancard());
		}

		if (request.getPassword() != null && !request.getPassword().isEmpty()) {
			// Consider encrypting the password before setting it
			user.setPasswordHash(request.getPassword());
		}

		// Check user role and update respective details
		if (user.getRole().getType().equalsIgnoreCase("Analyst")) {
			Analyst analyst = analystRepository.findByUser(user);
			if (analyst != null) {
				if (request.getSpecialization() != null) {
					Specialization specialization = specializationRepository
							.findBySpecialization(request.getSpecialization())
							.orElseThrow(() -> new Exception("Specialization not found"));
					analyst.setSpecialization(specialization);
				}
				analystRepository.save(analyst);
			}
		} else if (user.getRole().getType().equalsIgnoreCase("Trader")) {
			Trader trader = traderRepository.findByUser(user);
			if (trader != null) {
				if (request.getAccNo() != null && !request.getAccNo().isEmpty()) {
					trader.setAccNo(request.getAccNo());
				}

				if (request.getIfsc() != null && !request.getIfsc().isEmpty()) {
					trader.setIfsc(request.getIfsc());
				}
				traderRepository.save(trader);
			}
		}

		user.setUpdatedAt(LocalDateTime.now());
		// Save the updated user to the database
		userRepository.save(user);

		return "Profile updated successfully.";
	}

	public RegistrationDTO getUserProfile(Integer userId) throws Exception {
		User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
		if (user == null) {
			throw new Exception("User with username " + userId + " not found");
		}
		Role role = roleRepository.findByType(user.getRole().getType());
		if (role == null) {
			throw new Exception("Role for user " + userId + " not found");
		}
		RegistrationDTO dto = new RegistrationDTO();
		dto.setUsername(user.getUsername());
		dto.setFirstName(user.getFname());
		dto.setLastName(user.getLname());
		dto.setContactNumber(user.getContact());
		dto.setEmail(user.getEmail());
		dto.setDateOfBirth(user.getDob());
		dto.setPanCardNumber(user.getPan_card());
		dto.setPassword(user.getPasswordHash());
		dto.setRoleType(role.getType());

		String roleType = role.getType();
		if ("Analyst".equalsIgnoreCase(roleType)) {
			Analyst analyst = analystRepository.findByUser(user);
			if (analyst != null) {
				dto.setSpecialization(analyst.getSpecialization().getSpecialization());
			}
		} else if ("Trader".equalsIgnoreCase(roleType)) {
			Trader trader = traderRepository.findByUser(user);
			if (trader != null) {
				dto.setBankAccountNumber(trader.getAccNo());
				dto.setIfscCode(trader.getIfsc());
			}
		}

		return dto;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

}
