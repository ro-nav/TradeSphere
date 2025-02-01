import { useState } from "react";

const Token = ({ onSave }) => {
  const [inputToken, setInputToken] = useState("");

  const handleSaveToken = () => {
    if (onSave) {
      onSave(inputToken);
    }
  };

  return (
    <div className="card mt-4 p-3">
      <h4>Enter JWT Token</h4>
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Enter JWT Token"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleSaveToken}>
        Save Token
      </button>
    </div>
  );
};

export default Token;
