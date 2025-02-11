import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const StockSearch = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedStock, setSelectedStock] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8040/crud/stocks/getAllStocks"
        );
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    if (searchTerm && !realTimeData) {
      const filtered = stocks.filter(
        (stock) =>
          stock.stockSymbol &&
          stock.stockSymbol.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks([]);
    }
  }, [searchTerm, stocks, realTimeData]);

  const handleStockClick = async (stock) => {
    setSelectedStock(stock);
    setSearchTerm(stock.stockSymbol);
    setFilteredStocks([]);
    try {
      const response = await axios.post(
        "https://apiconnect.angelone.in/rest/secure/angelbroking/market/v1/quote/",
        {
          mode: "FULL",
          exchangeTokens: {
            [stock.exchangeType]: [stock.stockToken.toString()],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-UserType": "USER",
            "X-SourceID": "WEB",
            "X-ClientLocalIP": process.env.REACT_APP_LOCAL_IP,
            "X-ClientPublicIP": process.env.REACT_APP_PUBLIC_IP,
            "X-MACAddress": process.env.REACT_APP_MAC_ADDRESS,
            "X-PrivateKey": process.env.REACT_APP_ANGLE_ONE_API_KEY,
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedData = response.data.data.fetched[0];
      const combinedData = { ...fetchedData, stockId: stock.stockId }; // Add stockId

      setRealTimeData(combinedData);

      // Update LTP in the database
      await axios.put(
        `http://localhost:8040/crud/stocks/updateLtp/${stock.stockSymbol}`,
        {
          ltp: fetchedData.ltp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`LTP updated in the database for ${stock.stockSymbol}`);
    } catch (error) {
      console.error(
        "Error fetching real-time stock data or updating LTP:",
        error
      );
    }
  };

  const handleClearSelection = () => {
    setRealTimeData(null);
    setSelectedStock(null);
    setSearchTerm("");
    setFilteredStocks([]);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Stock Search</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Search for a stock by symbol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={realTimeData !== null}
      />
      {filteredStocks.length > 0 && (
        <ul className="list-group mt-3">
          {filteredStocks.map((stock) => (
            <li
              key={stock.stockId}
              className="list-group-item list-group-item-action"
              onClick={() => handleStockClick(stock)}
            >
              {stock.stockSymbol}
            </li>
          ))}
        </ul>
      )}

      {realTimeData && (
        <div className="mt-5">
          <h3 className="mb-4 text-center">Real-Time Stock Data</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Stock Symbol</th>
                  <th>Stock Token</th>
                  <th>Exchange Type</th>
                  <th>Last Traded Price (LTP)</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Net Change</th>
                  <th>Percent Change</th>
                  <th>Average Price</th>
                  <th>52 Week Low</th>
                  <th>52 Week High</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{realTimeData.tradingSymbol}</td>
                  <td>{realTimeData.symbolToken}</td>
                  <td>{realTimeData.exchange}</td>
                  <td>{realTimeData.ltp}</td>
                  <td>{realTimeData.open}</td>
                  <td>{realTimeData.high}</td>
                  <td>{realTimeData.low}</td>
                  <td>{realTimeData.close}</td>
                  <td>{realTimeData.netChange}</td>
                  <td>{realTimeData.percentChange}</td>
                  <td>{realTimeData.avgPrice}</td>
                  <td>{realTimeData["52WeekLow"]}</td>
                  <td>{realTimeData["52WeekHigh"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <button
              className="btn btn-danger mt-3"
              onClick={handleClearSelection}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
