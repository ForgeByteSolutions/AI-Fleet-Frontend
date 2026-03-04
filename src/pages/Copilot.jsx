import { useState, useRef, useEffect } from "react";
import { askCopilot, getCopilotHistory } from "../api/copilotApi";
import { useDocuments } from "../context/DocumentsContext";

const Copilot = () => {
  const { documents } = useDocuments();

  const indexedCount = documents.filter(
    (doc) => doc.status === "Indexed"
  ).length;
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello 👋 I am your AI Fleet Copilot. How can I help you today?",
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState("fleet-session-1"); // simple static session for now
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts or messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  useEffect(() => {
    // Fetch copilot history on mount
    const fetchHistory = async () => {
      setHistoryLoading(true);
      try {
        const response = await getCopilotHistory();
        setHistory(response.history || []);
      } catch (error) {
        console.error("Failed to load history:", error);
        setHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, []);

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
      const response = await askCopilot(input, sessionId);

      const aiMessage = {
        role: "assistant",
        content: response.answer,
        sources: response.sources || [],
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      let errorMessage = "Something went wrong.";

      if (error.message.includes("401")) {
        errorMessage = "Session expired. Please login again.";
      }

      if (error.message.includes("403")) {
        errorMessage = "You do not have permission to use Copilot.";
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

  const handleLoadHistory = (clickedIndex) => {
    // Load conversation pair (user question + assistant response)
    const clickedItem = history[clickedIndex];
    const messagesToShow = [
      {
        role: "assistant",
        content: "Hello 👋 I am your AI Fleet Copilot. How can I help you today?",
        timestamp: new Date()
      }
    ];

    // If clicked on user message, add it and the next assistant response
    if (clickedItem.role === "user") {
      messagesToShow.push({
        role: "user",
        content: clickedItem.content,
        timestamp: new Date(clickedItem.created_at)
      });

      // Find the next assistant response
      for (let i = clickedIndex + 1; i < history.length; i++) {
        if (history[i].role === "assistant") {
          messagesToShow.push({
            role: "assistant",
            content: history[i].content,
            timestamp: new Date(history[i].created_at)
          });
          break;
        }
      }
    } else {
      // If clicked on assistant message, find the previous user message
      for (let i = clickedIndex - 1; i >= 0; i--) {
        if (history[i].role === "user") {
          messagesToShow.push({
            role: "user",
            content: history[i].content,
            timestamp: new Date(history[i].created_at)
          });
          break;
        }
      }
      messagesToShow.push({
        role: "assistant",
        content: clickedItem.content,
        timestamp: new Date(clickedItem.created_at)
      });
    }

    setMessages(messagesToShow);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Left Sidebar - History */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} h-full border-r border-gray-200 flex flex-col transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && <h2 className="font-semibold text-sm text-black">History</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded transition text-black"
            title={sidebarOpen ? "Collapse" : "Expand"}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto">
          {historyLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              {sidebarOpen && "Loading..."}
            </div>
          ) : history.length === 0 ? (
            <div className="p-4 text-xs text-gray-400 text-center">
              {sidebarOpen && "No history yet"}
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {history.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLoadHistory(index)}
                  className="w-full text-left p-2 rounded hover:bg-gray-100 transition text-xs border border-gray-200"
                  title={item.content}
                >
                  {sidebarOpen ? (
                    <>
                      <div className="font-medium text-gray-700 mb-1">
                        {item.role === "user" ? "You" : "Copilot"}
                      </div>
                      <div className="text-gray-600 line-clamp-2">
                        {item.content}
                      </div>
                      <div className="text-gray-400 mt-1 text-xs">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-600">
                      {item.role === "user" ? "👤" : "🤖"}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col text-black">
        {/* Hero Image */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src="/fleet-hero.jpg.png"
            alt="Fleet Operations"
            className="w-full h-full object-cover blur-sm"
          />
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <h1 className="text-2xl font-bold mb-4">AI Copilot</h1>
          {/* {indexedCount > 0 && (
      <div className="bg-green-900 text-green-400 px-4 py-2 rounded-lg mb-4">
        📄 {indexedCount} Document{indexedCount > 1 ? "s" : ""} Ready for AI
      </div>
    )} */}
          {/* Chat Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[75%] ${msg.role === "user"
                    ? "ml-auto items-end"
                    : "items-start"
                  }`}
              >
                <div
                  className={`p-3 rounded-2xl whitespace-pre-wrap transition-all duration-300 ${msg.role === "user"
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

                {/* Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 text-xs text-gray-400">
                    <strong>Sources:</strong>
                    {msg.sources.map((src, i) => (
                      <div key={i}>• {src}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-center">
                <span className="roller text-2xl" />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask something about fleet..."
              className="flex-1 bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition text-black"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-primary p-3 rounded-full hover:bg-red-700 transition disabled:opacity-50 text-white flex items-center justify-center"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copilot;