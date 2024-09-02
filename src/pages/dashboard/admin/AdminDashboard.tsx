import DashboardSidebar from "@/components/dashboardsidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSidebar />
      <div className="mt-20 mx-4 flex-1">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminDashboard;
