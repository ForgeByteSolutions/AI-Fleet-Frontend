import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ProfileAvatar from "./ProfileAvatar";

const Header = ({ toggleSidebar }) => {
  const { logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname.split("/")[1];
    switch (path) {
      case "risk":
        return "FLEETINTELLECT AI ASSET RISK INTELLIGENCE";
      case "maintenance":
        return "FLEETINTELLECT AI MAINTENANCE";
      case "decisions":
        return "FLEETINTELLECT AI PROJECT UTILIZATION";
      case "dashboard":
        return "FLEETINTELLECT AI DASHBOARD";
      case "documents":
        return "FLEETINTELLECT AI KNOWLEDGE VAULT";
      case "sql-rag":
        return "FLEETINTELLECT AI DATA INTELLIGENCE BOT";
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
    <div className="fixed top-0 md:left-64 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-20">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <h2 className="text-sm md:text-lg font-semibold text-black truncate max-w-[150px] md:max-w-none">
          {getTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/ai-governance"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-white bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 transition shadow-sm whitespace-nowrap"
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          AI Governance
        </Link>
        <Link
          to="/copilot"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-white bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 transition shadow-sm whitespace-nowrap"
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
          Executive AI Agent
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
