import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectCard from "../../../components/project-card/project-card";
import { useDispatch, useSelector } from "react-redux";
import {
  abortGetAllProjects,
  getAllProjects,
} from "../../../modules/projects/project-slice";
import DashboardSkelton from "../../../components/skelton/dashboard-skelton";
import AdminDshboardPieChart from "../../../components/charts/admin-dashboard-piechart";

const AdminDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state?.root?.project);

  useEffect(() => {
    dispatch(getAllProjects());

    return () => {
      dispatch(abortGetAllProjects());
    };
  }, [dispatch]);

  // console.log('projects',projects?.map((itm)=>itm.resources.map((o)=>o.role_type)));
  const dataRole = projects?.map((itm) => {
    let newItem = { ...itm }; // Create a shallow copy of itm
  
    let projectManagerCount = 0;
    let teamLeaderCount = 0;
    let srdeveloperCount = 0;
  
    itm.resources.forEach((o) => {
      if (o?.role_type === 'projectmanager') {
        projectManagerCount += 1;
      } else if (o?.role_type === 'teamLeader' || o?.role_type === 'Team Leader' ){
        teamLeaderCount += 1;
      } else if (o?.role_type === 'srdeveloper') {
        srdeveloperCount += 1;
      }
    });
  
    newItem.projectManagerCount = projectManagerCount;
    newItem.teamCount = teamLeaderCount;
    newItem.srdeveloper = srdeveloperCount;
  
    return newItem;
  });

  function recursiveSort(arr, criteria) {
    if (criteria.length === 0) {
      return arr;
    }
  
    const key = criteria[0];
  
    arr?.sort((a, b) => {
      if (a[key] < b[key]) {
        return 1;
      } else if (a[key] > b[key]) {
        return -1;
      } else {
        // If values are equal, sort based on next criteria
        return recursiveSort([a, b], criteria.slice(1))[0] === a ? -1 : 1;
      }
    });
  
    return arr;
  }
  
  // Define the sorting criteria (in the order of importance)
  const sortingCriteria = ['projectManagerCount', 'teamCount','srdeveloper'];
  
  // Perform recursive sort
  const sortedData = recursiveSort(dataRole, sortingCriteria);
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex justify-between items-center">
                        <p className=" bg-[#66ccff] mr-2 mt-6 ml-5 rounded p-2">Billable</p>
                        <p className=" bg-[#ff9933] mr-2 mt-6 rounded p-2">Non - Billable</p>
                        <p className=" bg-[#99ff33]  mt-6 mr-4 rounded p-2">In - Help</p>
                      </div>
        {/* <div className="relative flex items-center mr-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 transition duration-300 w-64"
          />
          {searchTerm && (
            <X
              className="w-5 h-5 cursor-pointer absolute right-2 top-3 text-gray-500 focus:outline-none"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <DashboardSkelton key={index} />
            ))
          : sortedData?.map((o) => <ProjectCard key={o?.id} o={o} />)}
      </div>
      <div className="flex justify-center flex-col items-center bg-white w-3/4 m-auto mt-4 shadow-[-0.1rem_1.7rem_6.6rem_-3.2rem_rgba(0,0,0,0.5)] rounded">
        <h2 className="font-bold  text-center mt-5 -mb-10 mx-0]">Pie Chart</h2>
        <AdminDshboardPieChart projects={projects} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
