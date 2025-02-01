import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [clientCode, setClientCode] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientCode, password, totp }),
      });
      

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.data.jwtToken);
        console.log(clientCode, data.data.jwtToken, data.data.refreshToken, data.data.feedToken);

        const saveResponse = await fetch("http://localhost:8042/api/admin/auth/saveToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-UserType": "USER",
            "X-SourceID": "WEB",
            "X-ClientLocalIP": "192.168.1.40",
            "X-ClientPublicIP": "2a09:bac5:3b6f:1a46::29e:101",
            "X-MACAddress": "D8-C0-A6-23-89-83",
            "X-PrivateKey": "52sQhmK0"
          },
          body: JSON.stringify({
            clientCode,
            jwtToken: data.data.jwtToken,
            refreshToken: data.data.refreshToken,
            feedToken: data.data.feedToken,
          }),
        });

        const saveData = await saveResponse.json();
        console.log("Database API Response:", saveData);

        if (!saveResponse.ok) {
          throw new Error(`Failed to save data: ${saveData.message || saveResponse.status}`);
        }

        navigate("/admin");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-md rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Client Code"
            value={clientCode}
            onChange={(e) => setClientCode(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="TOTP Code"
            value={totp}
            onChange={(e) => setTotp(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </div>
    </div>
  );
}
