import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div
      className="min-h-[1080px] grid grid-cols-[220px_1fr] grid-rows-[65px_1fr] h-screen text-gray-700 border border-red-500"
      style={{ rowGap: "5px", fontFamily: "Joro" }}
    >
      <Sidebar />
      <Header />
      <main className="col-span-2 row-start-2 p-4">
        <Outlet />
      </main>
    </div>
  );
}
