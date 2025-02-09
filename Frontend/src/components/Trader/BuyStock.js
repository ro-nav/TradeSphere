import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BuyStock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stock } = location.state;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(stock.ltp);

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 1;
    setQuantity(qty);
    setTotalPrice(qty * stock.ltp);
  };

  const handleBuyStock = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const payload = {
      userId: userInfo.userid, // Assuming userId is available in userInfo
      stockId: stock.stockId, // Assuming stockId is part of the stock object
      quantity: quantity,
      priceAtTransaction: stock.ltp,
    };

    console.log(payload);

    try {
      await axios.post(
        "http://localhost:8040/transaction/Transaction/Buy",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Stock purchased successfully!");
      navigate("/trader"); // Redirect to the home or portfolio page
    } catch (error) {
      console.error("Error purchasing stock:", error);
      alert("Failed to purchase stock.");
    }
  };

  return (
    <div className="container">
      <h2>Buy Stock</h2>
      <div className="form-group">
        <label>Stock Symbol:</label>
        <input
          type="text"
          className="form-control"
          value={stock.tradingSymbol}
          readOnly
        />

        <label>Stock Token:</label>
        <input
          type="text"
          className="form-control"
          value={stock.symbolToken}
          readOnly
        />

        <label>Exchange Type:</label>
        <input
          type="text"
          className="form-control"
          value={stock.exchange}
          readOnly
        />

        <label>LTP:</label>
        <input
          type="text"
          className="form-control"
          value={stock.ltp}
          readOnly
        />

        <label>Quantity:</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
        />

        <label>Total Price:</label>
        <input
          type="text"
          className="form-control"
          value={totalPrice.toFixed(2)}
          readOnly
        />

        <button className="btn btn-success mt-3" onClick={handleBuyStock}>
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default BuyStock;
