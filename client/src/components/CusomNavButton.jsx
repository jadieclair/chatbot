// Importing React library for creating React components
import React from "react";

// Importing the CSS file for styling
import "./Nav/nav.css";

// Functional component named CusomNavButton
const CusomNavButton = ({ svgIcon, name }) => {
  // Rendering a list item with an SVG icon and a span for the button name
  return (
    <li className="ul-list">
      {svgIcon} {/* Displaying the provided SVG icon */}
      <span className="list-name">{name}</span>{" "}
      {/* Displaying the name of the button */}
    </li>
  );
};

// Exporting the CusomNavButton component to make it available for other parts of the application
export default CusomNavButton;
