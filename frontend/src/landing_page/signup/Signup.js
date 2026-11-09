import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
      const dashboardUrl =
        process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

      const { data } = await axios.post(
        `${apiUrl}/signup`,
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message || "Signup successful!");
        setTimeout(() => {
          window.location.href = dashboardUrl;
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      handleError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5 p-4 border rounded shadow-sm bg-white">
          <h2 className="text-center mb-4 text-muted">Signup Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-muted">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-muted">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-muted">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password (min 6 chars)"
                onChange={handleOnChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Submit"}
            </button>
            <div className="text-center text-muted">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
