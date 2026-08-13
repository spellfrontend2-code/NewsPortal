import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

export default function AdminLayout() {
  return (
    <div className="admin h-full w-full flex overflow-hidden">

      <aside className="w-[280px] flex-shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <Outlet />
      </main>

    </div>
  )
}
