import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar.jsx";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <Sidebar />
      <main><Outlet /></main>
    </div>
  );
}
