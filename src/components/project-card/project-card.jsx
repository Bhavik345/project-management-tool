const ProjectCard = ({ o }) => {
  // const employeeNames = o?.resources?.map(
  //   (resource) => resource?.employee?.name
  // );
  return (
    <div
      className="dashboard-card max-w-sm p-6 shadow-[-0.1rem_1.7rem_6.6rem_-3.2rem_rgba(0,0,0,0.5)]border-[none] rounded-[0_30px_0_30px] transition-all"
    >
      <div className=" text-white mb-2 text-center font-semibold text-2xl pb-1 bg-gray-500 p-1 rounded-full">
        {o?.project_name? o?.project_name : "-"}
      </div>
        <p className="text-black dark:text-gray-400 text-[17px] font-[600] text-center">
          Employee Name:
        </p>{" "}
      <div className="mb-2 flex flex-wrap">
      </div>
          <div className="flex flex-wrap">
              {o?.resources.map((item, index) => (
                  <div key={index} className="w-1/2 py-2 px-4 flex items-center">
                    {/* <span className="w-[10px] h-[10px] rounded-full bg-black inline-block mr-2"></span> */}
                    <span
                      className={`w-[10px] h-[10px] rounded-full inline-block mr-2 ${
                        item.resource_status_id == '2' ? '@apply bg-[#ff9933]' : item.resource_status_id == '1' ? '@apply bg-[#66ccff]': ' @apply bg-[#99ff33]'}`}>
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
