import React, { useState } from "react";

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
    setMessage(""); // Clear previous messages
    setIsSuccess(false);

    // Validate Exchange Type
    if (stockData.exchangeType !== "NSE" && stockData.exchangeType !== "BSE") {
      setMessage("Only NSE and BSE are allowed for Exchange Type.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8043/api/admin/saveStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockData),
      });

      if (response.ok) {
        setMessage("Stock added successfully!");
        setIsSuccess(true);
        setStockData({ stockSymbol: "", stockToken: "", exchangeType: "", ltp: "" }); // Clear form
      }else {
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
    <div className="update-stock-container">
      <h2 className="text-center">Update Stocks</h2>
      <form onSubmit={handleSubmit} className="update-stock-form">
        <div className="mb-3">
          <label className="form-label">Stock Symbol</label>
          <input
            type="text"
            className="form-control"
            name="stockSymbol"
            value={stockData.stockSymbol}
            onChange={handleChange}
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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Stock
        </button>
      </form>

      {/* Message Section */}
      {message && (
        <div
          className={`alert mt-3 ${isSuccess ? "alert-success" : "alert-danger"}`}
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}
