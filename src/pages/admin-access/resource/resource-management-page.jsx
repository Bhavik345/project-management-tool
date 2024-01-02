import { Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { AddResources } from "../../../components/modal/add-resource-modal";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/loader/loader";
import {
  abortGetAllProjects,
  getAllProjects,
} from "../../../modules/projects/project-slice";
import { getAllEmployees } from "../../../modules/employee/employee-slice";

export default function ReSourceManageMentPage() {
  const [openTab, setOpenTab] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { loading, projects } = useSelector((state) => state?.root?.project);
  const { loading: resourceLoading } = useSelector(
    (state) => state?.root?.resource
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());

    return () => {
      dispatch(abortGetAllProjects());
    };
  }, [dispatch]);

  useEffect(() => {
    let id = localStorage.getItem('ID')
    // Set the first project's name as the default open tab when the component mounts
    if (projects.length > 0) {
      startTransition(() => {
        if(id){
          setOpenTab(id);
        }else{
          setOpenTab(projects[0].project_name);
          handleTabId(projects[0].project_name)
        }
        setProjectId(projects[0].id);
      });
    }
  }, [projects]);
  
  const handleTabId = (id) => {
    localStorage.setItem('ID',id)
  }

  const handleResourceAdd = () => {
    dispatch(getAllEmployees());
    setIsAddResourceModalOpen(true);
  };
  const closeAddResourceModal = () => {
    setIsAddResourceModalOpen(false);
  };
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
              disabled={isPending}
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
              <ul className="flex flex-col h-screen bg-white-200 w-1/5">
                <div className="text-center font-medium text-3xl p-6">
                  Projects
                </div>
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
                      onClick={() => {
                        setOpenTab(tab.project_name);
                        setProjectId(tab.id);
                        handleTabId(tab.project_name)
                      }}
                      className="w-full inline-block text-center break-words"
                    >
                      {tab.project_name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pl-3 bg-white rounded-xl h-screen w-8/12">
                {projects.map((tab) => (
                  <div
                    key={tab.project_name}
                    className={
                      tab.project_name === openTab ? "block" : "hidden"
                    }
                  >
                    <h2 className="text-3xl font-medium pb-6 pt-6 text-center">
                      Profile Details
                    </h2>
                    <div className="bg-blue-200 w-3/5 m-auto rounded">
                      <div className="pb-6 pt-6 px-3 text-left ">
                        <div className="mt-2 mb-4">
                          {" "}
                          <span className="text-base tracking-widest font-bold">
                            Client Name :-
                          </span>{" "}
                          {tab?.client_name}
                        </div>
                        <p className="mb-4">
                          {" "}
                          <p className="text-base tracking-widest font-bold">
                            Description :-
                          </p>{" "}
                          <p className="text-justify break-words px-5">
                            {tab?.project_description}
                          </p>
                        </p>
                        <p className="mb-2">
                          <span className="text-base tracking-widest font-bold">
                            Employees:-{" "}
                          </span>
                          <div className="flex flex-wrap">
                            {tab?.resources.map((item, index) => (
                              <div key={index} className="w-1/2 py-2 px-4">
                                - {item?.employee?.name}
                              </div>
                            ))}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
