import React, { useState, useEffect } from "react";
import { Tab, Tabs, Table, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "./MyPortfolio.css";

const MyPortfolio = () => {
  const [currentHoldings, setCurrentHoldings] = useState([]);
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [activeTab, setActiveTab] = useState("current");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentHoldings();
    fetchPortfolioHistory();
    fetchTotalProfitLoss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCurrentHoldings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8040/transaction/Portfolio/CurrentHoldings/${userInfo.userid}`
      );
      setCurrentHoldings(response.data.holdings);
    } catch (error) {
      console.error("Error fetching current holdings:", error);
    }
  };

  const fetchPortfolioHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8040/transaction/Portfolio/History/${userInfo.userid}`
      );
      setPortfolioHistory(response.data);
    } catch (error) {
      console.error("Error fetching portfolio history:", error);
    }
  };

  const fetchTotalProfitLoss = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8040/transaction/Portfolio/ProfitLoss/${userInfo.userid}`
      );
      setTotalProfitLoss(response.data.totalProfitLoss);
    } catch (error) {
      console.error("Error fetching total profit/loss:", error);
    }
  };

  const handleSellStock = (stock) => {
    navigate(`/trader/sell-stock`, { state: { stock } }); // Pass stock details to SellStock page
  };

  return (
    <div className="container mt-4">
      <h2>My Portfolio</h2>
      <Card className="mb-3">
        <Card.Body>
          <h5>
            Total Profit/Loss:{" "}
            <span
              className={totalProfitLoss >= 0 ? "text-success" : "text-danger"}
            >
              ₹{totalProfitLoss}
            </span>
          </h5>
        </Card.Body>
      </Card>

      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className="custom-tabs mb-3"
      >
        <Tab eventKey="current" title="Current Holdings">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Quantity</th>
                <th>Avg Purchase Price (₹)</th>
                <th>Total Investment (₹)</th>
                <th>Cumulative Profit/Loss (₹)</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentHoldings.length > 0 ? (
                currentHoldings.map((holding) => (
                  <tr key={holding.stockId}>
                    <td>{holding.stockSymbol}</td>
                    <td>{holding.quantity}</td>
                    <td>{holding.avgPurchasePrice}</td>
                    <td>{holding.totalInvestment}</td>
                    <td
                      className={
                        holding.cumulativeProfitLoss >= 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {holding.cumulativeProfitLoss}
                    </td>
                    <td>{holding.status}</td>
                    <td>{new Date(holding.lastUpdated).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleSellStock(holding)}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No current holdings found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="history" title="Portfolio History">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Avg Purchase Price (₹)</th>
                <th>Cumulative Profit/Loss (₹)</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {portfolioHistory.length > 0 ? (
                portfolioHistory.map((history) => (
                  <tr key={history.stockId}>
                    <td>{history.stockSymbol}</td>
                    <td>{history.avgPurchasePrice}</td>
                    <td
                      className={
                        history.cumulativeProfitLoss >= 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {history.cumulativeProfitLoss}
                    </td>
                    <td>{history.status}</td>
                    <td>{new Date(history.lastUpdated).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No portfolio history found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyPortfolio;
