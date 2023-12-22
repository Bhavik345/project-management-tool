import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import Modal from "react-modal";
import { projectSchema } from "../../validations/project-validation-schema";

export const AddOrEditProjectModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      projectDescription: "",
      projectName: "",
      clientName: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const handleSave = (data) => {
    onSave(data, mode);
    closeAddProjectModal();
  };
  const closeAddProjectModal = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeAddProjectModal}
      contentLabel={mode === "add" ? "Add Project Modal" : "Edit Project Modal"}
      className="fixed inset-0 overflow-y-auto"
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {mode === "add" ? "Add Project" : "Edit Project"}
            </h2>
            <button
              onClick={closeAddProjectModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-600"
              >
                Project Name:
              </label>
              <Controller
                name="projectName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="projectName"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.projectName?.message}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientName"
                className="block text-sm font-medium text-gray-600"
              >
                Client Name:
              </label>
              <Controller
                name="clientName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="clientName"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.clientName?.message}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectDescription"
                className="block text-sm font-medium text-gray-600"
              >
                Project Description:
              </label>
              <Controller
                name="projectDescription"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="projectDescription"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.projectDescription?.message}
              </span>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                  (!isValid || isSubmitting) && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isValid || isSubmitting}
              >
                {mode === "add" ? "Add Project" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
