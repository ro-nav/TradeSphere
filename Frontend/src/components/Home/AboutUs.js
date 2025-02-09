import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About TradeSphere</h1>
        <p className="intro-text">
          Welcome to <span className="brand-name">TradeSphere</span>, the
          ultimate stock market platform for real-time stock trading and expert
          market analysis. Whether you're a beginner or a seasoned trader,
          TradeSphere offers powerful tools to help you navigate the stock
          market.
        </p>

        <div className="section">
          <h2>Key Features</h2>
          <div className="feature-sections">
            <div className="feature">
              <h3>Buy and Sell Stocks</h3>
              <p>
                TradeSphere allows users to buy and sell stocks with ease. Our
                platform offers real-time market data, secure transactions, and
                a user-friendly interface designed for all levels of investors.
              </p>
            </div>

            <div className="feature">
              <h3>Expert Analyst Predictions</h3>
              <p>
                Our platform features experienced analysts who provide
                insightful stock market predictions, technical analysis, and
                expert advice to help you make informed trading decisions.
                Follow their posts to stay ahead of the market trends.
              </p>
            </div>

            <div className="feature">
              <h3>Why Choose TradeSphere?</h3>
              <ul>
                <li>Real-time market data and analysis</li>
                <li>Secure and fast buy/sell transactions</li>
                <li>Comprehensive trading tools and charts</li>
                <li>Expert analysts providing insights and predictions</li>
                <li>
                  User-friendly interface for both new and experienced traders
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Our Team</h2>
          <p>
            At TradeSphere, we are a team of passionate professionals who are
            dedicated to making the stock market accessible to everyone. Our
            team consists of experienced traders, analysts, and engineers who
            work together to bring you the best trading experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
