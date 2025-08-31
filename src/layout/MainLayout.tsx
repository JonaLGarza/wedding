import { Outlet } from "react-router-dom";

export default function MainLayout() {

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--fg)] transition-colors duration-500">
      <Outlet />
    </div>
  );
}
