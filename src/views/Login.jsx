import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const {setMainPage,login1,setlogin1} = useStateContext();
  
 

  const handleLogin = () => {
    if (email && password) {
     
     localStorage.setItem('login','true');
        setMainPage(true)
        setlogin1(true)
    }
  };

  return (

    <div className="flex w-full h-screen font-sans">
      {/* Left Section */}
      <div className="w-1/2 bg-[#003366] text-white flex flex-col justify-center p-16">
        <h1 className="text-4xl font-bold mb-6">Tabular chatbot</h1>
        <p className="text-lg mb-8">
          Access <span className="font-semibold text-blue-300">intelligent tools</span> to interact with tabular data, ask questions, and extract insights with ease.
        </p>
        <p className="mb-8 font-medium">Never lose your potential <span className="text-blue-300">customers</span></p>
        <div className="space-y-4">
          <div className="bg-[#004080] p-4 rounded flex items-center space-x-4">
            <img src="https://img.icons8.com/ios-filled/24/artificial-intelligence.png" alt="icon" />
            <span>Natural Language Querying</span>
          </div>
          <div className="bg-[#004080] p-4 rounded flex items-center space-x-4">
            <img src="https://img.icons8.com/ios-filled/24/filter.png" alt="icon" />
            <span>Data Filtering and Summarization</span>
          </div>
            <div className="bg-[#004080] p-4 rounded flex items-center space-x-4">
          <img src="https://img.icons8.com/ios-filled/24/table.png" alt="icon" />
          <span>Instant Insights from Tables</span>
        </div>
      </div>
    </div>
        
      {/* Right Section */ }
    < div className = "w-1/2 flex items-center justify-center bg-gray-50" >
      <div className="w-full max-w-sm bg-white p-10 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-2">
            <img src="https://img.icons8.com/ios-filled/32/user-male-circle.png" alt="user" />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">Sales Rep Login</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your credentials to access Tabular Chartbot</p>
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-6"
          onChange={(e) => setPassword(e.target.value)}

        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded flex justify-center items-center gap-2"
        >
          Login
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        </div>
      </div >
    </div >
  );
}





