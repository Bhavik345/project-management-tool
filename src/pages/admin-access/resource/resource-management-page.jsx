import { Plus, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { AddResources } from "../../../components/modal/add-resource-modal";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/loader/loader";
import {
  abortGetAllProjects,
  getAllProjects,
  setProjectTab
} from "../../../modules/projects/project-slice";
import {
  getAllEmployees,
} from "../../../modules/employee/employee-slice";
import { DeleteConfirmationModal } from "../../../components/modal/delete-confirmation-modal";
import { DeleteResourceEmployee, getAllResources } from "../../../modules/resource/resource-slice";

export default function ReSourceManageMentPage() {
  const [openTab, setOpenTab] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [ID, setID] = useState(null);
  const [saveId, setSaveId] = useState('')

  const { loading, projects } = useSelector((state) => state?.root?.project);
  const { loading: resourceLoading } = useSelector((state) => state?.root?.resource);
  
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(getAllProjects());
    return () => {
      dispatch(abortGetAllProjects());
    };
  }, [dispatch]);

  useEffect(() => {
  dispatch(getAllResources())
    let id = localStorage.getItem("ID");
    // Set the first project's name as the default open tab when the component mounts
    if (projects.length > 0) {
      startTransition(() => {
        if (id) {
          setOpenTab(id);
          setProjectId(id)
        } else {
          setOpenTab(projects[0].id);
          handleTabId(projects[0].id);
          setProjectId(projects[0].id)
        }
        
      });
    }
  }, [projects]);

  const handleTabId = (id) => {
    localStorage.setItem("ID", id);
  };

  const handleResourceAdd = () => {
    dispatch(getAllEmployees());
    setIsAddResourceModalOpen(true);
  };
  const closeAddResourceModal = () => {
    setIsAddResourceModalOpen(false);
  };

  const handleDelete = (item) => {
    setSaveId(item.id)
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    let payload = {
      id: saveId
    }
    dispatch(DeleteResourceEmployee(payload));
    setIsDeleteConfirmationModalOpen(false);
    setID(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
    setID(null);
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
            {/* ------------------------- modals of page start ------------------------- */}
            <AddResources
              isOpen={isAddResourceModalOpen}
              onClose={closeAddResourceModal}
              projectId={projectId}
            />
            <DeleteConfirmationModal
              isOpen={isDeleteConfirmationModalOpen}
              onClose={handleCancelDelete}
              onDelete={handleConfirmDelete}
            />
            {/* ------------------------- modals of page ends  ------------------------- */}
            <div className="flex items-center justify-evenly">
              <ul className="flex flex-col h-screen bg-white-200 w-1/5">
                <div className="text-center font-medium text-3xl p-6">
                  Projects
                </div>
                {projects.map((tab) => (
                  <li
                    key={tab.id}
                    className={`w-full text-center px-2 py-2 my-2  rounded  ${
                      openTab == tab.id
                        ? "bg-blue-700 text-white"
                        : "bg-blue-300"
                    } cursor-pointer `}
                  >
                    <a
                      href={tab.link}
                      onClick={() => {
                        setOpenTab(tab.id);
                        setProjectId(tab.id);
                        handleTabId(tab.id);
                        dispatch(setProjectTab(tab));
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
                    key={tab.id}
                    className={
                      tab.id == openTab ? "block" : "hidden"
                    }
                  >
                    <h2 className="text-3xl font-medium pb-6 pt-6 text-center">
                      Profile Details
                    </h2>
                    <div className="bg-blue-200 w-5/5 m-auto rounded">
                      <div className="pb-6 pt-6 px-3 text-left ">
                        <div className="flex justify-between bg-white rounded-[10px] py-4 px-2 mt-2">
                          <div className=" w-1/3">
                            <span className="text-base tracking-widest font-bold">
                              Client Name :-
                            </span>{" "}
                            {tab?.client_name}
                          </div>

                          <div className=" w-1/3">
                            <p>
                              <span className="text-base tracking-widest font-bold">
                                Description :-
                              </span>
                              {tab?.project_description}
                            </p>
                          </div>
                        </div>

                        <div className="mb-2 bg-white mt-5 p-3 rounded-[10px]">
                          <div className="text-2xl text-center mb-2 tracking-widest font-bold">
                            Employees
                          </div>
                          <div className="flex flex-wrap justify-between">
                            {tab?.resources.map((item, index) => (
                              <div
                                key={index}
                                className="w-5/12 py-2 px-4 flex justify-between items-center bg-blue-200 m-2 rounded-[10px]"
                              >
                                <div>{item?.employee?.name}</div>
                                <div
                                  className="bg-red-500 text-white px-2.5 py-2 hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800 w-10 cursor-pointer rounded-[50%]"
                                  onClick={() => handleDelete(item)}
                                >
                                  <Trash className="w-auto h-5" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
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
