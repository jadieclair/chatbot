// Importing React, useState hook, and necessary dependencies for styling and routing
import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Functional component named Register
const Register = () => {
  // Using the useState hook to manage form input values
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Initializing the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Sending a POST request to the server for user registration
    axios
      .post("http://localhost:3000/register", values)
      .then((res) => {
        // Checking the response data for registration status
        if (res.data.Status === "Successfull") {
          alert("You have been Registered!");
          // Navigating to the login page after successful registration
          navigate("/login");
        } else {
          alert(
            "Your Registration attempt was unsuccessful. Please try again."
          );
        }
      })
      .catch((err) => {
        // Logging and handling errors
        console.log(err);
        alert("An error occurred during registration. Please try again.");
      });
  };

  // JSX for rendering the registration form
  return (
    <div className="register">
      <div className="card">
        <div className="reg-img"></div>
        <div className="right">
          <h1 className="auth-header">Register</h1>
          <form onSubmit={handleSubmit}>
            {/* Input fields for name, email, and password with onChange handlers */}
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <input
              type="email"
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

            {/* Submit button for registration */}
            <button className="regpage-regbtn">Register</button>
          </form>

          {/* Login link for users with existing accounts */}
          <div className="log-btn">
            <span>Do you have an account?</span>
            <Link to="/login">
              <button className="regpage-logbtn">
                <u>Login</u>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the Register component to make it available for other parts of the application
export default Register;
