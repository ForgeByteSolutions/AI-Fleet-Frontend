import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#FAF9F6] text-black">
      <Header />
      <Sidebar />

      {/* main area needs left margin for sidebar and top margin for header */}
      <main className="ml-64 mt-16 p-8 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

