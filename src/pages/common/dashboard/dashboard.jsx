import { lazy } from "react";
import { useSelector } from "react-redux";

const AdminDashboardPage = lazy(() =>
  import("../../admin-access/admin-dashboard/admin-dashboard-page")
);
const EmployeeDashboardPage = lazy(() =>
  import("../../employee-access/employee-dashboard/employee-dashboard-page")
);

const DashboardPage = () => {
  const { user } = useSelector((state) => state?.root?.auth);
  const userRole = user && user?.role;

  let DashboardComponent;

  switch (userRole) {
    case "ADMIN":
      DashboardComponent = AdminDashboardPage;
      break;
    case "employee":
      DashboardComponent = EmployeeDashboardPage;
      break;
    default:
      // You can provide a default component or handle other cases as needed
      DashboardComponent = null;
  }

  return <div>{DashboardComponent && <DashboardComponent />}</div>;
};

export default DashboardPage;
