import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-modal";
import Select from "react-select";
import { X } from "lucide-react";
import { ResourceSchema } from "../../validations/resource-validation-schema";
import {
  availabilityList,
  roleList,
} from "../../utils/resource-addAssigneModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { abortGetAllEmployees } from "../../modules/employee/employee-slice";
import { AddResource } from "../../modules/resource/resource-slice";
import {
  getAllProjects,
  setProjectTab,
} from "../../modules/projects/project-slice";

export const AddResources = ({
  isOpen,
  onClose,
  mode,
  onSave,
  projectId,
  projectTab,
}) => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state?.root?.employee);
  const { projecttab, projects } = useSelector((state) => state?.root?.project);

  useEffect(() => {
    return () => {
      dispatch(abortGetAllEmployees());
    };
  }, [dispatch]);


  const employeeIdsInProject = projecttab?.resources?.map(
    (resource) => resource.employee.id
  );

  // Filter employees that are not in the project
  const employeesNotInProject = employees?.filter(
    (employee) => !employeeIdsInProject?.includes(employee?.id)
  );  

  const employeeList =
    employeesNotInProject &&
    employeesNotInProject?.length > 0 ?
    employeesNotInProject?.map((o) => ({
      label: o?.name,
      value: o?.id,
    })):[]

  // Use the useForm hook from react-hook-form
  const {
    getValues,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
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
    const resourceData = {
      employeeId: values.employee,
      projectId: projectId,
      availability: values.availability,
      role_type: values.role,
    };
    dispatch(AddResource(resourceData)).then((res) => {
      setTimeout(() => {
        if (res.status == 201) {
          const updatedProjectList = projects?.find((o) => o?.id === projectId);
          dispatch(setProjectTab(updatedProjectList));
        }
      }, 3000);
    });
    closeAddResourceModal();
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
        <div className="bg-white rounded-lg shadow-xl ring-2 ring-offset-2 ring-gray-300  w-full max-w-md p-4">
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

            <div className="text-right mt-4">
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
