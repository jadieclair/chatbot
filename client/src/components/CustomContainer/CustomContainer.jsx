// Importing React library to create React components
import React from "react";

// Importing the CSS file for styling
import "./customContainer.css";

// Functional component named CustomContainer using arrow function syntax, taking 'props' as its parameter
const CustomContainer = (props) => {
  // Destructuring props to extract 'className', 'children', and any other remaining properties
  const { className, children, ...rest } = props;

  // Returning a div element with classes "custom-container" and any additional classes provided through props
  // Also, spreading any remaining properties onto the div element
  return (
    <div className={`custom-container ${className || ""}`} {...rest}>
      {/* Rendering the children components within the div */}
      {children}
    </div>
  );
};

// Exporting the CustomContainer component to make it available for other parts of the application
export default CustomContainer;
