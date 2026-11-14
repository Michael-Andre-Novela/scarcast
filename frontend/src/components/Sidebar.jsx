import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside>
      <h2>NISAR Explorer</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/map">Map & Analysis</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </nav>
    </aside>
  );
}
