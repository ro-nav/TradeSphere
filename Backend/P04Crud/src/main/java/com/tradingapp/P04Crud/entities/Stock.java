package com.tradingapp.P04Crud.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stocks")
public class Stock {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "stock_id")
	private int stockId;

	@Column(name = "stock_symbol")
	private String stockSymbol;

	@Column(name = "stock_token")
	private int stockToken;

	@Column(name = "exchange_type")
	private String exchangeType;

	@Column(name = "ltp")
	private double ltp;

	public Stock() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Stock(int stockId, String stockSymbol, int stockToken, String exchangeType, double ltp) {
		super();
		this.stockId = stockId;
		this.stockSymbol = stockSymbol;
		this.stockToken = stockToken;
		this.exchangeType = exchangeType;
		this.ltp = ltp;
	}

	public int getStockId() {
		return stockId;
	}

	public void setStockId(int stockId) {
		this.stockId = stockId;
	}

	public String getStockSymbol() {
		return stockSymbol;
	}

	public void setStockSymbol(String stockSymbol) {
		this.stockSymbol = stockSymbol;
	}

	public int getStockToken() {
		return stockToken;
	}

	public void setStockToken(int stockToken) {
		this.stockToken = stockToken;
	}

	public String getExchangeType() {
		return exchangeType;
	}

	public void setExchangeType(String exchangeType) {
		this.exchangeType = exchangeType;
	}

	public double getLtp() {
		return ltp;
	}

	public void setLtp(double ltp) {
		this.ltp = ltp;
	}

}
