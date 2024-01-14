// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

// Signup.js
const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCookie] = useCookies(["member"]); // Cookie for storing member data
    const navigate = useNavigate();
  
    const handleSignup = async () => {
      try {
        const response = await axios.post("http://localhost:5267/api/signup", {
          firstName,
          lastName,
          username,
          password,
        });
  
        if (response.data.member) {
          // Store member data in cookies
          setCookie("member", response.data.member, { path: "/" });
          // Navigate to EventList page
          navigate("/event-list");
        } else {
          setError("Signup failed");
        }
      } catch (error) {
        setError("Error during signup");
      }
    };
  
    return (
      <div className="container">
        <h2>Signup Page</h2>
        <form>
          {/* Add input fields for firstName, lastName, username, and password */}
          {/* ... */}
  
          <button type="button" className="btn btn-primary" onClick={handleSignup}>
            Signup
          </button>
          {error && <div className="color-form mt-2">{error}</div>}
        </form>
        <div className="mt-3">
          <Link to="/login" className="btn btn-success">
            Login
          </Link>
        </div>
      </div>
    );
  };
  
  export default Signup;
  
