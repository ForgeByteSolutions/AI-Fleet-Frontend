import { NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-10">
        AI Fleet
      </h1>

      <nav className="space-y-2 text-black">
        {[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Risk", to: "/risk" },
          { label: "Documents", to: "/documents" },
          { label: "Maintenance", to: "/maintenance" },
          { label: "Project Utilization", to: "/decisions" },
          { label: "SQL-RAG", to: "/sql-rag" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors hover:bg-red-100 hover:text-red-600 flex items-center justify-start ${
                isActive ? "bg-red-200 text-red-700 font-semibold" : "text-black"
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