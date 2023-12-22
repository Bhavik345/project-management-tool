import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// import component
import AuthLayout from "./layout/auth-layout";
import RootLayout from "./layout/root-layout";
import { ToasterProvider } from "./providers/toaster-provider";
import { Loader } from "./components/loader/loader";

// import pages

const LoginPage = lazy(() => import("./pages/common/login/login-page"));
const DashboardPage = lazy(() => import("./pages/common/dashboard/dashboard"));
const EmployeePage = lazy(() =>
  import("./pages/admin-access/employee/employee-page")
);
const ProjectPage = lazy(() =>
  import("./pages/admin-access/projects/project-page")
);
const ReSourceManageMentPage = lazy(() =>
  import("./pages/admin-access/resource/resource-management-page")
);
// profile page
const ProfilePage = lazy(() =>
  import("./pages/employee-access/profile/profile-page")
);
const NotFound = lazy(() => import("./pages/common/not-found/not-found"));

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
              {/* employee routes */}
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
