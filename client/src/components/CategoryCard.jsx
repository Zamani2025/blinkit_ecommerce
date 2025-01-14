import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCard from "./DeleteCard";

const CategoryCard = ({ category, fetchCategory }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div className="bg-white rounded shadow overflow-hidden p-2 cursor-pointer group relative">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-scale-down rounded group-hover:scale-110 transition-all duration-300"
      />
      <div className="absolute translate-y-64 gap-2 group-hover:translate-y-0 flex inset-0 z-50 w-full h-full bg-neutral-900 bg-opacity-20 items-end py-2 justify-center transition-all duration-500">
        <div
          onClick={() => setShowUpdateModal(true)}
          className="px-2 py-2 text-white rounded-full bg-blue-600 hover:bg-blue-700 animate-bounceOnce"
        >
          <FaPencilAlt />
        </div>
        <div
          onClick={() => setShowDeleteModal(true)}
          className="px-2 py-2 text-white rounded-full bg-red-600 hover:bg-red-700"
        >
          <ImBin />
        </div>
      </div>
      {showUpdateModal && (
        <div className="fixed top-0 px-4 bottom-0 right-0 left-0 z-50 w-full h-full bg-neutral-900 bg-opacity-30 flex items-center justify-center">
          <UpdateCategoryModal
            category={category}
            setOpenModal={setShowUpdateModal}
            fetchCategory={fetchCategory}
          />
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed top-0 px-4 bottom-0 right-0 left-0 z-50 w-full h-full bg-neutral-900 bg-opacity-30 flex items-center justify-center">
          <DeleteCard
            itemId={category._id}
            setOpenModal={setShowDeleteModal}
            fetchCategory={fetchCategory}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
