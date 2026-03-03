import { useState, useRef, useEffect } from "react";
import { askCopilot } from "../api/copilotApi";
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
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

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

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-6 text-black shadow-xl">
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
  );
};

export default Copilot;