package com.tradingapp.P04Auth.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tradingapp.P04Auth.entities.UserToken;

@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, Integer> {
	Optional<UserToken> findByClientCode(String clientCode);

}