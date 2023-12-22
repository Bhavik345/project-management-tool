import { X } from "lucide-react";
import Modal from "react-modal";

export const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation Modal"
      className="fixed inset-0 overflow-y-auto"
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Confirm Deletion</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mb-4">Are you sure you want to delete this ?</p>
          <div className="flex justify-end">
            <button
              onClick={onDelete}
              className="bg-red-700 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
