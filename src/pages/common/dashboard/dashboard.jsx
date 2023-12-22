import { lazy } from "react";

const AdminDashboard = lazy(() =>
  import("../../admin-access/admin-dashboard/admin-dashboard-page")
);
const EmployeeDashboard = lazy(() =>
  import("../../employee-access/employee-dashboard/employee-dashboard")
);

const DashboardPage = () => {
  const userRole = "admin"; 

  return (
    <div>
      {userRole === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}
    </div>
  );
};

export default DashboardPage;
