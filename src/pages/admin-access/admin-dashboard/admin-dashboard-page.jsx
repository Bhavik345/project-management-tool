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
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
          : projects?.map((o) => <ProjectCard key={o?.id} o={o} />)}
      </div>
      <div className="flex justify-center flex-col items-center ">
        <h2 className="font-bold  text-center mt-32">Pie Chart</h2>
        <AdminDshboardPieChart projects={projects} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
