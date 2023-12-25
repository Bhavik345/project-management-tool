import { lazy } from "react";

const AdminDashboardPage = lazy(() =>
  import("../../admin-access/admin-dashboard/admin-dashboard-page")
);
const EmployeeDashboardPage = lazy(() =>
  import("../../employee-access/employee-dashboard/employee-dashboard-page")
);

const DashboardPage = () => {
  const userRole = "admin";
  let DashboardComponent;

  switch (userRole) {
    case "admin":
      DashboardComponent = AdminDashboardPage;
      break;
    case "employee":
      DashboardComponent = EmployeeDashboardPage;
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
