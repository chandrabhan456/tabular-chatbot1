import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import "./Chatbot.css";

import { ThumbsUp, ThumbsDown, Copy, Download } from "lucide-react";
import { data } from "react-router-dom";
const Chatbot = () => {
  const [messages, setMessages] = useState({
    Chat01: [], // Initialize Chat01 with an empty array
  });
  const [inputValue, setInputValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [chatList, setChatList] = useState(["Chat01"]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [likedIndex, setLikedIndex] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  // State to hold the current chat
  const [ambiguous,setAmbiguous] = useState(true)
    const [suggestion,setSuggestion] = useState(false)
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

  function handleSuggestionClick(suggestion) {
    // Handle the suggestion click event
    console.log("Suggestion clicked:", suggestion);
    setInputValue(suggestion)
    setSuggestion(true)
    // Implement any logic needed when a suggestion is clicked
  }
  const handleSendMessage = async () => {
    if ((!inputValue.trim() && !suggestion) ) return;
    
    if (!messages[currentChat]) {
      setMessages((prevMessages) => ({ ...prevMessages, [currentChat]: [] }));
    }

    // Add user message to current chat
 
    
    setMessages((prevMessages) => ({
      ...prevMessages,
      [currentChat]: [
        ...prevMessages[currentChat],
        { role: "user", content: inputValue },
      ],
    }));
  
    setInputValue("");

   
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/check-ambiguity", {
        method: "POST",
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_query: inputValue.trim(),
      session_id: "string" // Replace with the actual session_id if available
    }),
      });
     
      if (res.ok) {
        
        const data = await res.json();
        console.log("ffffffffffff", data);
        const endTime = performance.now();
        const timeTaken = data.response_time; //((endTime - startTime) / 1000).toFixed(2);
        setAmbiguous(data.ambiguous)
        setResponseTime(timeTaken);
           if(data.ambiguous === false){
          
          handleSendMessage2()
        }
        else{
      const assistantMsg = {
        role: "assistant",
        content: data.clarification,
        suggestion: data.suggestions, // Combine suggestions into a single string
      };


        setMessages((prevMessages) => ({
          ...prevMessages,
          [currentChat]: [...prevMessages[currentChat], assistantMsg],
        }));
      }
      }
    } catch (error) {
      
      console.error("Generation error:", error);
    

      const assistantMsg = {
        role: "assistant",
        content: "something went wrong"
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChat]: [...prevMessages[currentChat], assistantMsg],
      }));
    } finally {
     
      setIsTyping(false);
      
      //setLoading(false);
    }
  };
  const handleSendMessage2 = async () => {
     
    if ((!inputValue.trim() && !suggestion) ) return;
   
    if (!messages[currentChat]) {
      setMessages((prevMessages) => ({ ...prevMessages, [currentChat]: [] }));
    }

    // Add user message to current chat
 
    
   
    setInputValue("");

   
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/text-to-sql", {
        method: "POST",
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_query: inputValue.trim(),
      session_id: "string" // Replace with the actual session_id if available
    }),
      });
     
      if (res.ok) {
        
        const data = await res.json();
        console.log("ffffffffffff", data);
        const endTime = performance.now();
        const timeTaken = data.response_time; //((endTime - startTime) / 1000).toFixed(2);

        setResponseTime(timeTaken);
       
        setAmbiguous(true)
      const assistantMsg = {
        role: "assistant",
        content: data.sql_query,
        suggestion: data.suggestions, // Combine suggestions into a single string
      };


        setMessages((prevMessages) => ({
          ...prevMessages,
          [currentChat]: [...prevMessages[currentChat], assistantMsg],
        }));
      }
    } catch (error) {
      
      console.error("Generation error:", error);
    

      const assistantMsg = {
        role: "assistant",
        content: "something went wrong"
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChat]: [...prevMessages[currentChat], assistantMsg],
      }));
    } finally {
   
      setIsTyping(false);
      //setLoading(false);
    }
  };
   const handleSendMessage1 = async () => {
    if ((!inputValue.trim() && !suggestion) ) return;
    
    if (!messages[currentChat]) {
      setMessages((prevMessages) => ({ ...prevMessages, [currentChat]: [] }));
    }

    // Add user message to current chat
 
    
    setMessages((prevMessages) => ({
      ...prevMessages,
      [currentChat]: [
        ...prevMessages[currentChat],
        { role: "user", content: inputValue },
      ],
    }));
  
    setInputValue("");

   
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/clarify-ambiguity", {
        method: "POST",
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      clarification: inputValue.trim(),
      session_id: "string" // Replace with the actual session_id if available
    }),
      });
     
      if (res.ok) {
        
        const data = await res.json();
        console.log("ffffffffffff", data);
        const endTime = performance.now();
        const timeTaken = data.response_time; //((endTime - startTime) / 1000).toFixed(2);

        setResponseTime(timeTaken);
        setAmbiguous(data.ambiguous)
        if(data.ambiguous === false){
          
          handleSendMessage2()
        }
        setSuggestion(false)
     
      }
    } catch (error) {
      
      console.error("Generation error:", error);
    

      const assistantMsg = {
        role: "assistant",
        content: "something went wrong"
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChat]: [...prevMessages[currentChat], assistantMsg],
      }));
    } finally {
   
     
      setIsTyping(false);
      
      //setLoading(false);
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
          <p className="text-3xl">{currentChat} </p>

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
            <button className="new-chat-button text-xl" onClick={addNewChat}>
              New Chat
            </button>
          </div>
        </div>

        {messages[currentChat].length !== 0 && (
          <div className="chat-container p-4">
            {(messages[currentChat] || []).map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`} // Explicitly ensure flex display
              >
                <div
                  className={` items-center justify-center  p-2 rounded flex-shrink border w-fit max-w-[65%] min-w-[48px] min-h-[65px]  break-words whitespace-normal ${
                    msg.role === "user"
                      ? "bg-[#EDF5FD] text-black border-gray-200"
                      : "bg-white text-black border-gray-200"
                  }`}
                >
                  {msg.role === "assistant"
                    ? ` ${msg.content}`
                    : ` ${msg.content}`}
                  {msg.suggestion &&
                    msg.suggestion.map((suggestion, index) => (
                      <div key={index} className="mt-2 items-left">
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="mt-1 text-blue-700 text-sm hover:underline"
                        >
                          {suggestion}
                        </button>
                      </div>
                    ))}
                </div>

                {msg.role === "assistant" && (
                  <div className="flex gap-2 mt-1 text-blue-700">
                    <ThumbsUp
                      className={`w-4 h-4 cursor-pointer transition ${
                        likedIndex === `up-${i}`
                          ? "fill-blue-600"
                          : "hover:text-blue-600"
                      }`}
                      onClick={() => setLikedIndex(`up-${i}`)}
                    />
                    <ThumbsDown
                      className={`w-4 h-4 cursor-pointer transition ${
                        likedIndex === `down-${i}`
                          ? "fill-blue-600"
                          : "hover:text-blue-600"
                      }`}
                      onClick={() => setLikedIndex(`down-${i}`)}
                    />
                    <Copy
                      className={`w-4 h-4 cursor-pointer transition ${
                        copiedIndex === i
                          ? "text-green-600 scale-110"
                          : "hover:text-blue-600"
                      }`}
                      onClick={() => handleCopy(msg.content, i)}
                    />
                    {copiedIndex === i && (
                      <span className="text-xs text-green-600 font-medium">
                        Copied!
                      </span>
                    )}

                    {msg.timeTaken && (
                      <>
                        <span className="text-xs text-gray-500 ml-2">
                          ⏱️ {msg.timeTaken}s
                        </span>
                        <span
                          className="text-lg text-gray-500 ml-2"
                          style={{ marginTop: "-8px" }}
                        >
                          $
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="items-center justify-center p-2 rounded bg-white text-black border border-gray-200 animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="input-container ">
          <textarea
            className="question-input0 dark:bg-[#1e1e1e] bg-white  border border-gray-300 dark:border-[#4f4f4f]  dark:text-white text-black"
            placeholder="Type your question here..."
            value={inputValue}
            onChange={handleInputChange}
          ></textarea>

          {(ambiguous && !suggestion) && <button className="send-button" onClick={handleSendMessage}>
            <FiSend className="send-icon" />
          </button>}
          {(ambiguous && suggestion) && <button className="send-button" onClick={handleSendMessage1}>
            <FiSend className="send-icon" />
          </button>}
        </div>
      </div>
      {showHistory && (
        <div className="history-box ml-2 mt-2 transition-all duration-300 text-left m-0">
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
