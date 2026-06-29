import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

export default function AdminLayout(){
return (
    <div className="min-h-screen w-full flex">

  <aside className="w-[250px] flex-shrink-0">
    <Sidebar />
  </aside>

  <main className="flex-1 min-w-0">
    <Outlet />
  </main>

</div>
)
}
