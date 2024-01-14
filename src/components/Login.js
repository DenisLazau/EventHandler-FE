// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

class LoginData {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["member"]); // Cookie for storing member data
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginData = new LoginData(username, password);

      const response = await axios.post(
        "http://localhost:5267/api/Member/Login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        // Assuming your response structure has the necessary data
        // Store member data in cookies
        setCookie("member", response.data, { path: "/" });
        // Navigate to EventList page
        navigate("/pages/EventList/EventList");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Error during login");
    }
  };

  return (
    <div className="container">
      <h2>Login Page</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        {error && <div className="color-form mt-2">{error}</div>}
      </form>
      <div className="mt-3">
        <Link to="/signup" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
