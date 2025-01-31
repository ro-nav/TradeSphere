import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./components/redux/loggedSlice";

// Components
import NavbarComp from "./components/Navbar/NavbarComp";
import ErrorComp from "./components/Utils/ErrorComp";
import LoginComp from "./components/Home/LoginComp";
import RegisterComp from "./components/Home/RegisterComp";
import HomeComp from "./components/Home/HomeComp";
import ApproveAnalyst from "./components/Admin/ApproveAnalyst";
import Trader from "./components/Trader/Trader";
import Analyst from "./components/Analyst/Analyst";
import Admin from "./components/Admin/Admin";
import Contact from "./components/Home/ContactComp";
import UserPermissionSection from "./components/Admin/UserPermissionSection";
import AnalystProfile from "./components/Analyst/AnalystProfile";
import Chart from "./components/Utils/Chart";
import TraderProfile from "./components/Trader/TraderProfile";
import Prediction from "./components/Analyst/Prediction";
import LogoutComp from "./components/Home/LogoutComp";
import AboutUs from "./components/Home/AboutUs";
import UpdateProfileComp from "./components/Utils/UpdateProfileComp";
import { Outlet } from "react-router-dom";

function App() {
  const { loggedIn } = useSelector((state) => state.logged);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(login(JSON.parse(userData)));
    }
  }, [dispatch]);

  return (
    <div>
      {/* Conditionally show Navbar only if logged in */}
      {!loggedIn && <NavbarComp />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/logout" element={<LogoutComp />} />

        {/* Protected Analyst Routes */}
        <Route path="/analyst" element={loggedIn ? <Analyst /> : <Navigate to="/login" />}>
          <Route path="profile" element={<AnalystProfile />} />
          <Route path="chart" element={<Chart />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="updateprofile" element={<UpdateProfileComp />} />
        </Route>

        {/* Protected Trader Routes */}
        <Route path="/trader" element={loggedIn ? <Trader /> : <Navigate to="/login" />}>
          <Route path="profile" element={<TraderProfile />} />
          <Route path="chart" element={<Chart />} />
          <Route path="updateprofile" element={<UpdateProfileComp />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={loggedIn ? <Admin /> : <Navigate to="/login" />}>
          <Route path="approveanalyst" element={<UserPermissionSection />} />
          <Route path="approve-analyst" element={<ApproveAnalyst />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<ErrorComp />} />
      </Routes>
    </div>
  );
}

export default App;
