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
    // Scroll to top when component mounts or messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
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
      let errorMessage = "Something went wrong.";

      if (error.message.includes("401")) {
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
    <div className="flex h-full bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Left Sidebar - Chat History */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black">Chat History</h2>
          <button
            onClick={handleClearChat}
            title="Clear chat"
            className="text-gray-500 hover:text-red-600 transition text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2">
          {historyLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-xs text-gray-500">Loading...</p>
            </div>
          ) : chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                onClick={() => handleHistoryClick(msg)}
                className={`p-3 rounded-lg border cursor-pointer transition text-sm text-black max-h-20 overflow-hidden ${
                  selectedHistoryIndex === allHistoryMessages.findIndex(
                    (m) => m.role === "user" && m.content === msg.content
                  )
                    ? "bg-red-100 border-primary"
                    : "bg-white border-gray-200 hover:border-primary hover:bg-red-50"
                }`}
              >
                <p className="font-medium truncate">{msg.content?.substring(0, 50)}...</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.created_at || Date.now()).toLocaleTimeString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 text-center mt-6">No chat history yet</p>
          )}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">SQL-RAG Database Assistant</h1>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
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
              className={`flex flex-col max-w-[75%] ${
                msg.role === "user"
                  ? "ml-auto items-end"
                  : "items-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl whitespace-pre-wrap transition-all duration-300 ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </div>

              {/* Timestamp */}
              <span className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}

          {!historyLoading && (
            <>
              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-center">
                  <span className="roller text-2xl" />
                </div>
              )}

              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about database tables, assets, maintenance, etc..."
            disabled={loading || historyLoading}
            className="flex-1 bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition text-black disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={loading || historyLoading}
            className="bg-primary p-3 rounded-full hover:bg-red-700 transition disabled:opacity-50 text-white flex items-center justify-center"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default SqlRag;
