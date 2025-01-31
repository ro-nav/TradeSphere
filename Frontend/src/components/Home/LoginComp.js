import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/loggedSlice";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginComp.css";

export default function LoginComp() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8042/api/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        dispatch(login(user)); // Save user info to Redux or context

        // Show success modal
        setShowSuccessModal(true);

        // Store user info in sessionStorage
        const userInfo = {
          userid: user.userid,
          username: user.username,
          role: user.role,
          approved: user.approved,
        };
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Navigate with username in state
        setTimeout(() => {
          switch (user.role) {
            case "Trader":
              navigate("/trader");
              break;
            case "Analyst":
              if (user.approved) {
                navigate("/analyst"); // No need to pass username here if using sessionStorage
              } else {
                setLoginError(
                  "Your account is not yet approved. Please contact the admin."
                );
              }
              break;
            case "Admin":
              navigate("/admin");
              break;
            default:
              setLoginError("Unknown user role");
          }
        }, 2000); // Redirect after 2 seconds
      } else if (response.status === 401) {
        setLoginError("Incorrect username or password");
      } else {
        setLoginError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Something went wrong. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/"); // Redirect to homepage after closing the modal
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        {loginError && (
          <Alert variant="danger" className="mt-3">
            {loginError}
          </Alert>
        )}
      </form>

      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have logged in successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
