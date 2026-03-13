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
    // Scroll to bottom when component mounts or messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
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

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello 👋 I am your AI Fleet Copilot. How can I help you today?",
        timestamp: new Date()
      }
    ]);
    setInput("");
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };

  const handleLoadHistory = (clickedIndex) => {
    // Convert display index (from reversed array) to actual history array index
    const actualIndex = history.length - 1 - clickedIndex;
    const clickedItem = history[actualIndex];
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
      for (let i = actualIndex + 1; i < history.length; i++) {
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
      for (let i = actualIndex - 1; i >= 0; i--) {
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
    <div className="flex h-[calc(100vh-4rem)] -m-4 md:-m-8 bg-white overflow-hidden">
      {/* Left Sidebar - History */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} h-full bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 flex-shrink-0`}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
          {sidebarOpen ? (
            <h2 className="font-bold text-gray-800 tracking-wide flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Chat History
            </h2>
          ) : (
            <div className="w-full flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-800"
            title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* History List */}
        <div className="h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
              {[...history].reverse().map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLoadHistory(index)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 text-sm border ${false ? "bg-red-50 border-red-200 shadow-sm" : "bg-white border-gray-200 hover:border-red-300 hover:shadow-md"
                    }`}
                  title={item.content}
                >
                  {sidebarOpen ? (
                    <>
                      <div className="font-semibold text-gray-800 mb-1.5 flex items-center gap-2">
                        {item.role === "user" ? (
                          <span className="bg-gray-100 p-1 rounded-md text-xs">👤 You</span>
                        ) : (
                          <span className="bg-red-100 text-red-700 p-1 rounded-md text-xs font-bold">🤖 Copilot</span>
                        )}
                      </div>
                      <div className="text-gray-600 line-clamp-2 leading-relaxed">
                        {item.content}
                      </div>
                      <div className="text-gray-400 mt-2 text-xs font-medium uppercase tracking-wider">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-xl">
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
      <div className="flex-1 flex flex-col bg-gray-50 bg-opacity-50 relative">

        {/* Chat Content Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-4 shadow-sm">
          <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Executive AI Copilot</h1>
            <p className="text-sm text-gray-500 font-medium">Your intelligent assistant for fleet intelligence and analytics</p>
          </div>
        </div>
        {/* {indexedCount > 0 && (
      <div className="bg-green-900 text-green-400 px-4 py-2 rounded-lg mb-4">
        📄 {indexedCount} Document{indexedCount > 1 ? "s" : ""} Ready for AI
      </div>
    )} */}
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">

          {/* Chat Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar">
            {messages.map((msg, index) => (
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
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-200 flex flex-col transition-all focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-400">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Copilot to analyze fleet risk, maintenance or utilization..."
              className="w-full bg-transparent p-1.5 outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base font-medium"
            />

            <div className="flex justify-between items-center px-2 pb-2 mt-1">
              <div className="text-xs text-gray-400 font-medium px-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Context Connected
              </div>
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
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

export default Copilot;