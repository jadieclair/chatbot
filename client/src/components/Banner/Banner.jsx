import React from "react";
import "./banner.css";

function Banner() {
  return (
    <div>
      <div className="top-banner">
        <span className="login-user">Johnson Doe</span>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="user-profile"
          alt=""
        />
      </div>
      <hr className="border-line" />
    </div>
  );
}

export default Banner;
