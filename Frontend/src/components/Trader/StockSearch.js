import { useState, useEffect } from "react";

export default function StockSearch() {
  const [stockName, setStockName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (stockName) {
      // Fetch suggestions from the database
      fetch(`/api/stocks?query=${stockName}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data))
        .catch((error) => console.error("Error fetching stock suggestions:", error));
    } else {
      setSuggestions([]);
    }
  }, [stockName]);

  return (
    <div>
      <input
        type="text"
        value={stockName}
        onChange={(e) => setStockName(e.target.value)}
        placeholder="Enter stock name"
      />

      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>

      <table style={{ width: "100%",borderCollapse: "collapse" , marginTop:"20px"}}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Open</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>High</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Low</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Close</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((suggestion, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{suggestion.open}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{suggestion.high}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{suggestion.low}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{suggestion.close}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}