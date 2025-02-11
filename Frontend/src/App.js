import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "./components/redux/loggedSlice";

// Components
import UpdateAnalystProfile from "./components/Analyst/UpdateAnalystProfile";
import UpdateTraderProfile from "./components/Trader/UpdateTraderProfile";
import NavbarComp from "./components/Navbar/NavbarComp";
import ErrorComp from "./components/Utils/ErrorComp";
import LoginComp from "./components/Home/LoginComp";
import RegisterComp from "./components/Home/RegisterComp";
import HomeComp from "./components/Home/HomeComp";
import Trader from "./components/Trader/Trader";
import Analyst from "./components/Analyst/Analyst";
import Admin from "./components/Admin/Admin";
import Contact from "./components/Home/ContactComp";
import UserPermissionSection from "./components/Admin/UserPermissionSection";
import TraderProfile from "./components/Trader/TraderProfile";
import LogoutComp from "./components/Home/LogoutComp";
import AboutUs from "./components/Home/AboutUs";
import LoginPage from "./components/Admin/LoginAPI";
import AddCommentComp from "./components/Analyst/AddCommentComp";
import FinBERTSentiment from "./components/Analyst/AnalyseComp";
import AnalystProfile from "./components/Analyst/AnalystProfileComp";
import StockSearch from "./components/Trader/StockSearch";
import AStockSearch from "./components/Analyst/StockSearch";
import BuyStock from "./components/Trader/BuyStock";
import SellStock from "./components/Trader/SellStock";
import MyPortfolio from "./components/Trader/MyPortfolio";
import StockComments from "./components/Trader/StockComments";
import WalletComponent from "./components/Trader/WalletComponent";
import CandlestickChart from "./components/Analyst/CandlestickChart";

function App() {
  const { loggedIn } = useSelector((state) => state.logged);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation(); // Track the current route

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(login(JSON.parse(userData)));
    }
    setAuthChecked(true);
  }, [dispatch]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  // Define public routes where the Navbar should be displayed
  const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/register",
    "/login",
    "/logout",
  ];
  const showNavbar = publicRoutes.includes(location.pathname) && !loggedIn;

  return (
    <div>
      {showNavbar && <NavbarComp />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/logout" element={<LogoutComp />} />

        {/* Protected Analyst Routes */}
        <Route path="/analyst" element={<Analyst />}>
          <Route path="searchstock" element={<AStockSearch />} />
          <Route path="prediction" element={<FinBERTSentiment />} />
          <Route path="makepost" element={<AddCommentComp />} />
          <Route path="profile" element={<AnalystProfile />} />
          <Route path="updateprofile" element={<UpdateAnalystProfile />} />
          <Route path="chart" element={<CandlestickChart />} />
        </Route>

        {/* Protected Trader Routes */}
        <Route path="/trader" element={<Trader />}>
          <Route path="profile" element={<TraderProfile />} />
          <Route path="updateprofile" element={<UpdateTraderProfile />} />
          <Route path="searchstock" element={<StockSearch />} />
          <Route path="buy-stock" element={<BuyStock />} />
          <Route path="sell-stock" element={<SellStock />} />
          <Route path="portfolio" element={<MyPortfolio />} />
          <Route path="viwepost" element={<StockComments />} />
          <Route path="wallet" element={<WalletComponent />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/LoginAPI" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="approveanalyst" element={<UserPermissionSection />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<ErrorComp />} />
      </Routes>
    </div>
  );
}

export default App;
