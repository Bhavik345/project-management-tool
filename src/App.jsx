import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// import component
import Loader from "./components/loader/loader";
import AuthLayout from "./layout/auth-layout";
import RootLayout from "./layout/root-layout";
import { ToasterProvider } from "./providers/toaster-provider";

// import pages

const LoginPage = lazy(() => import("./pages/common/login/login-page"));
const DashboardPage = lazy(() =>
  import("./pages/admin-access/dashboard/dashboard-page")
);
const EmployeePage = lazy(() =>
  import("./pages/admin-access/employee/employee-page")
);
const ProjectPage = lazy(() =>
  import("./pages/admin-access/projects/project-page")
);
const ReSourceManageMentPage = lazy(() =>
  import("./pages/admin-access/resource/resource-management-page")
);
function App() {
  return (
    <>
      <main className="h-full ">
        <ToasterProvider />
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* private routes */}
            <Route element={<RootLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/admin/employee" element={<EmployeePage />} />
              <Route path="/admin/projects" element={<ProjectPage />} />
              <Route
                path="/admin/resource-management"
                element={<ReSourceManageMentPage />}
              />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
