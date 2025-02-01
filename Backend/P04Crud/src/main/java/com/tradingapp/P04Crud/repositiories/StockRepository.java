package com.tradingapp.P04Crud.repositiories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tradingapp.P04Crud.entities.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {
	// Custom query methods can be added here

	// Custom query method to find stock by stock symbol
	Optional<Stock> findByStockSymbol(String stockSymbol);
}
