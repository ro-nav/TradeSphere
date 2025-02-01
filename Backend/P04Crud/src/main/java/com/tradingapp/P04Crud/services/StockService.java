package com.tradingapp.P04Crud.services;

import java.util.List;

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
}
