package com.tradingapp.P04Auth.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tradingapp.P04Auth.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	// Find a user by their username
	User findByUsername(String username);

	// Find a user by their email
//	User findByEmail(String email);

	User findByUsernameOrEmail(String username, String email);

	Optional<User> findByEmail(String email);

	Optional<User> findByResetToken(String resetToken);
}
