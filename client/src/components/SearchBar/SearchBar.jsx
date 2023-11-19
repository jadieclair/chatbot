// Importing React and the CSS file for styling
import React, { useState } from "react";
import "./searchBar.css";

// Importing icons used in the search bar
import SearchBarSentIcon from "../Icons/SearchBarSentIcon";
import SpeakerIcon from "../Icons/SpeakerIcon";
import DeleteIcon from "../Icons/DeleteIcon";

// Functional component named SearchBar, which receives several props
const SearchBar = ({
  updateResults,
  currentResults,
  previousChats,
  chatHistory,
  setChathistory,
}) => {
  // Using the useState hook to manage the input value
  const [value, setValue] = useState("");

  // Function to get messages from the server and update the results
  const getMessages = async () => {
    // Setting up options for the fetch request
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Making a POST request to the server for message completion
      const response = await fetch(
        "http://localhost:3000/completions",
        options
      );

      // Checking if the response status is OK (200)
      if (!response.ok) {
        // Throwing an error if the response is not OK
        throw new Error(`Server error: ${response.statusText}`);
      }

      // Parsing the response data
      const data = await response.json();
      console.log(data);

      // Checking if the expected data structure is present
      if (
        !data.choices ||
        !data.choices[0].message ||
        !data.choices[0].message.content
      ) {
        // Throwing an error if the data structure is not as expected
        throw new Error("Invalid response data structure");
      }

      // Updating the results with the received data and resetting the input value
      updateResults(value, data.choices[0].message.content);
      setValue("");
    } catch (error) {
      // Logging and handling errors
      console.error(error);
    }
  };

  // JSX for rendering the search bar based on different conditions
  return (
    <>
      {/* If there is no chat history or there are current results */}
      {!chatHistory || currentResults ? (
        <div className="search-bar">
          {/* Input field for typing messages */}
          {!currentResults ? (
            <input
              className="textarea"
              type="text"
              placeholder="Write Coding about new HTML Tags"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            // Disabled input field when there are current results
            <input
              disabled
              className="textarea"
              value={"Write Coding about new HTML Tags"}
              placeholder="Please select if the answer is correct or incorrect?"
            />
          )}
          {/* Icon for sending the search query */}
          <span className="navigation-icon">
            <div onClick={getMessages}>
              <SearchBarSentIcon />
            </div>
          </span>
        </div>
      ) : (
        // If there is chat history and no current results
        <>
          {/* Chat suggestion box */}
          <div className="chat-suggestion-box">
            <p className="chat-title">Chat Suggestions</p>
            {/* Container for chat suggestion buttons */}
            <div className="chat-btns-container">
              {/* Button to write JavaScript code */}
              <button
                className="chat-suggestion-btns"
                onClick={() => setChathistory("")}
              >
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
          {/* Large search bar with input field and icons */}
          <div className="search-bar-big">
            <input
              className="textarea"
              type="text"
              placeholder="Write Coding about new HTML Tags"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {/* Icon for speaker and icon for sending the search query */}
            <span className="navigation-icon-big">
              <SpeakerIcon />
              <div onClick={getMessages}>
                <SearchBarSentIcon />
              </div>
            </span>
          </div>
        </>
      )}
    </>
  );
};

// Exporting the SearchBar component to make it available for other parts of the application
export default SearchBar;
