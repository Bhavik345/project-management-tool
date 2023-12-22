import { useMemo, useState } from "react";
import { DataTable } from "../../../components/tables/data-table";
import { Edit, Plus, Trash } from "lucide-react";
import { AddOrEditProjectModal } from "../../../components/modal/add-edit-projectmodal";
import { DeleteConfirmationModal } from "../../../components/modal/delete-confirmation-modal";

const ProjectPage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editData, setEditData] = useState(null);

  const [deleteRow, setDeleteRow] = useState(null);

  const handleDelete = (row) => {
    setDeleteRow(row);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Delete project:", deleteRow);
    setIsDeleteConfirmationModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
  };
  const openAddProjectModal = () => {
    setIsAddProjectModalOpen(true);
    setModalMode("add");
    setEditData(null);
  };

  const openEditProjectModal = (data) => {
    setIsAddProjectModalOpen(true);
    setModalMode("edit");
    setEditData(data);
  };

  const closeAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
  };

  const handleSaveProject = async (data, mode) => {
    try {
      // Perform save action based on mode
      if (mode === "add") {
        // Add logic for adding a new project

        console.log("Add project:", data);
      } else if (mode === "edit") {
        // Add logic for editing an existing project
        console.log("Edit project:", data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(45);
    }
  };

  // Sample data array
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Project 1",
        description: "Description 1",
        ClientName: "Description 1",
      },
      {
        id: 2,
        name: "Project 2",
        description: "Description 2",
        ClientName: "Description 1",
      },
      { id: 3, name: "Project 3", description: "Description 3" },
      { id: 3, name: "Project 3", description: "Description 3" },
      { id: 3, name: "Project 3", description: "Description 3" },
      { id: 3, name: "Project 3", description: "Description 3" },

      // Add more rows as needed
    ],
    []
  );

  // Sample columns array
  const columns = useMemo(
    () => [
      // { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Description", accessor: "description" },
      { Header: "ClientName", accessor: "ClientName" },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-3">
            <button
              onClick={() => openEditProjectModal(row.original)}
              className="bg-blue-500 text-white px-2.5 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="bg-red-500 text-white px-2.5 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          className="bg-black text-white px-3 py-2 rounded flex items-center  mr-3"
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
        initialData={editData}
        onSave={handleSaveProject}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default ProjectPage;
