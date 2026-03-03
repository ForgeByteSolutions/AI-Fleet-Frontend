import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ProfileAvatar from "./ProfileAvatar";

const Header = () => {
  const { logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname.split("/")[1];
    switch (path) {
      case "risk":
        return "AI FLEET RISKS";
      case "maintenance":
        return "AI FLEET MAINTENANCE";
      case "decisions":
        return "AI FLEET DECISIONS";
      case "dashboard":
        return "AI FLEET DASHBOARD";
      case "documents":
        return "AI FLEET DOCUMENTS";
      case "sql-rag":
        return "SQL-RAG DATABASE ASSISTANT";
      default:
        // fallback to dashboard style title for unknown or root routes
        return "AI FLEET DASHBOARD";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
      <h2 className="text-lg font-semibold text-black">
        {getTitle()}
      </h2>

      <div className="flex items-center gap-4">
        <Link
          to="/copilot"
          className="inline-flex items-center px-4 py-2 rounded-full text-white bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 17l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
          Ask AI
        </Link>

        <div className="relative" ref={menuRef}>
          <ProfileAvatar
            user={user}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-black">{user?.email || "User"}</p>
                <p className="text-xs text-gray-500 mt-1">{user?.role || "Viewer"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
