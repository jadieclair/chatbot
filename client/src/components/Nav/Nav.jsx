// Importing necessary dependencies and components from React and external libraries
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Importing CSS file for styling
import "./nav.css";

// Importing the Superpage logo as an image component
import Logo from "../../assets/chatlogo.png";

// Importing custom navigation button component
import CusomNavButton from "../CusomNavButton";

// Importing icons for various navigation buttons
import AichatIcon from "../Icons/AichatIcon";
import MembersIcon from "../Icons/MembersIcon";
import IntegrationsIcon from "../Icons/IntegrationsIcon";
import FriendsIcon from "../Icons/FriendsIcon";
import PricingIcon from "../Icons/PricingIcon";
import SettingsIcon from "../Icons/SettingsIcon";

// Functional component named Nav
function Nav() {
  // Initializing the useNavigate hook from React Router for programmatic navigation
  const navigate = useNavigate();

  // Function to handle the logout button click
  const handleDelete = () => {
    // Logging to the console to indicate that the button was pressed
    console.log("button pressed");

    // Sending a GET request to the server to logout
    axios
      .get("http://localhost:3000/logout")
      .then((res) => {
        // Reloading the window after successful logout
        window.location.reload(true);
      })
      .catch((err) => console.log(err));

    // Navigating to the "/login" route after logout
    navigate("/login");
  };

  // Rendering the JSX for the navigation component
  return (
    <>
      {/* Main container div with flex layout */}
      <div className="felx-container">
        {/* Side navigation bar */}
        <div className="side-nav">
          {/* Logo and header section */}
          <span className="logo-header">
            <img src={Logo} className="logo" alt="Small purple logo" />
            <h2 className="nav-header">Superpage</h2>
          </span>

          {/* Navigation buttons section */}
          <div>
            <ul>
              {/* Custom navigation button for AiChat with a link to the home page */}
              <CusomNavButton svgIcon={<AichatIcon />} name="AiChat">
                <Link to="/">AiChat Link</Link>
              </CusomNavButton>

              {/* Custom navigation button for Members */}
              <CusomNavButton svgIcon={<MembersIcon />} name="Members" />

              {/* Custom navigation button for Integrations with a specific class */}
              <CusomNavButton
                svgIcon={<IntegrationsIcon />}
                name="Integrations"
                className="nav-list"
              />

              {/* Custom navigation button for Refer friends with a specific class */}
              <CusomNavButton
                svgIcon={<FriendsIcon />}
                name="Refer friends"
                className="nav-list"
              />

              {/* Custom navigation button for Pricing Plans with a specific class */}
              <CusomNavButton
                svgIcon={<PricingIcon />}
                name="Pricing Plans"
                className="nav-list"
              />

              {/* Custom navigation button for Settings with a click event to handle logout */}
              <div onClick={handleDelete}>
                <CusomNavButton
                  svgIcon={<SettingsIcon />}
                  name="Settings"
                  className="nav-list"
                ></CusomNavButton>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// Exporting the Nav component to make it available for other parts of the application
export default Nav;
