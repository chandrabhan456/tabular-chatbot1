import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState({
    Chat01: [], // Initialize Chat01 with an empty array
  });
  const [inputValue, setInputValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [chatList, setChatList] = useState(["Chat01"]);

  // State to hold the current chat
  const [currentChat, setCurrentChat] = useState("Chat01");
  const addNewChat = () => {
    const nextChatNumber = chatList.length + 1;
    const newChatId = `Chat${
      nextChatNumber < 10 ? "0" + nextChatNumber : nextChatNumber
    }`;
    setChatList([...chatList, newChatId]);
    setCurrentChat(newChatId);
    setMessages((prevMessages) => ({ ...prevMessages, [newChatId]: [] })); // Initialize empty message array for new chat
  };
  const toggleHistory = () => {
    setShowHistory((prevState) => !prevState);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

 const handleSendMessage = () => {
    if (inputValue.trim() !== '' && currentChat) {
      // Ensure the currentChat has been initialized in messages
      if (!messages[currentChat]) {
        setMessages((prevMessages) => ({ ...prevMessages, [currentChat]: [] }));
      }
 
      // Add user message to current chat
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChat]: [...prevMessages[currentChat], { sender: 'user', text: inputValue }]
      }));
     
 
      const fetchBotResponse = async (currentChat, setMessages) => {
  try {
    const response = await fetch('http://localhost:8000/gdpr/qa_chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: inputValue }), // Send the query as expected by the API
    });
 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
 
    const data = await response.json();
 
    // Update the state with the bot's response
    setMessages((prevMessages) => ({
      ...prevMessages,
      [currentChat]: [
        ...prevMessages[currentChat],
        { sender: 'bot', text: data.answer } // Assuming the API returns the bot's message in `data.reply`
      ],
    }));
  } catch (error) {
    console.error('Error fetching bot response:', error);
  }
};
 
// Use the function to fetch the bot response
setTimeout(() => {
  fetchBotResponse(currentChat, setMessages);
}, 100);
setInputValue('');
 
    }
  };
 
  useEffect(() => {}, [showHistory, currentChat, inputValue]);

  return (
    <div className="h-screen bg-white flex  ">
      <div
        className={`page-container transition-all duration-300 ${
          showHistory ? "" : "w-full"
        }`}
        style={{ width: showHistory ? "70%" : "100%" }}
      >
        <div className="content-header">
          <p className="text-3xl">Tabular Chatbot </p>

          <div
            className="button-group1"
            style={{
              display: "flex",
              gap: "10px",
              position: "absolute",
              right: "0",
            }}
          >
            <button className="history-button text-xl" onClick={toggleHistory}>
             Chat History
            </button>
           
          </div>
        </div>
      
        {messages[currentChat].length !== 0 && (
          <div className="chat-container p-4">
            {(messages[currentChat] || []).map((message, index) => (
              <div
                key={index}
                className={`mb-4  ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
                style={{ display: "flex" }} // Explicitly ensure flex display
              >
                <div
                  className={` items-center justify-center  p-2 rounded flex-shrink border w-fit max-w-[65%] min-w-[48px] min-h-[65px]  break-words whitespace-normal ${
                    message.sender === "user"
                      ? "bg-[#EDF5FD] text-black border-gray-200"
                      : "bg-white text-black border-gray-200"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="input-container ">
          <textarea
            className="question-input0 dark:bg-[#1e1e1e] bg-white  border border-gray-300 dark:border-[#4f4f4f]  dark:text-white text-black"
            placeholder="Type your question here..."
            value={inputValue}
            onChange={handleInputChange}
          ></textarea>

          <button className="send-button" onClick={handleSendMessage}>
            <FiSend className="send-icon" />
          </button>
        </div>
      </div>
      {showHistory && (
        <div className="history-box ml-2 transition-all duration-300 text-left m-0">
          <h2 className="history-title">Chat History</h2>
          <ul className="chat-list">
            {chatList.map((chat, index) => (
              <li
                key={index}
                className={`chat-item ${currentChat === chat ? "active" : ""}`}
                onClick={() => setCurrentChat(chat)} // Set current chat on click
              >
                {chat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Chatbot;