import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SellStock = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { stock } = state || {};

  const [stockInfo, setStockInfo] = useState(null);
  const [ltp, setLtp] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const token = localStorage.getItem("jwtToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (stock) fetchStockInfo(stock.stockSymbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStockInfo = async (symbol) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8040/crud/stocks/getStockBySymbol/${symbol}`
      );
      const stock = response.data;
      setStockInfo(stock);
      fetchLTP(stock.exchangeType, stock.stockToken);
    } catch (error) {
      console.error("Error fetching stock info:", error);
      setError("Failed to fetch stock information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLTP = async (exchangeType, stockToken) => {
    setError("");
    try {
      const response = await axios.post(
        "https://apiconnect.angelone.in/rest/secure/angelbroking/market/v1/quote/",
        {
          mode: "LTP",
          exchangeTokens: {
            [exchangeType]: [stockToken.toString()],
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
      setLtp(response.data.data.fetched[0].ltp);
    } catch (error) {
      console.error("Error fetching LTP:", error);
      setError("Failed to fetch LTP. Please try again.");
    }
  };

  const handleQuantityChange = (e) => {
    const qty = Math.max(0, Number(e.target.value));
    setQuantity(qty);
    setTotalPrice(qty * ltp);

    // Check if entered quantity exceeds the available quantity
    if (stockInfo && qty > stockInfo.quantity) {
      setQuantityError("Quantity exceeds available stock.");
    } else {
      setQuantityError("");
    }
  };

  const handleSell = async () => {
    if (quantity <= 0 || quantity > stockInfo.quantity) {
      setError("Invalid quantity. Please enter a valid number.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:8040/transaction/Transaction/Sell", {
        userId: userInfo.userid,
        stockId: stockInfo.stockId,
        quantity: quantity,
        priceAtTransaction: ltp,
      });
      alert("Stock sold successfully!");
      navigate("/trader/portfolio");
    } catch (error) {
      console.error("Error selling stock:", error);
      setError(
        error.response?.data || "Failed to sell stock. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!stock?.stockSymbol) {
    return <h4>No stock selected for selling.</h4>;
  }

  return (
    <div className="container mt-4">
      <h2>Sell Stock: {stock.stockSymbol}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!stockInfo ? (
        <h4>Loading stock information...</h4>
      ) : (
        <>
          <div className="form-group">
            <label>Exchange Type: {stockInfo.exchangeType}</label>
          </div>
          <div className="form-group">
            <label>Last Traded Price (LTP): ₹{ltp}</label>
          </div>
          <div className="form-group">
            <label>Available Quantity: {stockInfo.quantity}</label>
          </div>
          <div className="form-group">
            <label>Quantity to Sell:</label>
            <input
              type="number"
              className={`form-control ${quantityError ? "is-invalid" : ""}`}
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={stockInfo.quantity}
            />
            {quantityError && (
              <div className="invalid-feedback">{quantityError}</div>
            )}
          </div>
          <div className="form-group">
            <label>Total Price: ₹{totalPrice.toFixed(2)}</label>
          </div>
          <button
            className="btn btn-danger"
            onClick={handleSell}
            disabled={loading || quantity <= 0 || quantity > stockInfo.quantity}
          >
            {loading ? "Processing..." : "Confirm Sell"}
          </button>
        </>
      )}
    </div>
  );
};

export default SellStock;
