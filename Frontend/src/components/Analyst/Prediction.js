import Chart from "../Utils/Chart";

export default function Prediction() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      {/* Chart Section */}
      <div style={{ flex: 3 }}>
        <Chart />
      </div>

      {/* Prediction Section */}
      <div
        className="prediction-section"
        style={{
          flex: 1,
          marginLeft: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h4 style={{ marginBottom: "20px" }}>Predict Market Movement</h4>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter your prediction"
          style={{
            borderRadius: "4px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        />
        <button className="btn btn-primary w-100" style={{ padding: "10px" }}>
          Predict
        </button>
      </div>
    </div>
  );
}
