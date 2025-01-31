package com.tradingapp.P04Crud.repositiories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tradingapp.P04Crud.entities.Trader;
import com.tradingapp.P04Crud.entities.User;

@Repository
public interface TraderRepository extends JpaRepository<Trader, Integer> {
	// Custom query methods can be added if needed
	Trader findByAccNo(String accNo);

	Trader findByUser(User user);
}
