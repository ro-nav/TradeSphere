import React, { useState, useEffect } from "react";
import axios from "axios";

const StockComments = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:8040/transaction/Post/GetAllPost"
      );
      setComments(response.data);
      setFilteredComments(response.data); // Show all comments by default
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (stockSymbol.trim() === "") {
      setFilteredComments(comments); // Show all comments if no symbol is entered
    } else {
      const filtered = comments.filter(
        (comment) =>
          comment.stockName.toLowerCase() === stockSymbol.toLowerCase()
      );
      setFilteredComments(filtered);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Analyst Comments</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="stockSymbol" className="form-label">
          Filter by Stock Symbol:
        </label>
        <div className="d-flex">
          <input
            type="text"
            id="stockSymbol"
            className="form-control"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            placeholder="Enter stock symbol (e.g., SBIN-EQ)"
          />
          <button className="btn btn-primary ms-2" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
      {loading ? (
        <h4>Loading comments...</h4>
      ) : filteredComments.length === 0 ? (
        <h4>No comments found for the provided stock symbol.</h4>
      ) : (
        <div className="list-group">
          {filteredComments.map((comment) => (
            <div key={comment.postId} className="list-group-item mb-3">
              <h5 className="mb-1">{comment.title}</h5>
              <p>{comment.content}</p>
              <small className="text-muted">
                By {comment.analystName} on{" "}
                {new Date(comment.datetime).toLocaleString()}
              </small>
              <div className="mt-2">
                <span className="badge bg-secondary me-2">
                  Stock: {comment.stockName}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockComments;
