import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div
      className="grid grid-cols-[220px_1fr] grid-rows-[65px_1fr] h-screen"
      style={{ rowGap: 5 }}
    >
      <Sidebar />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
