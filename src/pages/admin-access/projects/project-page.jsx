import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../components/tables/data-table";
import { Edit, History, Plus, Trash } from "lucide-react";
import { AddOrEditProjectModal } from "../../../components/modal/add-edit-projectmodal";
import { DeleteConfirmationModal } from "../../../components/modal/delete-confirmation-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProject,
  DeleteProject,
  LoadSingleProject,
  UpdateProject,
  abortGetAllProjects,
  getAllProjects,
  setLoadProjectData,
} from "../../../modules/projects/project-slice";
import { ErrorToast } from "../../../utils/toast-util";
import { Loader } from "../../../components/loader/loader";
import HistoryProject from "../../../components/modal/historyProject";

const ProjectPage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [Id, setID] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const dispatch = useDispatch();
  const { loading, projects } = useSelector((state) => state?.root?.project);

  useEffect(() => {
    dispatch(getAllProjects());

    return () => {
      dispatch(abortGetAllProjects());
    };
  }, [dispatch]);

  const openAddProjectModal = () => {
    dispatch(setLoadProjectData({}));
    setIsAddProjectModalOpen(true);
    setModalMode("add");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openEditProjectModal = (data) => {
    setID(data?.id);
    dispatch(LoadSingleProject(data?.id));
    setIsAddProjectModalOpen(true);
    setModalMode("edit");
  };

  const closeAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
    setModalMode("add");
  };

  const handleSaveProject = async (data) => {
    const updateddata = {
      project_description: data?.projectDescription,
      project_name: data?.projectName,
      client_name: data?.clientName,
      No_of_resource_type: data?.billableResource,
      tracker: data?.Trackercheckbox,
    };
    console.log("---/", updateddata);
    try {
      if (modalMode === "add") {
        dispatch(AddProject(updateddata));
      } else {
        dispatch(UpdateProject(updateddata, Id));
      }
    } catch (error) {
      ErrorToast(error?.message);
    } finally {
      setID(null);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = (row) => {
    setID(row?.id);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteProject(Id));
    setID(null);
    setIsDeleteConfirmationModalOpen(false);
  };
  const handleHistory = (row) => {
    if (row) {
      setID(row?.id);
      setHistoryOpen(true);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
    setHistoryOpen(false);
    setID(null);
  };

  const data = useMemo(() => {
    return projects && projects.length > 0 ? projects : [];
  }, [projects]);

  

  const columns = useMemo(
    () => [
      // { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "project_name" },
      { Header: "Description", accessor: "project_description" },
      { Header: "ClientName", accessor: "client_name" },
      {
        Header: <div style={{ width: "87px" }}>Actions</div>,
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-3">
            <button
              onClick={() => openEditProjectModal(row?.original)}
              className="bg-blue-500 text-white px-2.5 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(row?.original)}
              className="bg-red-500 text-white px-2.5 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
            >
              <Trash className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleHistory(row?.original)}
              className="bg-green-500 text-white px-2.5 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
            >
              <History className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    [openEditProjectModal, handleDelete]
  );
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Projects</h1>
            <button
              className="bg-black text-white px-3 py-2 rounded-md flex items-center  mr-3
            "
              onClick={openAddProjectModal}
            >
              <Plus className="w-5 h-5 mr-3 " />
              <span className="hidden sm:inline">Add Project</span>
            </button>
          </div>

          {/* Table Section */}
          <DataTable columns={columns} data={data} />

          {/* Add/Edit Project Modal */}
          <AddOrEditProjectModal
            isOpen={isAddProjectModalOpen}
            onClose={closeAddProjectModal}
            mode={modalMode}
            onSave={handleSaveProject}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteConfirmationModalOpen}
            onClose={handleCancelDelete}
            onDelete={handleConfirmDelete}
          />

          {historyOpen && (
            <HistoryProject
              ID={Id}
              dataa={data}
              isOpen={historyOpen}
              onClose={handleCancelDelete}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProjectPage;
