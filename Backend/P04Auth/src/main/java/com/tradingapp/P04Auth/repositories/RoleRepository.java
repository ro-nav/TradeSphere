package com.tradingapp.P04Auth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tradingapp.P04Auth.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    // Find a role by its type (e.g., Trader, Analyst)
    Role findByType(String type);
}