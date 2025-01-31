import { useEffect } from "react";
import "./Chart.css";

export default function Chart() {
  useEffect(() => {
    if (!document.getElementById("tradingview-script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.id = "tradingview-script";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "NSE:NIFTY",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
      });

      document
        .querySelector(".tradingview-widget-container")
        .appendChild(script);
    }
  }, []);

  return (
    <div className="chart-container">
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          Powered by <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer">TradingView</a>
        </div>
      </div>
    </div>
  );
}
