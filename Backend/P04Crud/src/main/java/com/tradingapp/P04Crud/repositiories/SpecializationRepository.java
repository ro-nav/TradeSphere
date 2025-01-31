package com.tradingapp.P04Crud.repositiories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tradingapp.P04Crud.entities.Specialization;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Integer> {

	Optional<Specialization> findBySpecialization(String specialization);

}