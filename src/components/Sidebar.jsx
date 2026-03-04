import { NavLink } from "react-router-dom";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-red-600">
          FLEETINTELLECT AI
        </h1>
        {/* Close Button (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 hover:text-black p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="space-y-2 text-black">
        {[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Asset Risk Intelligence", to: "/risk" },
          { label: "Fleet Knowledge Vault", to: "/documents" },
          { label: "Maintenance", to: "/maintenance" },
          { label: "Project Utilization", to: "/decisions" },
          { label: "Data Intelligence Bot", to: "/sql-rag" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => {
              if (window.innerWidth < 768) {
                toggleSidebar();
              }
            }}
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors hover:bg-red-100 hover:text-red-600 flex items-center justify-start ${isActive ? "bg-red-200 text-red-700 font-semibold" : "text-black"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;