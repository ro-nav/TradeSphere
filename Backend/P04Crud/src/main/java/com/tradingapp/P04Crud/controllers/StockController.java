package com.tradingapp.P04Crud.controllers;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.P04Crud.entities.Stock;
import com.tradingapp.P04Crud.services.StockService;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/crud/stocks")
public class StockController {

	@Autowired
	private StockService stockService;

	// Fetch all stocks
	@GetMapping("/getAllStocks")
	public ResponseEntity<?> getAllStocks() {
		try {
			List<Stock> stocks = stockService.getAllStocks();
			if (stocks.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No stocks available");
			}
			return ResponseEntity.ok(stocks);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching stocks");
		}
	}

	// Fetch a stock by ID
	@GetMapping("/getStockBySymbol/{stockSymbol}")
	public ResponseEntity<?> getStockBySymbol(@PathVariable String stockSymbol) {
		try {
			Stock stock = stockService.getStockBySymbol(stockSymbol);
			return ResponseEntity.ok(stock); // Return 200 OK if stock is found
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Stock with symbol '" + stockSymbol + "' not found");
		}
	}
	
	@PutMapping("/updateLtp/{stockSymbol}")
	public ResponseEntity<String> updateStockLtp(@PathVariable String stockSymbol, @RequestBody Map<String, Double> requestBody) {
	    try {
	        if (!requestBody.containsKey("ltp")) {
	            return ResponseEntity.badRequest().body("Missing 'ltp' field in request body");
	        }

	        double newLtp = requestBody.get("ltp");
	        String message = stockService.updateStockLtp(stockSymbol, newLtp);
	        
	        return ResponseEntity.ok(message);
	    } catch (NoSuchElementException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("An error occurred while updating stock LTP");
	    }
	}

}
