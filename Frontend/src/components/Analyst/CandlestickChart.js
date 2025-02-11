import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import "./CandlestickChart.css";

const CandlestickChart = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [interval, setInterval] = useState("ONE_MINUTE");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [series, setSeries] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8040/crud/stocks/getAllStocks"
        );
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock list:", error);
      }
    };
    fetchStocks();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  };

  const fetchCandlestickData = async () => {
    if (!selectedStock || !fromDate || !toDate) {
      alert("Please select all fields.");
      return;
    }

    if (new Date(fromDate) >= new Date(toDate)) {
      alert("From Date should be earlier than To Date.");
      return;
    }

    try {
      const formattedFromDate = formatDate(fromDate);
      const formattedToDate = formatDate(toDate);

      const response = await axios.post(
        "https://apiconnect.angelone.in/rest/secure/angelbroking/historical/v1/getCandleData",
        {
          exchange: selectedExchange,
          symboltoken: selectedStock,
          interval: interval,
          fromdate: formattedFromDate,
          todate: formattedToDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-UserType": "USER",
            "X-SourceID": "WEB",
            "X-ClientLocalIP": process.env.REACT_APP_LOCAL_IP,
            "X-ClientPublicIP": process.env.REACT_APP_PUBLIC_IP,
            "X-MACAddress": process.env.REACT_APP_MAC_ADDRESS,
            "X-PrivateKey": process.env.REACT_APP_ANGLE_ONE_API_KEY,
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        const formattedData = response.data.data.map((item) => ({
          x: new Date(item[0]).getTime(),
          y: [item[1], item[2], item[3], item[4]],
        }));

        setSeries([{ data: formattedData }]);
      } else {
        alert("No data available for the selected criteria.");
      }
    } catch (error) {
      console.error("Error fetching candlestick data:", error);
      alert("Failed to fetch candlestick data.");
    }
  };

  const options = {
    chart: {
      type: "candlestick",
      height: 700,
      width: 800,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: `Candlestick Chart for (${selectedStock},${selectedExchange})`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM yyyy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
      min: new Date(fromDate).getTime(),
      max: new Date(toDate).getTime(),
    },
    tooltip: {
      enabled: true,
      shared: true,
      x: {
        formatter: (val) =>
          new Date(val).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="header container">
      <div className="mb-4 container ">
        <Typography variant="h4">Candlestick Chart</Typography>
      </div>

      <Box className="form-group">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Stock</InputLabel>
          <Select
            value={`${selectedStock},${selectedExchange}`}
            onChange={(e) => {
              const [stockToken, exchangeType] = e.target.value.split(",");
              setSelectedStock(stockToken);
              setSelectedExchange(exchangeType);
            }}
          >
            <MenuItem value="">Select a stock and exchange type</MenuItem>
            {stocks.map((stock) => (
              <MenuItem
                key={stock.stockId}
                value={`${stock.stockToken},${stock.exchangeType}`}
              >
                {stock.stockSymbol} ({stock.exchangeType})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Interval</InputLabel>
          <Select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            <MenuItem value="ONE_MINUTE">1 Minute</MenuItem>
            <MenuItem value="FIVE_MINUTE">5 Minutes</MenuItem>
            <MenuItem value="ONE_HOUR">1 Hour</MenuItem>
            <MenuItem value="ONE_DAY">1 Day</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="datetime-local"
          label="From Date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="datetime-local"
          label="To Date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchCandlestickData}
        sx={{ display: "block", margin: "20px auto" }}
      >
        Fetch Data
      </Button>

      <div className="chart-container">
        <Chart options={options} series={series} type="candlestick" />
      </div>
    </div>
  );
};

export default CandlestickChart;
