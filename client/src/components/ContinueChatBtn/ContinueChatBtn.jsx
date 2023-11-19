// Importing React library to create React components
import React from "react";

// Importing the CSS file for styling
import "./continueChatBtn.css";

// Functional component named ContinueChatBtn that takes props as its parameter
function ContinueChatBtn(props) {
  return (
    // The main container div with the class "continue-chat-btn" for styling
    <div className="continue-chat-btn">
      {/* Button element with the class "chat-buttons" for styling */}
      <button className="chat-buttons">
        {/* Displaying the text content of the button and the provided class name from props */}
        {props.buttonName} {props.className}
      </button>
    </div>
  );
}

// Exporting the ContinueChatBtn component to make it available for other parts of the application
export default ContinueChatBtn;
