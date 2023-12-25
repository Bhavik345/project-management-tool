import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../validations/auth-validation-schema";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSave = async (data) => {
    console.log(data, 22);
    try {
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address:
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                  disabled={isSubmitting}
                />
              )}
            />
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="employeepassword"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md pr-10"
                    disabled={isSubmitting}
                  />
                )}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 mr-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <span className="text-red-500 text-sm">
              {errors.password?.message}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                (!isValid || isSubmitting) && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isValid || isSubmitting}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
