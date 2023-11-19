// Importing React, useState and useEffect hooks, styling, and necessary components
import React, { useState, useEffect } from "react";
import "../../styles.css";
import "../Home/home.css";
import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import img from "../../assets/messageIcon.png";
import Subtext from "../../components/Subtext/Subtext";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchBarBig from "../../components/SearchBarBig/SearchBarBig";
import CustomContainer from "../../components/CustomContainer/CustomContainer";
import ContinueChatBtn from "../../components/ContinueChatBtn/ContinueChatBtn";
import EllipsisIcon from "../../components/Icons/EllipsisIcon";
import chatIcon from "../../assets/chatIcon.png";
import Unlike from "../../components/Buttons/Unlike";
import Like from "../../components/Buttons/Like";
import axios from "axios";

// Functional component named Home
function Home() {
  // State to store the current question results in an array
  const [currentResults, setCurrentResults] = useState("");

  // State for previous chats
  const [previousChats, setPreviousChats] = useState();

  // State for chat history
  const [chatHistory, setChathistory] = useState();

  console.log(currentResults);

  // Function to clear chats
  const clearChats = () => {
    console.log(currentResults);
    setCurrentResults("");
  };

  // Function to update results
  const updateResults = (promptValue, resultMessage) => {
    setCurrentResults([{ prompt: promptValue, result: resultMessage }]);
    console.log(currentResults);
  };

  // Function to save chat
  const saveChat = async () => {
    console.log("Saved Chat");
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: currentResults,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // Making a POST request to save chat data
      fetch("http://localhost:3000/saveData", options);
    } catch (error) {
      // Handling errors during the fetch
      console.error(error);
    }
    setCurrentResults("");
  };

  // useEffect to fetch chat history on component mount
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/getHistory",
    }).then(function (response) {
      console.log(response.data);
      if (!response.data[0]) {
        return;
      } else {
        setChathistory(response.data);
      }
    });
  }, [currentResults]);

  // JSX for rendering the Home component
  return (
    <div className="container">
      <Nav />
      <Banner />
      <div className={!chatHistory || !currentResults ? null : "hidden"}>
        <Subtext />
      </div>

      {!previousChats ? (
        <CustomContainer>
          {!currentResults ? (
            <div>
              {!chatHistory ? (
                <div>
                  <h2 className="search-history-title">Search History</h2>
                  <div className="home-text">
                    <span className="chat-icon3">
                      <img
                        src={img}
                        alt=""
                        style={{ width: "150px", height: "150px" }}
                      />
                    </span>
                    <div>
                      <span className="chat-text">No Questions added</span>
                      <span className="chat-sub-text">
                        Type your questions to below input and get fast answers
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat-history-container">
                  <h2 className="search-chat-history">Search History</h2>
                  <div className="clear-chat-button">
                    <ContinueChatBtn className="Clear Chat History" />
                  </div>
                  <div className="chat-history">
                    {chatHistory.map((item, index) => (
                      <div className="header-text1" key={index}>
                        <h5 className="question"> {item.questions}</h5>
                        <p className="answer">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="top-span">
                <img src={chatIcon} className="search-history-icont1" alt="" />

                <span className="ellipsis-icon">
                  <EllipsisIcon />
                </span>
              </div>
              <div className="results-container">
                {currentResults.map((result, index) => (
                  <div key={index} className="result-item">
                    <h5 className="prompt">{result.prompt}</h5>
                    <p className="result">{result.result}</p>
                  </div>
                ))}
              </div>
              <div className="answer-feedback">
                <div onClick={saveChat}>
                  <Like />
                </div>
                <div onClick={clearChats}>
                  <Unlike />
                </div>
              </div>
            </div>
          )}
        </CustomContainer>
      ) : (
        <></>
      )}

      {/* Rendering the SearchBar component */}
      <SearchBar
        updateResults={updateResults}
        currentResults={currentResults}
        previousChats={previousChats}
        chatHistory={chatHistory}
        setChathistory={setChathistory}
      />

      <p className="footer-text-home">Superpage AI Chat V1.2</p>
    </div>
  );
}

// Exporting the Home component to make it available for other parts of the application
export default Home;
