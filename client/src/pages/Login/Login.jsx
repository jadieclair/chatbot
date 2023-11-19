// Importing React, useState hook, and necessary dependencies for styling and routing
import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Functional component named Login
const Login = () => {
  // Using the useState hook to manage form input values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Initializing the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Setting axios defaults for handling credentials
  axios.defaults.withCredentials = true;

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Sending a POST request to the server for user login
    axios
      .post("http://localhost:3000/login", values)
      .then((res) => {
        // Checking the response data for login status
        if (res.data.Status === "Successfull") {
          alert("You have been Logged in!");
          // Navigating to the home page after successful login
          navigate("/home");
        } else {
          alert(res.data.Error || "Your Log-in attempt was unsuccessful. Please try again.");
        }
      })
      .catch((err) => {
        // Logging and handling errors
        console.log(err);
        alert("An error occurred during login. Please try again.");
      });
  };

  // JSX for rendering the login form
  return (
    <div className="login">
      <div className="card">
        <div className="left"></div>

        <div className="right">
          <h1 className="auth-header">Login</h1>
          <form onSubmit={handleSubmit}>
            {/* Input fields for email and password with onChange handlers */}
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />

            {/* Submit button for login */}
            <button className="logpage-logbtn">Login</button>
          </form>
          
          {/* Registration link for users without accounts */}
          <div className="reg-btn">
            <span className="open-acc">Don't you have an account?</span>
            <Link to="/register">
              <button className="logpage-regbtn">
                <u>Register</u>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the Login component to make it available for other parts of the application
export default Login;
