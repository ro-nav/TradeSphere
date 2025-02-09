package com.tradingapp.P04Crud.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.P04Crud.dto.AnalystDTO;
import com.tradingapp.P04Crud.entities.Stock;
import com.tradingapp.P04Crud.entities.User;
import com.tradingapp.P04Crud.services.AnalystService;
import com.tradingapp.P04Crud.services.StockService;
import com.tradingapp.P04Crud.services.UserService;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/crud/admin")
public class AdminController {

	@Autowired
	private UserService userService;

	@Autowired
	private AnalystService analystService;

	@Autowired
	private StockService stockService;

	@GetMapping("/analysts/unapproved")
	public ResponseEntity<List<AnalystDTO>> getUnapprovedAnalysts() {
		List<AnalystDTO> analysts = analystService.getUnapprovedAnalysts();

		if (analysts.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(analysts);
		}

		return ResponseEntity.ok(analysts);
	}

	@PutMapping("/approve-analyst/{analystId}")
	public ResponseEntity<String> approveAnalyst(@PathVariable Integer analystId) {
		try {
			String responseMessage = analystService.approveAnalyst(analystId);
			return ResponseEntity.ok(responseMessage);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Analyst not found with ID: " + analystId);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error approving analyst: " + e.getMessage());
		}
	}

	@PostMapping("/saveStock")
	public ResponseEntity<?> addStock(@RequestBody Stock stock) {
		try {
			String message = stockService.saveStock(stock);
			return ResponseEntity.status(HttpStatus.CREATED).body(message);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding stock");
		}
	}

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

	@DeleteMapping("/remove/{stockSymbol}")
	public ResponseEntity<String> removeStock(@PathVariable String stockSymbol) {
		try {
			String response = stockService.removeStock(stockSymbol);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers() {
		try {
			List<User> users = userService.getAllUsers();
			if (users.isEmpty()) {
				return ResponseEntity.noContent().build(); // No users found
			}
			return ResponseEntity.ok(users);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
