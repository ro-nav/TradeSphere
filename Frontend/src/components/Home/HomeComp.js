import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./HomeComp.css";

export default function HomeComp() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2 className="home-title">Welcome Home</h2>
      <p className="home-description">
        Explore our platform to manage your trades, analyze data, and make informed decisions.
      </p>
      <div className="home-actions">
        {/* Navigate to Login Component */}
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Get Started
        </button>
        
        {/* Navigate to Learn More or another page */}
        <button className="btn btn-outline-secondary" onClick={() => navigate("/learn-more")}>
          Learn More
        </button>
      </div>
    </div>
  );
}
