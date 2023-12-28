import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, X } from "lucide-react";
import Modal from "react-modal";
import { employeeSchema } from "../../validations/employee-validation-schema";
import { useSelector } from "react-redux";
import { isEmptyObject } from "../../utils/isemptyobj";

export const AddOrEditEmployeeModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });
  const { loademployeedetails } = useSelector((state) => state?.root?.employee);

  useEffect(() => {
    if (!isEmptyObject(loademployeedetails) && mode === "edit") {
      const { password, name, email, phoneNumber } = loademployeedetails;
      reset({
        password: password,
        phoneNumber: phoneNumber,
        name: name,
        email: email,
      });
    } else {
      reset({
        password: "",
        phoneNumber: "",
        name: "",
        email: "",
      });
    }
  }, [loademployeedetails, reset, mode]);
  const handleSave = (data) => {
    onSave(data);
    closeAddEmployeeModal();
  };
  const closeAddEmployeeModal = () => {
    reset();
    onClose();
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeAddEmployeeModal}
      contentLabel={
        mode === "add" ? "Add Employee Modal" : "Edit Employee Modal"
      }
      className="fixed inset-0 overflow-y-auto"
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl ring-2 ring-offset-2 ring-gray-300 w-full max-w-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {mode === "add" ? "Add Employee" : "Edit Employee "}
            </h2>
            <button
              onClick={closeAddEmployeeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="mb-4">
              <label
                htmlFor="employeeName"
                className="block text-sm font-medium text-gray-600"
              >
                Employee Name:
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="employeename"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                    disabled={isSubmitting}
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.name?.message}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Employee Email:
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="employeeemail"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                    disabled={isSubmitting}
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="employeenumber"
                className="block text-sm font-medium text-gray-600"
              >
                Employee PhoneNumber :
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="tel"
                    id="employeenumber"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                    disabled={isSubmitting}
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.phoneNumber?.message}
              </span>
            </div>

            {mode === "add" && (
              <div className="mb-4 relative">
                <label
                  htmlFor="employeepassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Employee Password :
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
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                  (!isValid || isSubmitting) && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isValid || isSubmitting}
              >
                {mode === "add" ? "Add Employee" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
