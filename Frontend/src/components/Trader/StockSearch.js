import { useState, useEffect } from "react";

export default function StockSearch() {
  const [stockName, setStockName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stockDetails, setStockDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch and store all stocks in local storage
    fetch("http://localhost:8043/api/stocks/getAllStocks")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("stocks", JSON.stringify(data));
      })
      .catch((error) => console.error("Error fetching stock list:", error));
  }, []);

  const handleSearch = async () => {
    if (!stockName.trim()) {
      setError("Please enter a stock symbol.");
      setStockDetails(null);
      return;
    }
  
    try {
      const storedStocks = JSON.parse(localStorage.getItem("stocks") || "[]");
      const matchingStock = storedStocks.find(
        (stock) => stock.stockSymbol === stockName.toUpperCase()
      );
  
      if (!matchingStock) {
        setError("Stock symbol not found in stored stocks.");
        setStockDetails(null);
        return;
      }
  
      // API request to fetch stock data from AngelOne
      const response = await fetch("https://apiconnect.angelone.in/rest/secure/angelbroking/market/v1/quote/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-UserType": "USER",
          "X-SourceID": "WEB",
          "X-ClientLocalIP": "192.168.42.210",
          "X-ClientPublicIP": "2402:3a80:45f9:ea3a:954f:c9e2:53b1:38f9",
          "X-MACAddress": "EC-2E-98-DE-C3-7F",
          "X-PrivateKey": "52sQhmK0",
          "Accept": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkFBQUM0OTY5ODUiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwidG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlYM1I1Y0dVaU9pSmpiR2xsYm5RaUxDSjBiMnRsYmw5MGVYQmxJam9pZEhKaFpHVmZZV05qWlhOelgzUnZhMlZ1SWl3aVoyMWZhV1FpT2pFd01pd2ljMjkxY21ObElqb2lNeUlzSW1SbGRtbGpaVjlwWkNJNkltUm1ZV1ZqTkRCbUxUZ3pZMlV0TXpCak5pMWhObUl6TFRSa01tWXdZbU0zTVdJMU1TSXNJbXRwWkNJNkluUnlZV1JsWDJ0bGVWOTJNU0lzSW05dGJtVnRZVzVoWjJWeWFXUWlPakV3TWl3aWNISnZaSFZqZEhNaU9uc2laR1Z0WVhRaU9uc2ljM1JoZEhWeklqb2lZV04wYVhabEluMHNJbTFtSWpwN0luTjBZWFIxY3lJNkltRmpkR2wyWlNKOWZTd2lhWE56SWpvaWRISmhaR1ZmYkc5bmFXNWZjMlZ5ZG1salpTSXNJbk4xWWlJNklrRkJRVU0wT1RZNU9EVWlMQ0psZUhBaU9qRTNNemc1T0RjME1qVXNJbTVpWmlJNk1UY3pPRGt3TURnME5Td2lhV0YwSWpveE56TTRPVEF3T0RRMUxDSnFkR2tpT2lJek5ETXdaalF3WWkxbE5EVmpMVFJqTjJZdE9XWm1NUzFoTlRZM1pHVmxabVkyTVdZaUxDSlViMnRsYmlJNklpSjkuU1JzTi1jdFR5eGhBTC1lMmwtMlRtRnpub1JGVzFVaURRb3RQUFE5aGFXSENvdkMxd1dMT0JaYkhXZjYzQzZRNmNIUng3T2xLZ3JGWTFBSTRDTkNCenRLZUlEOTVvbmRFejB2dDgtUGZfaS1pRXMzNjRLMXQzQWd0VGRRLXlSb21HenVfZm1hYUNtdUlJLXNXdGNncEtVN3d1ZnhXRTlJOTd4R0xtNFhySUdJIiwiQVBJLUtFWSI6IjUyc1FobUswIiwiaWF0IjoxNzM4OTAxMDI1LCJleHAiOjE3Mzg5ODc0MjV9.fxUiDB4tCxixfDltgW8bMo1LiNpdormB__PIRZl7RidzCId5leLhrJ7v4yblC0EaEgkYTeiytlcA9943m99MtQ",
        },
        body: JSON.stringify({
          mode: "LTP",
          exchangeTokens: { NSE: [matchingStock.stockToken] },
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch stock details from API.");
      }
  
      const data = await response.json();
      console.log("API Response Data:", data);
  
      if (data.status && data.data?.fetched?.length > 0) {
        const stockData = data.data.fetched[0];
        setStockDetails({
          stockSymbol: stockData.tradingSymbol,
          stockToken: stockData.symbolToken,
          exchangeType: stockData.exchange,
          ltp: stockData.ltp,
        });
        setError(null);
      } else {
        setStockDetails(null);
        setError("No live data found for the stock.");
      }
    } catch (error) {
      console.error("Error fetching stock details:", error);
      setStockDetails(null);
      setError("Failed to fetch stock details. Please try again.");
    }
  };
  

  // Show suggestions from local storage while typing
  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks") || "[]");
    if (stockName) {
      const filteredSuggestions = storedStocks.filter((stock) =>
        stock.stockSymbol.toLowerCase().startsWith(stockName.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [stockName]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        value={stockName}
        onChange={(e) => setStockName(e.target.value)}
        placeholder="Enter stock symbol"
        style={{
          padding: "8px",
          marginRight: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        list="stock-suggestions"
      />
      <datalist id="stock-suggestions">
        {suggestions.map((stock) => (
          <option key={stock.stockId} value={stock.stockSymbol} />
        ))}
      </datalist>

      <button
        onClick={handleSearch}
        style={{
          padding: "8px 12px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {stockDetails && (
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    }}
  >
    <thead>
      <tr>
        <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
          Exchange 
        </th>
        <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
          Trading Symbol 
        </th>
        <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
          LTP
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{stockName.toUpperCase()}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{stockDetails.exchangeType || "N/A"}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{stockDetails.ltp || "N/A"}</td>
      </tr>
    </tbody>
  </table>
)}

    </div>
  );
}
