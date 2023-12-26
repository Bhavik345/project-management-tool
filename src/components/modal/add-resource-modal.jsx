import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-modal";
import Select from "react-select";
import { X } from "lucide-react";
import { ResourceSchema } from "../../validations/resource-validation-schema";
import {
  availabilityList,
  employeeList,
  roleList,
} from "../../utils/resource-addAssigneModal";

export const AddResources = ({ isOpen, onClose, mode, onSave }) => {
  // Use the useForm hook from react-hook-form
  const {
    getValues,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(ResourceSchema),
    defaultValues: {
      availability: null,
      role: null,
      employee: null,
    },
  });

  // Define the handleSave function
  const onSubmit = () => {
    let values = getValues();
    // onSave(data, mode);
    closeAddResourceModal();
    // console.log("called", values);
  };

  // Define the closeAddResourceModal function
  const closeAddResourceModal = () => {
    reset();
    onClose();
  };

  const onChangeHandle = (selectedOption, nameSelect) => {
    setValue(nameSelect, selectedOption.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeAddResourceModal}
      contentLabel={mode === "add" ? "Add Project Modal" : "Edit Project Modal"}
      className="fixed inset-0 overflow-y-auto"
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4" style={{border:'1px solid black'}}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Assign Projects</h2>
            <button
              onClick={closeAddResourceModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="availability"
              control={control}
              render={({ field }) => (
                <div className="mb-5">
                  <Select
                    {...field}
                    options={availabilityList}
                    value={field.values}
                    placeholder="Availability"
                    onChange={(selectedOption) =>
                      onChangeHandle(selectedOption, "availability")
                    }
                  />
                  {(!field.value || field.value === null) &&
                    errors.availability && (
                      <p className="text-red-500 mt-1">
                        {errors.availability.message}
                      </p>
                    )}
                </div>
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="mb-5">
                  <Select
                    {...field}
                    options={roleList}
                    value={field.values}
                    placeholder="Role"
                    onChange={(selectedOption) =>
                      onChangeHandle(selectedOption, "role")
                    }
                  />
                  {(!field.value || field.value === null) && errors.role && (
                    <p className="text-red-500 mt-1">{errors.role.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="employee"
              control={control}
              render={({ field }) => (
                <div className="mb-5">
                  <Select
                    {...field}
                    options={employeeList}
                    value={field.values}
                    placeholder="Employee"
                    onChange={(selectedOption) =>
                      onChangeHandle(selectedOption, "employee")
                    }
                  />
                  {(!field.value || field.value === null) &&
                    errors.employee && (
                      <p className="text-red-500 mt-1">
                        {errors.employee.message}
                      </p>
                    )}
                </div>
              )}
            />

            <div className="text-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
                type="submit"
              >
                Assign
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
