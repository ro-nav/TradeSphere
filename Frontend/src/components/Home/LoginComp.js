import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/loggedSlice";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginComp.css";

export default function LoginComp() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for showing the spinner
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setSuccessMessage("");
    setIsLoading(true); // Show spinner on form submit

    try {
      const response = await fetch("http://localhost:8040/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        dispatch(login(user));

        // Store user info and jwtToken in localStorage
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userid: user.userid,
            username: user.username,
            role: user.role,
            approved: user.approved,
          })
        );
        localStorage.setItem("jwtToken", user.jwtToken);

        // Show success message
        setSuccessMessage("Login successful! Redirecting...");

        // Navigate based on user role after 2 seconds
        setTimeout(() => {
          setIsLoading(false); // Hide spinner before redirect
          switch (user.role) {
            case "Trader":
              navigate("/trader");
              break;
            case "Analyst":
              if (user.approved) {
                navigate("/analyst");
              } else {
                setSuccessMessage(""); // Clear success message
                setLoginError(
                  "Your account is not yet approved. Please contact the admin."
                );
              }
              break;
            case "Admin":
              navigate("/LoginAPI");
              break;
            default:
              setLoginError("Unknown user role.");
          }
        }, 2000);
      } else if (response.status === 401) {
        setLoginError("Incorrect username or password.");
      } else if (response.status === 403) {
        setLoginError("Your account is disabled. Please contact support.");
      } else {
        setLoginError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // Hide spinner after the request is done
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="mb-3">
          <label className="form-label">Username or Email</label>
          <input
            type="text"
            className="form-control"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
        {loginError && (
          <Alert variant="danger" className="mt-3">
            {loginError}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" className="mt-3">
            {successMessage}
          </Alert>
        )}
      </form>
    </div>
  );
}
