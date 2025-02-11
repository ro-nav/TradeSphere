import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginForm() {
  const [clientcode, setClientcode] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Reset messages on form submit
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-UserType": "USER",
            "X-SourceID": "WEB",
            "X-ClientLocalIP": process.env.REACT_APP_LOCAL_IP,
            "X-ClientPublicIP": process.env.REACT_APP_PUBLIC_IP,
            "X-MACAddress": process.env.REACT_APP_MAC_ADDRESS,
            "X-PrivateKey": process.env.REACT_APP_ANGLE_ONE_API_KEY,
            Accept: "application/json",
          },
          body: JSON.stringify({ clientcode, password, totp }),
        }
      );

      if (!response.ok) {
        setErrorMessage("Login failed. Please check your credentials.");
        return;
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("jwtToken", data.data.jwtToken);

      const saveResponse = await fetch(
        "http://localhost:8040/auth/admin/saveToken",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientCode: clientcode,
            jwtToken: data.data.jwtToken,
            refreshToken: data.data.refreshToken,
            feedToken: data.data.feedToken,
          }),
        }
      );

      if (!saveResponse.ok) {
        throw new Error(`Failed to save data: ${saveResponse.status}`);
      }

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin"), 2000); // Delay for 2 seconds before redirecting
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298, #6b7cf1)",
        padding: "20px",
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          background: "linear-gradient(135deg, #ffffff, #e8e8e8)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Client Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter client code"
              value={clientcode}
              onChange={(e) => setClientcode(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">TOTP Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter TOTP code"
              value={totp}
              onChange={(e) => setTotp(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          {/* Message Section Above the Submit Button */}
          {errorMessage && (
            <div className="mb-3 text-danger">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mb-3 text-success">{successMessage}</div>
          )}

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(135deg, #1e90ff, #00c6ff)",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "10px 0",
              transition: "all 0.3s ease",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
