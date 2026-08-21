import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import PageTitle from "@/app/routes/pageTitle";

export default function AdminLayout() {
  return (
    <div className="admin h-full w-full flex overflow-hidden ">
      <PageTitle />

      <aside className="w-[280px] flex-shrink-0">
        <Sidebar />
      </aside>

      <main className="flex flex-1 min-w-0 min-h-0 flex-col h-full overflow-hidden">
        <Outlet />
      </main>

    </div>
  )
}
