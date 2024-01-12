import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-modal";
import Select from "react-select";
import { X } from "lucide-react";
import { ResourceSchema } from "../../validations/resource-validation-schema";
import {
  availabilityList,
} from "../../utils/resource-addAssigneModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { abortGetAllEmployees, getEmployeeRoles } from "../../modules/employee/employee-slice";
import {
  AddResource,
  setIsProjectUpdate,
  getResourceStatus,
} from "../../modules/resource/resource-slice";
import { setProjectTab } from "../../modules/projects/project-slice";

export const AddResources = ({
  isOpen,
  onClose,
  mode,
  onSave,
  projectId,
  projectTab,
  editData
}) => {
  const dispatch = useDispatch();
  const [showHours , setShowHours] = useState(false);
  const { employees, employeeRole } = useSelector((state) => state?.root?.employee);
  const { isprojectupdate, resourceStatus } = useSelector(
    (state) => state?.root?.resource
  );
  const { projecttab, projects } = useSelector((state) => state?.root?.project);
  useEffect(() => {
    return () => {
      dispatch(abortGetAllEmployees());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isprojectupdate) {
      const updatedProjectList = projects?.find((o) => o?.id === +projectId);
      dispatch(setProjectTab(updatedProjectList));
      dispatch(setIsProjectUpdate(false));
    }
  }, [dispatch, isprojectupdate, projectId, projects]);

  useEffect(() => {
    dispatch(getResourceStatus());
    dispatch(getEmployeeRoles())
    // dispatch(UpdateResource())
  }, []);

  useEffect(()=>{
    if(mode == 'edit' ){
      
    }else{

    }
  },[])

  const employeeIdsInProject = projecttab?.resources?.map(
    (resource) => resource.employee.id
  );

  // Filter employees that are not in the project
  const employeesNotInProject = employees?.filter(
    (employee) => !employeeIdsInProject?.includes(employee?.id)
  );

  const roleList =  employeeRole.map((o) => ({
    label: o?.empolyee_role,
    value: o?.id,
  }))


  const employeeList =
    employeesNotInProject && employeesNotInProject?.length > 0
      ? employeesNotInProject?.map((o) => ({
          label: o?.name,
          value: o?.id,
        }))
      : [];

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
    defaultValues: mode == 'edit'?
    {
    availability: editData.availability,
      hours: editData.hours,
      role: editData.role,
      employee: editData.employee,
      status: editData.status,
    } :
     {
      availability: null,
      hours: null,
      role: null,
      employee: null,
      status: null,
    },
  });
  

  const onSubmit = async () => {
    let values = getValues();
    const resourceData = {
      employeeId: values.employee,
      projectId: projectId,
      availability: values.availability,
      hours: values.hours,
      role_type: values.role,
      resource_status_id: values.status,
    };


    try {
      dispatch(AddResource(resourceData));
    } catch (error) {
      console.error("Error while dispatching AddResource:", error);
    } finally {
      closeAddResourceModal();
    }
  };

  // Define the closeAddResourceModal function
  const closeAddResourceModal = () => {
    reset();
    onClose();
  };

  const onChangeHandleInput = (e,nameSelect) => {
    setValue(nameSelect,e)
  }

  const onChangeHandle = (selectedOption, nameSelect) => {
    // setValue(nameSelect, selectedOption.value);
    if(nameSelect === 'role' ){
      setValue(nameSelect, selectedOption.label === "Project Manager" ? "projectmanager" : selectedOption.label == "Developer"? 'srdeveloper' : selectedOption.label === "Team-Leader" ? "teamLeader" : "" );
    }else{
      setValue(nameSelect, selectedOption.value);
    }

    if(nameSelect==='availability'){
      if(selectedOption.value == 'partTime'){
        setShowHours(true)
      }else{
        setShowHours(false)
      }
    } 
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
            <h2 className="text-xl font-bold">{mode === "add" ? "Assign Projects" : "Edit Assign Projects"}</h2>
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
            {
              showHours ? 
              <Controller
              name="hours"
              control={control}
              render={({ field }) => (
                <div className="mb-5 w-full">
                  <input
                  className="p-1"
                    {...field}
                    type="tel" // Specify the input type as number
                    placeholder="Hours"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      onChangeHandleInput(e.target.value, "hours");
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                   }}
                   maxLength={2}
                  />
                  {(!field.value || field.value === null) && errors.hours && (
                    <p className="text-red-500 mt-1">{errors.hours.message}</p>
                  )}
                </div>
              )}
            /> : null

            }
           

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

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="mb-5">
                  <Select
                    {...field}
                    options={resourceStatus.map((o) => {
                      let statusData = {
                        label: o.resources_Name,
                        value: o.id,
                      };
                      return statusData;
                    })}
                    value={field.values}
                    placeholder="Status"
                    onChange={(selectedOption) =>
                      onChangeHandle(selectedOption, "status")
                    }
                  />
                  {(!field.value || field.value === null) && errors.status && (
                    <p className="text-red-500 mt-1">{errors.status.message}</p>
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
