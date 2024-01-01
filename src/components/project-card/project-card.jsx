const ProjectCard = ({ o }) => {
  const employeeNames = o?.resources?.map(
    (resource) => resource?.employee?.name
  );

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-400">
          Project Name:
        </span>{" "}
        {o?.project_name ? o?.project_name : "-"}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-400">
          Client Name:
        </span>{" "}
        {o?.client_name ? o?.client_name : "-"}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-400">
          Employee Name:
        </span>{" "}
        {employeeNames && employeeNames.length > 0
          ? employeeNames.join(", ")
          : "-"}
      </div>
      <div>
        <span className="font-semibold text-gray-700 dark:text-gray-400">
          Project Description:
        </span>{" "}
        {o?.project_description ? o?.project_description : "-"}
      </div>
    </div>
  );
};

export default ProjectCard;
