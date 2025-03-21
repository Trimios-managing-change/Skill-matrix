import React, { useState } from "react";
import axios from "axios";
import "../pagescss/login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/login", { email, password });

      // Store token and login status only on success
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedIn", "true");

      toast.success("Login successful! Redirecting to dashboard...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setTimeout(() => navigate("/dashboard"), 3000); // Redirect after 3 seconds
    } catch (error) {
      // If login fails, ensure loggedIn is set to false
      localStorage.setItem("loggedIn", "false");

      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    }
  };

  return (
    <div>
      <ToastContainer /> {/* This ensures toast messages are displayed */}
      <div className="loginnav">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
        <Link to="/register">
          <h4 className="register">Register</h4>
        </Link>
      </div>
      <div className="loginform">
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
