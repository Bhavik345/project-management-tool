import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  // const { isAuthenticated } = useSelector((state) =>state?.root?.auth);
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section>
        <Outlet />
      </section>
    </>
  );
}
