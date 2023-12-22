import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

const RootLayout = () => {
  const location = useLocation();
  const isAuthenticated = true;
  const userRole = "admin"; // Set the user role based on your authentication logic

  const adminRoutes = ["/admin/projects", "/admin/employee", "/admin/resource-management"];
  const employeeRoutes = ["/profile"];

  // Check if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if the user is trying to access an unauthorized route
  const isUnauthorizedRoute = (
    (userRole === "employee" && adminRoutes.includes(location.pathname)) ||
    (userRole === "admin" && employeeRoutes.includes(location.pathname))
  );

  // Redirect to the appropriate route based on the user's role
  if (isUnauthorizedRoute) {
    return <Navigate to={`/`} />;
  }

  return (
    <>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      <section className="pl-60 pt-[20px]">
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
