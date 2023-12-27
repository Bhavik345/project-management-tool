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
            <h2 className="text-xl font-bold">Are you absolutely sure?</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mb-4">
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 mr-2 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="bg-red-700 text-white px-4 py-2 rounded-md  hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
