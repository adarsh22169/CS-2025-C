// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Smile, X, Moon, Sun, MessageCircle } from 'lucide-react';

// function MindCareBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   // Predefined responses and suggestions
//   const suggestions = [
//     "I'm feeling anxious today",
//     "How can I improve my sleep?",
//     "Stress management techniques",
//     "What are symptoms of depression?"
//   ];

//   // Initial greeting based on time of day
//   useEffect(() => {
//     const hour = new Date().getHours();
//     let greeting = "Hello! I'm your MindCare assistant. How can I help you today?";

//     if (hour < 12) {
//       greeting = "Good morning! I'm your MindCare assistant. How are you feeling today?";
//     } else if (hour < 18) {
//       greeting = "Good afternoon! I'm your MindCare assistant. How can I support your mental wellbeing today?";
//     } else {
//       greeting = "Good evening! I'm your MindCare assistant. How are you doing tonight?";
//     }

//     setMessages([{ text: greeting, sender: 'bot' }]);

//     // Check system preference for dark/light mode
//     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       setDarkMode(true);
//     }
//   }, []);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       setTimeout(() => {
//         inputRef.current?.focus();
//       }, 100);
//     }
//   };

//   const handleSend = async (e) => {
//     e?.preventDefault();
//     if (!input.trim()) return;

//     // Add user message
//     const userMessage = { text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);

//     // Clear input field and set loading state
//     setInput('');
//     setIsLoading(true);

//     // Simulate API response - in production, replace with actual API call
//     setTimeout(() => {
//       const userText = input.toLowerCase();
//       let botReply;

//       // Enhanced response logic
//       if (userText.includes('hello') || userText.includes('hi')) {
//         botReply = "Hello! How can I assist you with your mental wellbeing today?";
//       } else if (userText.includes('stress') || userText.includes('anxious') || userText.includes('anxiety')) {
//         botReply = "I understand dealing with stress can be challenging. Some evidence-based techniques include deep breathing exercises, progressive muscle relaxation, and mindfulness meditation. Would you like me to guide you through a quick relaxation exercise?";
//       } else if (userText.includes('sad') || userText.includes('depress') || userText.includes('unhappy')) {
//         botReply = "I'm sorry to hear you're feeling down. It's important to know that sadness is a normal emotion, but persistent feelings of sadness might need attention. Would you like some self-care suggestions or information about professional support options?";
//       } else if (userText.includes('sleep') || userText.includes('insomnia') || userText.includes('tired')) {
//         botReply = "Quality sleep is crucial for mental health. Consider establishing a regular sleep schedule, creating a relaxing bedtime routine, limiting screen time before bed, and ensuring your sleep environment is comfortable. Would you like more specific sleep hygiene tips?";
//       } else if (userText.includes('meditat') || userText.includes('mindful')) {
//         botReply = "Meditation is a powerful tool for mental wellbeing. Even just 5 minutes of mindful breathing can help reduce stress and improve focus. Would you like a simple meditation exercise to try?";
//       } else if (userText.includes('thank')) {
//         botReply = "You're very welcome! I'm here to support you whenever you need. Is there anything else I can help with today?";
//       } else if (userText.includes('help') || userText.includes('support')) {
//         botReply = "I can provide information about various mental health topics, relaxation techniques, and self-care practices. For immediate crisis support, please contact a mental health professional or a helpline. What specific area would you like assistance with?";
//       } else {
//         botReply = "Thank you for sharing. I'm here to support your mental wellbeing journey. Could you tell me more about what's on your mind, or perhaps you'd like information about a specific mental health topic?";
//       }

//       setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
//       setIsLoading(false);
//     }, 1000);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setInput(suggestion);
//     // Focus the input after setting suggestion
//     inputRef.current?.focus();
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // Detect Escape key to close chat
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape' && isOpen) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [isOpen]);

//   return (
//     <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end ${darkMode ? 'dark' : ''}`}>
//       {/* Chat button */}
//       <button
//         onClick={toggleChat}
//         className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//         aria-label={isOpen ? "Close chat" : "Open chat"}
//       >
//         {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
//       </button>

//       {/* Chat window */}
//       {isOpen && (
//         <div className={`w-80 sm:w-96 h-96 mt-4 rounded-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
//           {/* Header */}
//           <div className="p-4 flex justify-between items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
//             <div className="flex items-center">
//               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
//                 <span className="text-purple-600 text-xl font-bold">M</span>
//               </div>
//               <h3 className="font-bold">MindCare Assistant</h3>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={toggleDarkMode}
//                 className="p-1 rounded-full hover:bg-purple-500 transition-colors"
//                 aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//               >
//                 {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//               </button>
//               <button
//                 onClick={toggleChat}
//                 className="p-1 rounded-full hover:bg-purple-500 transition-colors"
//                 aria-label="Close chat"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Messages area */}
//           <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`mb-3 max-w-3/4 ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
//               >
//                 <div
//                   className={`p-3 rounded-lg inline-block ${msg.sender === 'user'
//                       ? `${darkMode ? 'bg-indigo-600' : 'bg-indigo-500'} text-white`
//                       : `${darkMode ? 'bg-gray-700' : 'bg-white'} ${darkMode ? 'text-gray-100' : 'text-gray-800'} shadow-md`
//                     }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="mb-3 max-w-3/4">
//                 <div className={`p-3 rounded-lg inline-block ${darkMode ? 'bg-gray-700' : 'bg-white'} ${darkMode ? 'text-gray-100' : 'text-gray-800'} shadow-md`}>
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                     <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                     <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Suggestions */}
//           <div className={`px-4 py-2 flex gap-2 overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
//             {suggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleSuggestionClick(suggestion)}
//                 className={`px-3 py-1 text-xs rounded-full whitespace-nowrap 
//                   ${darkMode
//                     ? 'bg-gray-700 text-purple-300 hover:bg-gray-600'
//                     : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} 
//                   transition-colors`}
//               >
//                 {suggestion}
//               </button>
//             ))}
//           </div>

