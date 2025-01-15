import React from "react";

const DeleteCard = ({ confirm, setOpenModal }) => {
  return (
    <div className="bg-white p-4 rounded max-w-md w-full shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold mb-2">Permanent Delete </h2>
        <button
          onClick={() => setOpenModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Are you sure you want to permanently delete this item?
        </p>
        <button
          onClick={confirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => setOpenModal(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCard;
