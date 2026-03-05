import { useState, useRef, useEffect } from "react";
import { askSqlRag, getSqlRagHistory } from "../api/sqlRagApi";

const SqlRag = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello 👋 I am your SQL-RAG Assistant. Ask me questions about the database and I'll provide you with detailed insights!",
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [allHistoryMessages, setAllHistoryMessages] = useState([]);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(null);
  const [sessionId] = useState("sql-rag-session-1");
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Load chat history on component mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getSqlRagHistory();
        if (history.history && history.history.length > 0) {
          // Filter to only show user messages (questions) in history
          const userMessages = history.history.filter(msg => msg.role === "user");
          const allMessages = history.history.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.created_at || Date.now())
          }));

          setChatHistory(userMessages);
          setAllHistoryMessages(allMessages);
          // Don't load messages by default - keep chat clear but store history
        }
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setHistoryLoading(false);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    // Scroll to bottom when component mounts or messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await askSqlRag(input, sessionId);

      const aiMessage = {
        role: "assistant",
        content: response.answer,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      let errorMessage = error.message || "Something went wrong.";

      if (error.message?.includes("401")) {
        errorMessage = "Session expired. Please login again.";
      }

      if (error.message.includes("403")) {
        errorMessage = "You do not have permission to use SQL-RAG.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleHistoryClick = (selectedUserMessage) => {
    // Find the index of this user message in allHistoryMessages
    const userMessageIndex = allHistoryMessages.findIndex(
      (msg) => msg.role === "user" && msg.content === selectedUserMessage.content
    );

    if (userMessageIndex !== -1) {
      setSelectedHistoryIndex(userMessageIndex);

      // Get all messages up to and including the next AI response
      let conversationMessages = [allHistoryMessages[userMessageIndex]];

      // Find the corresponding AI response
      for (let i = userMessageIndex + 1; i < allHistoryMessages.length; i++) {
        conversationMessages.push(allHistoryMessages[i]);
        if (allHistoryMessages[i].role === "assistant") {
          break; // Stop at the first AI response
        }
      }

      setMessages([
        {
          role: "assistant",
          content:
            "Hello 👋 I am your SQL-RAG Assistant. Ask me questions about the database and I'll provide you with detailed insights!",
          timestamp: new Date()
        },
        ...conversationMessages
      ]);

      // Scroll to top
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello 👋 I am your SQL-RAG Assistant. Ask me questions about the database and I'll provide you with detailed insights!",
        timestamp: new Date()
      }
    ]);
    setSelectedHistoryIndex(null);
    setInput("");
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-4 md:-m-8 bg-white overflow-hidden">
      {/* Left Sidebar - Chat History */}
      <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 flex-shrink-0">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
          <h2 className="font-bold text-gray-800 tracking-wide flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            Chat History
          </h2>
          <button
            onClick={handleClearChat}
            title="Clear chat"
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {historyLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Loading...
            </div>
          ) : chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                onClick={() => handleHistoryClick(msg)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 text-sm border cursor-pointer ${selectedHistoryIndex === allHistoryMessages.findIndex(
                  (m) => m.role === "user" && m.content === msg.content
                )
                  ? "bg-red-50 border-red-200 shadow-sm"
                  : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
                  }`}
              >
                <div className="font-semibold text-gray-800 mb-1.5 flex items-center gap-2">
                  <span className="bg-gray-100 p-1 rounded-md text-xs">👤 You</span>
                </div>
                <div className="text-gray-600 line-clamp-2 leading-relaxed">
                  {msg.content}
                </div>
                <div className="text-gray-400 mt-2 text-xs font-medium uppercase tracking-wider">
                  {new Date(msg.created_at || Date.now()).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-xs text-gray-400 text-center">No chat history yet</p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 bg-opacity-50 relative">

        {/* Chat Content Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-4 shadow-sm">
          <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Data Intelligence Bot</h1>
            <p className="text-sm text-gray-500 font-medium">Your SQL-RAG assistant for querying raw database metrics</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">

          {/* Chat Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar">
            {historyLoading && (
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <div className="roller text-2xl mb-2" />
                  <p className="text-gray-500">Loading chat history...</p>
                </div>
              </div>
            )}

            {!historyLoading && messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>

                  {/* Avatar & Sender Name */}
                  <div className={`flex items-center gap-2 mb-1.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs shadow-sm ${msg.role === "user" ? "bg-gray-800 text-white" : "bg-red-600 text-white"
                      }`}>
                      {msg.role === "user" ? "U" : "AI"}
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      {msg.role === "user" ? "You" : "FleetIntellect"}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm  ${msg.role === "user"
                      ? "bg-gray-900 text-white rounded-tr-none"
                      : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-gray-400 mt-1.5 font-medium px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex w-full justify-start">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs shadow-sm bg-red-600 text-white">AI</div>
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm ml-2 flex gap-1.5 items-center h-12">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Box Area */}
          <div className={`bg-white p-2 rounded-2xl shadow-lg border border-gray-200 flex flex-col transition-all ${!historyLoading ? "focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-400" : "opacity-50"}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about database tables, assets, maintenance, etc..."
              disabled={loading || historyLoading}
              className="w-full bg-transparent p-1.5 outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base font-medium disabled:bg-transparent"
            />

            <div className="flex justify-between items-center px-2 pb-2 mt-1">
              <div className="text-xs text-gray-400 font-medium px-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                DB Connected
              </div>
              <button
                onClick={handleSend}
                disabled={loading || historyLoading || !input.trim()}
                className="bg-red-600 p-2.5 rounded-xl hover:bg-red-700 transition-all disabled:opacity-40 disabled:hover:bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -rotate-90 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="text-[10px] text-gray-400">AI responses may occasionally be inaccurate. Please verify critical fleet decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlRag;
