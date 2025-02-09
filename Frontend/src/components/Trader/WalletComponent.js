import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WalletComponent.css";

const WalletComponent = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState("balance");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userid = userInfo.userid;

  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    if (selectedTab === "transactions" && transactionHistory.length === 0) {
      fetchTransactionHistory();
    }
  }, [selectedTab, transactionHistory.length]);

  const fetchBalance = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8040/transaction/VirtualWallet/ViewBalance/${userid}`
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Failed to load balance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBalance = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(
        "http://localhost:8040/transaction/VirtualWallet/AddBalance",
        {
          userid,
          amount: parseFloat(amount),
        }
      );
      setAmount("");
      fetchBalance();
      alert("Balance added successfully!");
    } catch (error) {
      console.error("Error adding balance:", error);
      setError("Failed to add balance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawBalance = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(
        "http://localhost:8040/transaction/VirtualWallet/WithdrawBalance",
        {
          userid,
          amount: parseFloat(amount),
        }
      );
      setAmount("");
      fetchBalance();
      alert("Balance withdrawn successfully!");
    } catch (error) {
      console.error("Error withdrawing balance:", error);
      setError("Failed to withdraw balance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8040/transaction/Transaction/TransactionHistory/${userid}`
      );
      setTransactionHistory(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      setError("Failed to load transaction history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "balance":
        return (
          <div>
            <h4>Your Current Balance: ₹{balance}</h4>
            <div className="mt-3">
              <label htmlFor="amount" className="form-label">
                Enter Amount:
              </label>
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <div className="mt-2">
                <button
                  className="btn btn-success me-2"
                  onClick={handleAddBalance}
                >
                  Add Balance
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleWithdrawBalance}
                >
                  Withdraw Balance
                </button>
              </div>
            </div>
          </div>
        );
      case "transactions":
        return (
          <div>
            <h4>Transaction History</h4>
            {loading ? (
              <p>Loading...</p>
            ) : transactionHistory.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Stock Symbol</th>
                      <th>Transaction Type</th>
                      <th>Quantity</th>
                      <th>Price per Stock</th>
                      <th>Total Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction) => (
                      <tr key={transaction.transactionId}>
                        <td>{transaction.transactionId}</td>
                        <td>{transaction.stockSymbol}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{transaction.quantity}</td>
                        <td>₹{transaction.priceAtTransaction}</td>
                        <td>₹{transaction.totalAmount}</td>
                        <td>
                          {new Date(
                            transaction.transactionDate
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <h2>Virtual Wallet</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="nav nav-tabs custom-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${selectedTab === "balance" ? "active" : ""}`}
            onClick={() => setSelectedTab("balance")}
          >
            Balance
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              selectedTab === "transactions" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("transactions")}
          >
            Transaction History
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">{renderTabContent()}</div>
    </div>
  );
};

export default WalletComponent;
