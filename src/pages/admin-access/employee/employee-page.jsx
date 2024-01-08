import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../components/tables/data-table";
import { Edit, History, Plus, Trash } from "lucide-react";
import { DeleteConfirmationModal } from "../../../components/modal/delete-confirmation-modal";
import { AddOrEditEmployeeModal } from "../../../components/modal/add-edit-employee-modal";
import { ErrorToast } from "../../../utils/toast-util";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/loader/loader";
import {
  AddNewEmployee,
  DeleteEmployee,
  LoadSingleEmployee,
  UpdateEmployee,
  abortGetAllEmployees,
  getAllEmployees,
  setLoadEmployeeDetails,
} from "../../../modules/employee/employee-slice";
import { HistoryModal } from "../../../components/modal/history-modal";

const EmployeePage = () => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =useState(false);
  const [historyOpen, setHistoryOpen] =useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [ID, setID] = useState(null);
  const dispatch = useDispatch();

  const { loading, employees } = useSelector((state) => state?.root?.employee);

  useEffect(() => {
    dispatch(getAllEmployees());

    return () => {
      dispatch(abortGetAllEmployees());
    };
  }, [dispatch]);

  const openAddEmployeeModal = () => {
    dispatch(setLoadEmployeeDetails({}));
    setIsAddEmployeeModalOpen(true);
    setModalMode("add");
  };

  const openEditEmployeeModal = (data) => {
    if (data?.id) {
      dispatch(LoadSingleEmployee(data?.id));
      setID(data?.id);
      setIsAddEmployeeModalOpen(true);
      setModalMode("edit");

    }
  };

  const closeAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
    setModalMode("add");

  };

  const handleSaveEmployee = async (data) => {
    try {
      if (modalMode === "add") {
        dispatch(AddNewEmployee(data));
      } else {
        dispatch(UpdateEmployee(data, ID));
      }
    } catch (error) {
      ErrorToast(error?.message);
    } finally {
      setID(null);
      setModalMode('add');
    }
  };

  const handleDelete = (row) => {
    if (row) {
      setID(row?.id);
      setIsDeleteConfirmationModalOpen(true);
    }
  };
  const handleHistory = (row) => {
    if (row) {
      setID(row?.id);
      setHistoryOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteEmployee(ID));
    setIsDeleteConfirmationModalOpen(false);
    setID(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
    setHistoryOpen(false);
    setID(null);
  };

  const columns = useMemo(
    () => [
      // { Header: 'ID', accessor: 'id' },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone Number", accessor: "phoneNumber" },
      // { Header: "Password", accessor: "password" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-3">
            <button
              onClick={() => openEditEmployeeModal(row?.original)}
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
    []
  );

  const data = useMemo(() =>  employees && employees?.length > 0 ?  employees:[], [employees]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Employees</h1>
            <button
              className="bg-black text-white px-3 py-2 rounded-md flex items-center  mr-3"
              onClick={openAddEmployeeModal}
            >
              <Plus className="w-5 h-5 mr-3 " />
              <span className="hidden sm:inline">Add Employee</span>
            </button>
          </div>

          {/* Table Section */}
          <DataTable columns={columns} data={data} />

          <AddOrEditEmployeeModal
            isOpen={isAddEmployeeModalOpen}
            onClose={closeAddEmployeeModal}
            mode={modalMode}
            onSave={handleSaveEmployee}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteConfirmationModalOpen}
            onClose={handleCancelDelete}
            onDelete={handleConfirmDelete}
          />

          <HistoryModal
           ID={ID}
           isOpen={historyOpen}
           onClose={handleCancelDelete}
          />
        </div>
      )}
    </>
  );
};

export default EmployeePage;
