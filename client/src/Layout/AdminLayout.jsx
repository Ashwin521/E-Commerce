import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
