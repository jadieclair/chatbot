// Importing React and the CSS file for styling
import React, { Component } from "react";
import "./searchBarBig.css";

// Importing icons used in the search bar
import SearchBarSentIcon from "../Icons/SearchBarSentIcon";
import SpeakerIcon from "../Icons/SpeakerIcon";
import DeleteIcon from "../Icons/DeleteIcon";

// Class component named SearchBar
export class SearchBar extends Component {
  render() {
    return (
      <>
        {/* Chat suggestion box */}
        <div className="chat-suggestion-box">
          <p className="chat-title">Chat Suggestions</p>
          {/* Container for chat suggestion buttons */}
          <div className="chat-btns-container">
            {/* Button to write JavaScript code */}
            <button className="chat-suggestion-btns">
              Write Js code for it
            </button>
            {/* Additional chat suggestion buttons */}
            <button className="chat-suggestion-btns">Explain more</button>
            <button className="chat-suggestion-btns">Explain more</button>
            <button className="chat-suggestion-btns">Explain more</button>
            <button className="chat-suggestion-btns">Explain more</button>

            {/* Icon for deleting suggestions */}
            <span className="delete-icon">
              <DeleteIcon />
            </span>
          </div>
        </div>
        {/* Large search bar with textarea input field and icons */}
        <div className="search-bar-big">
          <textarea
            className="textarea"
            type="text"
            placeholder="Type new questions"
          />
          {/* Icon for speaker and icon for sending the search query */}
          <span className="navigation-icon-big">
            <SpeakerIcon />
            <SearchBarSentIcon />
          </span>
        </div>
      </>
    );
  }
}

// Exporting the SearchBar component to make it available for other parts of the application
export default SearchBar;
