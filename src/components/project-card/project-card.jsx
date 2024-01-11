const ProjectCard = ({ o }) => {
  // const employeeNames = o?.resources?.map(
  //   (resource) => resource?.employee?.name
  // );
  return (
    <div
      className="dashboard-card max-w-sm p-6 shadow-[-0.1rem_1.7rem_6.6rem_-3.2rem_rgba(0,0,0,0.5)] text-white border-[none] rounded-[0_30px_0_30px] transition-all"
    >
      <div className="mb-2">
        <span className=" text-white dark:text-gray-400 text-[17px] font-[600]">
          Project Name:
        </span>{" "}
        {o?.project_name ? o?.project_name : "-"}
      </div>
      <div className="mb-2">
        <span className=" text-white dark:text-gray-400 text-[17px] font-[600]">
          Client Name:
        </span>{" "}
        {o?.client_name ? o?.client_name : "-"}
      </div>
      <div className="mb-2 flex flex-wrap">
        <span className="text-white dark:text-gray-400 text-[17px] font-[600]">
          Employee Name:
        </span>{" "}
      </div>
          <div className="flex flex-wrap">
              {o?.resources.map((item, index) => (
                  <div key={index} className="w-1/2 py-2 px-4 flex items-center">
                    {/* <span className="w-[10px] h-[10px] rounded-full bg-black inline-block mr-2"></span> */}
                    <span
                      className={`w-[10px] h-[10px] rounded-full inline-block mr-2 ${
                        item.role_type === 'teamLeader' ? 'bg-red-500' : item.role_type === 'srdeveloper' ? 'bg-blue-500'
                        : 'bg-green-500'}`}>
                    </span>
                    <p>
                     {item?.employee?.name} ({item?.role_type == 'teamLeader'? 'TL' :item?.role_type == 'srdeveloper'? 'D' : 'PM' })
                    </p>
                   
                 </div>
                ))}
           </div>
      {/* <div>
        <span className="text-white dark:text-gray-400 text-[20px] font-[600]">
          Project Description:
        </span>{" "}
        {o?.project_description ? o?.project_description : "-"}
      </div> */}
    </div>
  );
};

export default ProjectCard;
