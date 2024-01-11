import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import Modal from "react-modal";
import { getEmployeehistory } from "../../modules/employee/employee-slice";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../tables/data-table";

export const HistoryModal = ({ isOpen, onClose, ID, dataa }) => {
  const dispatch = useDispatch();
  const { historyEmployee } = useSelector((state) => state?.root?.employee);

  useEffect(() => {
    // call api for history datas
    dispatch(getEmployeehistory(ID));
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Project", accessor: "project_title" },
      { Header: "Joining Date", accessor: "joiningDate" },
      { Header: "Leaving Date", accessor: "removeingDate" },
    ],
    []
  );

  const data = useMemo(
    () =>
      historyEmployee && historyEmployee?.length > 0 ? historyEmployee : [],
    [historyEmployee]
  );
  const employeeData = dataa.find((o) => o.id === ID);
  const employeeName = employeeData ? employeeData.name : "";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="History"
      className="fixed inset-0 overflow-y-auto"
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl ring-2 ring-offset-2 ring-gray-300 w-full max-w-fit p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Employee Name :- {employeeName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div>
            <DataTable columns={columns} data={data} showSearch={false} />
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 mr-2 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
