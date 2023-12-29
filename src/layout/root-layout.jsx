import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";
import { adminRoutes, employeeRoutes, role } from "../utils/route-access";

const RootLayout = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state?.root?.auth);

  const userRole = user && user?.role;

  // Check if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if the user is trying to access an unauthorized route
  const isUnauthorizedRoute =
    (userRole === role.employee && adminRoutes.includes(location.pathname)) ||
    (userRole === role.admin && employeeRoutes.includes(location.pathname));

  // Redirect to the appropriate route based on the user's role
  if (isUnauthorizedRoute) {
    return <Navigate to={`/`} />;
  }

  return (
    <>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      <section className="md:pl-60 pt-[20px] h-full">
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
