import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div
      className="grid grid-cols-[220px_1fr] grid-rows-[65px_1fr] h-screen text-gray-700"
      style={{ rowGap: 5, fontFamily: "Joro" }}
    >
      <Sidebar />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