//           {/* Input area */}
//           <form
//             onSubmit={handleSend}
//             className={`p-3 flex items-center ${darkMode ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}
//           >
//             <input
//               ref={inputRef}
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className={`flex-1 p-2 rounded-lg focus:outline-none ${darkMode
//                   ? 'bg-gray-800 text-white border border-gray-700 focus:border-purple-500'
//                   : 'bg-gray-100 text-gray-800 focus:ring-2 focus:ring-purple-300'
//                 }`}
//             />
//             <button
//               type="submit"
//               disabled={!input.trim()}
//               className={`ml-2 p-2 rounded-lg ${input.trim()
//                   ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
//                   : `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-400'}`
//                 } focus:outline-none transition-colors`}
//               aria-label="Send message"
//             >
//               <Send size={20} />
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MindCareBot;



"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, X, Minimize2, Maximize2 } from "lucide-react"

function MindCareBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm MindCare's virtual assistant. How can I help you today?",
      sender: "bot",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Sample responses based on keywords
  const getBotResponse = (message) => {
    const lowerCaseMsg = message.toLowerCase()

    // Sleep issues
    if (lowerCaseMsg.includes("sleep") || lowerCaseMsg.includes("insomnia") || lowerCaseMsg.includes("can't sleep")) {
      return "Sleep problems are common with many mental health conditions. Try establishing a regular sleep schedule, avoiding screens before bed, and creating a relaxing bedtime routine. Would you like more specific sleep tips?"
    }

    // Anxiety
    else if (lowerCaseMsg.includes("anxious") || lowerCaseMsg.includes("anxiety") || lowerCaseMsg.includes("worried")) {
      return "Anxiety can be challenging to deal with. Deep breathing exercises, mindfulness, and grounding techniques can help in the moment. Have you tried the 5-4-3-2-1 grounding technique?"
    }

    // Depression
    else if (lowerCaseMsg.includes("depress") || lowerCaseMsg.includes("sad") || lowerCaseMsg.includes("hopeless")) {
      return "I'm sorry to hear you're feeling this way. Depression is treatable, and reaching out is a great first step. Would you like to take our mental health assessment to help us understand how to support you better?"
    }

    // Assessment
    else if (
      lowerCaseMsg.includes("assessment") ||
      lowerCaseMsg.includes("test") ||
      lowerCaseMsg.includes("evaluate")
    ) {
      return "Our mental health assessment can help identify areas where you might need support. You can take it by clicking the 'Take Assessment' button in the Mental Health Conditions section, or I can direct you there now."
    }

    // Help
    else if (lowerCaseMsg.includes("help") || lowerCaseMsg.includes("support")) {
      return "MindCare offers various support options including personalized assessments, therapy resources, and self-help tools. What specific type of support are you looking for today?"
    }

    // Crisis
    else if (
      lowerCaseMsg.includes("suicid") ||
      lowerCaseMsg.includes("kill myself") ||
      lowerCaseMsg.includes("end my life")
    ) {
      return "If you're having thoughts of harming yourself, please reach out to a crisis helpline immediately: National Suicide Prevention Lifeline: 988 or 1-800-273-8255. Would you like me to provide more crisis resources?"
    }

    // Default response
    else {
      return "Thank you for sharing. If you're experiencing mental health challenges, our assessment can help identify the best support options for you. Is there something specific you'd like to know about our services?"
    }
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    // Add user message
    const userMessage = { text: inputMessage, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Show bot typing indicator
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(
      () => {
        const botResponse = { text: getBotResponse(inputMessage), sender: "bot" }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bot button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
        >
          <Bot className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isMinimized ? "w-72 h-16" : "w-80 sm:w-96 h-[500px]"}`}
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-indigo-700 to-violet-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-indigo-200" />
              <h3 className="font-semibold text-white">MindCare Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-indigo-200 hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-indigo-200 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages container */}
              <div className="p-4 h-[380px] overflow-y-auto bg-slate-800">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-slate-700 text-gray-200 rounded-tl-none"
                        }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-slate-700 text-gray-200 p-3 rounded-lg rounded-tl-none">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-slate-700 bg-slate-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ""}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default MindCareBot
