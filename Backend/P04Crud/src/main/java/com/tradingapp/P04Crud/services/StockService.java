package com.tradingapp.P04Crud.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tradingapp.P04Crud.entities.Stock;
import com.tradingapp.P04Crud.repositiories.StockRepository;

@Service
public class StockService {

	@Autowired
	private StockRepository stockRepository;

	// Fetch all stocks
	public List<Stock> getAllStocks() {
		return stockRepository.findAll();
	}

	// Fetch stock by symbol
	public Stock getStockBySymbol(String stockSymbol) throws Exception {
		return stockRepository.findByStockSymbol(stockSymbol)
				.orElseThrow(() -> new Exception("Stock with symbol '" + stockSymbol + "' not found"));
	}

	public String saveStock(Stock stock) {
	    Optional<Stock> existingStock = stockRepository.findByStockSymbol(stock.getStockSymbol());
	    
	    if (existingStock.isPresent()) {
	        throw new IllegalArgumentException("Stock with the same symbol already exists");
	    }
	    
	    stockRepository.save(stock);
	    return "New Stock added successfully";
	}
	
	public String updateStockLtp(String stockSymbol, double newLtp) {
	    Stock stock = stockRepository.findByStockSymbol(stockSymbol)
	            .orElseThrow(() -> new NoSuchElementException("Stock not found with ID: " + stockSymbol));

	    stock.setLtp(newLtp);
	    stockRepository.save(stock);
	    
	    return "Stock LTP updated successfully";
	}

	public String removeStock(String stockSymbol) {
        Stock stock = stockRepository.findByStockSymbol(stockSymbol)
                .orElseThrow(() -> new NoSuchElementException("Stock with symbol '" + stockSymbol + "' not found"));
        
        stockRepository.delete(stock);
        return "Stock removed successfully";
    }
	
}
