import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

const RootLayout = () => {
  const isAuthenticated = true;
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>

          <section className="pl-60 pt-[20px]">
            <Outlet />
          </section>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RootLayout;
