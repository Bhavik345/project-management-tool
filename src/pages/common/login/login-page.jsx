import { useSelector } from "react-redux";
import { LoginForm } from "../../../components/login-form/login-form";
import { Loader } from "../../../components/loader/loader";
import LogInPageLogo from "../../../assets/images/login-page-logo.svg";
const LoginPage = () => {
  const { loading } = useSelector((state) => state?.root?.auth);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg shadow-md p-6">
            <img
              className="mx-auto h-10 w-auto"
              src={LogInPageLogo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
