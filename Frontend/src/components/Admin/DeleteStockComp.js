import React, { useState, useEffect } from "react";

export default function ManageStocks() {
  const [stocks, setStocks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  // Fetch stocks from the database
  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:8043/api/admin/getAllStocks");
      if (response.ok) {
        const data = await response.json();
        setStocks(data);
      } else {
        setMessage("Failed to fetch stocks.");
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setMessage("Failed to connect to the server.");
    }
  };

  // Handle stock deletion
  const handleDelete = async (stockSymbol) => {
    if (!window.confirm(`Are you sure you want to delete stock ${stockSymbol}?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8043/api/admin/remove/${stockSymbol}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage(`Stock ${stockSymbol} deleted successfully.`);
        // Remove the deleted stock from the state
        setStocks(stocks.filter((stock) => stock.stockSymbol !== stockSymbol));
      } else {
        const errorResponse = await response.json();
        setMessage(errorResponse.message || "Failed to delete the stock.");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="manage-stocks-container">
      <h3>Manage Stocks</h3>
      {message && <div className="alert alert-info">{message}</div>}

      {stocks.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Stock Symbol</th>
              <th>Stock Token</th>
              <th>Exchange Type</th>
              <th>LTP</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.stockSymbol}>
                <td>{stock.stockSymbol}</td>
                <td>{stock.stockToken}</td>
                <td>{stock.exchangeType}</td>
                <td>{stock.ltp}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(stock.stockSymbol)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stocks available.</p>
      )}
    </div>
  );
}
