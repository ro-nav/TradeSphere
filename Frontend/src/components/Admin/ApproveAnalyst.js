import { useState } from "react";

export default function ApproveAnalyst() {
  const [analystId, setAnalystId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `http://localhost:8040/crud/admin/approve-analyst/${analystId}`,
      {
        method: "PUT",
      }
    );
    if (response.ok) {
      setMessage("Analyst approved successfully!");
    } else {
      setMessage("Failed to approve analyst");
    }
  };

  return (
    <div className="container">
      <h2>Approve Analyst</h2>
      <input
        type="text"
        className="form-control"
        value={analystId}
        onChange={(e) => setAnalystId(e.target.value)}
        placeholder="Enter Analyst ID"
      />
      <button className="btn btn-success" onClick={handleSubmit}>
        Approve
      </button>
      {message && <div>{message}</div>}
    </div>
  );
}
