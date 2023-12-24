import { lazy } from "react";

const AdminDashboard = lazy(() =>
  import("../../admin-access/admin-dashboard/admin-dashboard-page")
);
const EmployeeDashboard = lazy(() =>
  import("../../employee-access/employee-dashboard/employee-dashboard")
);

const DashboardPage = () => {
  const userRole = "admin";
  let DashboardComponent;

  switch (userRole) {
    case "admin":
      DashboardComponent = AdminDashboard;
      break;
    case "employee":
      DashboardComponent = EmployeeDashboard;
      break;
    default:
      // You can provide a default component or handle other cases as needed
      DashboardComponent = null;
  }

  return (
    <div>
      {DashboardComponent && <DashboardComponent />}
    </div>
  );
};

export default DashboardPage;
