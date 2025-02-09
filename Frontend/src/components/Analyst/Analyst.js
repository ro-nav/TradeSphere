import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Separate Navbar component
import "./Analyst.css"; // Import the CSS file

export default function Analyst() {
  const navigate = useNavigate();

  // Retrieve username from sessionStorage (or localStorage)
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const username = userInfo.username || "User"; // Default to "User" if username is not found

  // Optionally, handle user redirection if not logged in
  if (!userInfo.username) {
    navigate("/login");
  }

  return (
    <div className="analyst-page">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="analyst-container">
        <div className="analyst-card">
          <h2 className="analyst-heading">Welcome Analyst, {username}!</h2>
          <p className="analyst-description">
            Analyze data, predict trends, and make informed decisions!
          </p>

          {/* Outlet for Nested Routes */}
          <div className="analyst-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
