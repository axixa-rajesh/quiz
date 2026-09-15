import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Plus,
  MessageSquare,
  BarChart3,
  BookOpen,
  Users,
  FileQuestion,
} from "lucide-react";
import "./GenAI.css";

function GenAI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const suggestions = [
    {
      icon: <BarChart3 size={18} />,
      title: "Analyze quiz performance",
      text: "Give me a summary of recent quiz performance",
    },
    {
      icon: <BookOpen size={18} />,
      title: "Create quiz questions",
      text: "Create 5 MCQ questions for a topic",
    },
    {
      icon: <Users size={18} />,
      title: "Student insights",
      text: "Show me insights about student performance",
    },
    {
      icon: <FileQuestion size={18} />,
      title: "Question ideas",
      text: "Suggest questions for my question bank",
    },
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: message,
      },
    ]);

    setMessage("");
  };

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  return (
    <div className="gen-ai-page">

      {/* Header */}
      <div className="gen-ai-header">
        <div className="gen-ai-title">
          <div className="gen-ai-icon">
            <Sparkles size={22} />
          </div>

          <div>
            <h1>Gen AI</h1>
            <p>Smart assistance for your quiz management system</p>
          </div>
        </div>

        <button
          className="new-chat-btn"
          onClick={() => setMessages([])}>
          <Plus size={17} />
          New Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="gen-ai-content">

        {messages.length === 0 ? (
          <div className="gen-ai-welcome">

            <div className="welcome-icon">
              <Sparkles size={30} />
            </div>

            <h2>How can I help you?</h2>

            <p>
              Ask questions, analyze quiz data, generate questions,
              or get insights about your quiz system.
            </p>

            {/* Suggestions */}
            <div className="ai-suggestions">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  className="suggestion-card"
                  onClick={() => handleSuggestion(item.text)}
                >
                  <div className="suggestion-icon">
                    {item.icon}
                  </div>

                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        ) : (
          <div className="chat-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.type}`}>
                <div className="message-avatar">
                  {msg.type === "user" ? "KS" : <Sparkles size={16} />}
                </div>

                <div className="message-text">
                  {msg.text}
                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* Input */}
      <div className="gen-ai-input-wrapper">

        <div className="gen-ai-input-box">

          <MessageSquare size={18} />

          <input
            type="text"
            placeholder="Ask Gen AI anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}/>

          <button
            className="send-ai-btn"
            onClick={sendMessage}
            disabled={!message.trim()}>
            <Send size={17} />
          </button>

        </div>

        <small>
          Gen AI can help you analyze quizzes, generate questions and understand
          student performance.
        </small>

      </div>

    </div>
  );
}

export default GenAI;