import React from "react";
import "./HomeComp.css";

export default function HomeComp() {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome Home</h2>
      <p className="home-description">
        Explore our platform to manage your trades, analyze data, and make informed decisions.
      </p>
      <div className="home-actions">
        <button className="btn btn-primary" onClick={() => console.log("Get Started button clicked")}>
          Get Started
        </button>
        <button className="btn btn-outline-secondary" onClick={() => console.log("Learn More button clicked")}>
          Learn More
        </button>
      </div>
    </div>
  );
}