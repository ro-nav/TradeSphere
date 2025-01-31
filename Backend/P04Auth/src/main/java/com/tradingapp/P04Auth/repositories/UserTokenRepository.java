package com.tradingapp.P04Auth.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tradingapp.P04Auth.entities.UserToken;

import jakarta.transaction.Transactional;

public interface UserTokenRepository extends JpaRepository<UserToken, Integer> {
	Optional<UserToken> findByClientCode(String clientCode);

}