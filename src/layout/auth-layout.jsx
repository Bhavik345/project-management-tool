import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  //   const { isAuthenticated } = useUserContext();
  const isAuthenticated =true;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section>  
            <Outlet />
          </section>
        </>
      )}
    </>
  );
}
