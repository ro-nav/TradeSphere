import React, { useState } from "react";
import "./UpdateStocksComp.css"; // Add a CSS file for custom styles

export default function UpdateStock() {
  const [stockData, setStockData] = useState({
    stockSymbol: "",
    stockToken: "",
    exchangeType: "",
    ltp: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockData({ ...stockData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (stockData.exchangeType !== "NSE" && stockData.exchangeType !== "BSE") {
      setMessage("Only NSE and BSE are allowed for Exchange Type.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8040/crud/admin/saveStock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stockData),
        }
      );

      if (response.ok) {
        setMessage("Stock added successfully!");
        setIsSuccess(true);
        setStockData({
          stockSymbol: "",
          stockToken: "",
          exchangeType: "",
          ltp: "",
        });
      } else {
        setMessage("Stock already present!");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server. Please try again later.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="update-stock-container d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Add Stocks</h2>
        <form onSubmit={handleSubmit} className="update-stock-form">
          <div className="mb-3">
            <label className="form-label">Stock Symbol</label>
            <input
              type="text"
              className="form-control"
              name="stockSymbol"
              value={stockData.stockSymbol}
              onChange={handleChange}
              placeholder="Enter stock symbol"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock Token</label>
            <input
              type="text"
              className="form-control"
              name="stockToken"
              value={stockData.stockToken}
              onChange={handleChange}
              placeholder="Enter stock token"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Exchange Type (NSE/BSE)</label>
            <input
              type="text"
              className="form-control"
              name="exchangeType"
              value={stockData.exchangeType}
              onChange={handleChange}
              placeholder="Enter exchange type (NSE/BSE)"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">LTP (Last Traded Price)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="ltp"
              value={stockData.ltp}
              onChange={handleChange}
              placeholder="Enter LTP"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Stock
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-3 ${
              isSuccess ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
