package com.tradingapp.P04Crud.repositiories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tradingapp.P04Crud.entities.Analyst;
import com.tradingapp.P04Crud.entities.Specialization;
import com.tradingapp.P04Crud.entities.User;


@Repository
public interface AnalystRepository extends JpaRepository<Analyst, Integer> {
	// Custom method to find an analyst by their associated user
	Analyst findByUser(User user);

	// Custom query methods can be added if needed
	Analyst findBySpecialization(Specialization specialization);

	@Query(value = "SELECT * FROM analysts WHERE is_approved = false", nativeQuery = true)
	List<Analyst> findByIsApprovedFalse();
}
