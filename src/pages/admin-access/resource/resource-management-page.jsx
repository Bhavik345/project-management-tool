import { Edit, Plus, Trash, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { AddResources } from "../../../components/modal/add-resource-modal";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/loader/loader";
import {
  abortGetAllProjects,
  getAllProjects,
  setProjectTab,
} from "../../../modules/projects/project-slice";
import { getAllEmployees } from "../../../modules/employee/employee-slice";
import { DeleteConfirmationModal } from "../../../components/modal/delete-confirmation-modal";
import {
  DeleteResourceEmployee,
  getAllResources,
} from "../../../modules/resource/resource-slice";

export default function ReSourceManageMentPage() {
  const [openTab, setOpenTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [ID, setID] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [editData , setEditData] = useState({})
  const [saveId, setSaveId] = useState("");
  const [FilteredProjects, setFilteredProjects] = useState([])

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
    let id = localStorage.getItem("ID");
    // Set the first project's name as the default open tab when the component mounts
    if (projects.length > 0) {
      startTransition(() => {
        if (id) {
          setOpenTab(id);
          setProjectId(id);
        } else {
          setOpenTab(projects[0].id);
          handleTabId(projects[0].id);
          setProjectId(projects[0].id);
        }
      });
    }
  }, [projects]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredData = projects.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filteredData);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);
  

  const handleTabId = (id) => {
    localStorage.setItem("ID", id);
  };

  const handleResourceAdd = () => {
    dispatch(getAllEmployees());
    setIsAddResourceModalOpen(true);
    setModalMode('add')
  };
  const closeAddResourceModal = () => {
    setIsAddResourceModalOpen(false);
  };

  const handleDelete = (item) => {
    setSaveId(item.id);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    let payload = {
      id: saveId,
    };
    dispatch(DeleteResourceEmployee(payload));
    setIsDeleteConfirmationModalOpen(false);
    setID(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
    setID(null);
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const openEditProjectModal = (item) => {
    setIsAddResourceModalOpen(true);
    setModalMode('edit')
    setEditData(item)
  }

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
              mode = {modalMode}
              editData={editData}
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

                <div>
                  <div className="relative flex items-center mr-4">
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
                  </div>
                </div>

                 {FilteredProjects.map((tab) => (
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
                    className={tab.id == openTab ? "block" : "hidden"}
                  >
                    <h2 className="text-3xl font-medium pb-6 pt-6 text-center">
                      Profile Details
                    </h2>
                    <div className="bg-blue-200 w-5/5 m-auto rounded">
                      <div className="flex justify-between items-center">
                        <p className=" bg-[#66ccff] mr-2 mt-6 ml-5 rounded p-2">
                          Billable
                        </p>
                        <p className=" bg-[#ff9933] mr-2 mt-6 rounded p-2">
                          Non - Billable
                        </p>
                        <p className=" bg-[#99ff33]  mt-6 mr-4 rounded p-2">
                          In - Help
                        </p>
                      </div>
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
                              <span className="text-base tracking-widest font-bold ">
                                Description :-
                              </span>
                              <span className="break-words">
                                {tab?.project_description}
                              </span>
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
                                className={`w-5/12 py-2 px-4 flex justify-between items-center m-2 rounded-[10px] ${
                                  item.resource_status_id == "2"
                                    ? "@apply bg-[#ff9933]"
                                    : item.resource_status_id == "1"
                                    ? "@apply bg-[#66ccff]"
                                    : " @apply bg-[#99ff33]"
                                }`}
                              >
                                <p>
                                  {item?.employee?.name} - (
                                  {capitalizeFirstLetter(item?.role_type)})
                                </p>
                                <div>
                                  {/* ================================================================== */}
                                  <button
                                    onClick={() =>
                                      openEditProjectModal(item)
                                    }
                                    className="bg-blue-500 text-white px-2.5 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                  >
                                    <Edit className="w-auto h-5" />
                                  </button>
                                  {/* ================================================================== */}

                                </div>

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
