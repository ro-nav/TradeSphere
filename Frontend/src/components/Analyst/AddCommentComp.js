import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling
import "./AddCommentComp.css"; // Import external CSS for additional gradient styles

export default function AddCommentComp() {
  const [stocks, setStocks] = useState([]);
  const [stockId, setStockId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(""); // For displaying success or failure message
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userId = userInfo.userid;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        stockId: parseInt(stockId),
        userId: parseInt(userId),
        title,
        content,
      };
      console.log(payload);
      await axios.post(
        "http://localhost:8040/transaction/Post/CreatePost",
        payload
      );
      setMessage('<p class="text-success">Analysis posted successfully!</p>');
      setStockId("");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error posting analysis:", error);
      setMessage(
        '<p class="text-danger">Failed to post analysis. Please try again.</p>'
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg custom-gradient-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Post Your Analysis</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label
                htmlFor="stock"
                className="col-2 col-form-label text-start"
              >
                Select Stock
              </label>
              <div className="col-10">
                <select
                  id="stock"
                  className="form-select"
                  value={stockId}
                  onChange={(e) => setStockId(e.target.value)}
                  required
                >
                  <option value="">Choose a stock</option>
                  {stocks.map((stock) => (
                    <option key={stock.stockId} value={stock.stockId}>
                      {stock.stockSymbol} - {stock.stockToken}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="title"
                className="col-2 col-form-label text-start"
              >
                Title
              </label>
              <div className="col-10">
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the title of your analysis"
                  required
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="content"
                className="col-2 col-form-label text-start"
              >
                Content
              </label>
              <div className="col-10">
                <textarea
                  id="content"
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your detailed analysis here..."
                  rows="6"
                  required
                />
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-gradient">
                Post Analysis
              </button>
            </div>

            {/* Message Display Section */}
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
