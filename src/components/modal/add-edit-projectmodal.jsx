import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import Modal from "react-modal";
import { projectSchema } from "../../validations/project-validation-schema";
import { useDispatch, useSelector } from "react-redux";
import { setLoadProjectData } from "../../modules/projects/project-slice";
import { isEmptyObject } from "../../utils/isemptyobj";

export const AddOrEditProjectModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      projectDescription: "",
      projectName: "",
      clientName: "",
      billableResource: "",
    },
  });
  const { loadprojectdata } = useSelector((state) => state?.root?.project);

  useEffect(() => {
    if (!isEmptyObject(loadprojectdata) && mode === "edit") {
      const { project_description, project_name, client_name } =
        loadprojectdata;
      reset({
        projectDescription: project_description || "",
        projectName: project_name || "",
        clientName: client_name || "",
        // billableResource: billableResourceNumber || "", is to added
      });
    } else {
      reset({
        projectDescription: "",
        projectName: "",
        clientName: "",
        billableResource: "",
      });
    }
  }, [loadprojectdata, reset, mode]);
  const handleSave = (data) => {
    onSave(data);
    closeAddProjectModal();
  };
  const closeAddProjectModal = () => {
    reset();
    onClose();
    dispatch(setLoadProjectData({}));
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
        <div className="bg-white rounded-lg shadow-xl ring-2 ring-offset-2 ring-gray-300 w-full max-w-md p-4">
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
                    disabled={isSubmitting}
                    placeholder="Project Name"

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
                    disabled={isSubmitting}
                    placeholder="Enter Name Here"

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
                    disabled={isSubmitting}
                    placeholder="Description"
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.projectDescription?.message}
              </span>
            </div>

            <div className="mb-4">
              <label
                htmlFor="billableResource"
                className="block text-sm font-medium text-gray-600"
              >
                Number of Billable Resource
              </label>
              <Controller
                name="billableResource"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="tel"
                    id="billableResource"
                    className="mt-1 p-2 border border-gray-300 w-full rounded-md"
                    disabled={isSubmitting}
                    maxLength="2"
                    placeholder="Enter upto 2 digits number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                   }}
                  />
                )}
              />
              <span className="text-red-500 text-sm">
                {errors.billableResource?.message}
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
