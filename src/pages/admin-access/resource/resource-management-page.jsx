import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AddResources } from "../../../components/modal/add-resource-modal";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/loader/loader";
import { abortGetAllProjects, getAllProjects } from "../../../modules/projects/project-slice";

export default function ReSourceManageMentPage() {
  const { loading, projects } = useSelector((state) => state?.root?.project);
  const {loading:resourceLoading}  = useSelector((state) => state?.root?.resource)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProjects());

    return () => {
      dispatch(abortGetAllProjects());
    };
  }, [dispatch]);

  useEffect(() => {
    // Set the first project's name as the default open tab when the component mounts
    if (projects.length > 0) {
      setOpenTab(projects[0].project_name);
      setProjectId(projects[0].id)
    }
  }, [projects]);

  const [openTab, setOpenTab] = useState("");
  const [projectId , setProjectId] = useState(null);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);

  const handleResourceAdd = () => {
    setIsAddResourceModalOpen(true);
  };
  const closeAddResourceModal = () => {
    setIsAddResourceModalOpen(false);
  };
console.log('projid',projectId);
  return (
    <>
      {loading || resourceLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Resources</h1>
            <button
              className="bg-black text-white px-3 py-2 rounded-md flex items-center  mr-3"
              onClick={handleResourceAdd}
            >
              <Plus className="w-5 h-5 mr-3 " />
              <span className="hidden sm:inline">Add Assignee</span>
            </button>
          </div>
          <div className="container mx-auto">
            <AddResources
              isOpen={isAddResourceModalOpen}
              onClose={closeAddResourceModal}
              projectId={projectId}
            />
  
            <div className="flex items-center justify-evenly">
              <ul className="flex flex-col h-screen bg-white-200 w-1/4">
                {projects.map((tab) => (
                  <li
                    key={tab.project_name}
                    className={`w-full text-center px-2 py-2 my-2  rounded  ${
                      openTab === tab.project_name
                        ? "bg-blue-700 text-white"
                        : "bg-blue-300"
                    } cursor-pointer `}
                  >
                    <a
                      href={tab.link}
                      onClick={() => {setOpenTab(tab.project_name); setProjectId(tab.id)}
                      }
                      className="w-full inline-block text-center break-words"
                    >
                      {tab.project_name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pl-3 bg-white border rounded-xl h-screen w-3/4">
                {projects.map((tab) => (
                  <div
                    key={tab.project_name}
                    className={tab.project_name === openTab ? "block" : "hidden"}
                  >
                    <h2 className="text-2xl font-extrabold">Profile</h2>
                    <div className="text-xl "> Client Name :- {tab.client_name}</div>
                    <p>Description - {tab.project_description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
