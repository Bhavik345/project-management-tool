import { lazy } from "react";

const getDashboardComponent = (userRole) => {
  switch (userRole) {
    case "admin":
      return import("../../admin-access/admin-dashboard/admin-dashboard-page");
    case "employee":
      return import("../../employee-access/employee-dashboard/employee-dashboard");
    default:
      // You can provide a default component or handle other cases as needed
      return null;
  }
};

const DashboardPage = () => {
  const userRole = "admin";
  const DashboardComponent = lazy(() => getDashboardComponent(userRole));

  return (
    <div>
      <DashboardComponent />
    </div>
  );
};

export default DashboardPage;
