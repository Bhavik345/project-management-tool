import { X } from "lucide-react";
import { useEffect } from "react";
import Modal from "react-modal";

export const HistoryModal = ({ isOpen, onClose, ID }) => {

    useEffect(()=>{
        // call api for history datas
    },[])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="History"
      className="fixed inset-0 overflow-y-auto"
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl ring-2 ring-offset-2 ring-gray-300 w-full max-w-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Employee History</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>


          <p className="mb-4">
            Employee History Will Be Displayed Once Available
          </p>


          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 mr-2 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
