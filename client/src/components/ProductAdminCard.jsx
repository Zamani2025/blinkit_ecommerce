import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import EditProductAdmin from "./EditProductAdminModal";
import AxiosToastError from "../config/AxiosToastError";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";
import DeleteCard from "./DeleteCard";

const ProductAdminCard = ({ product, fetchProducts }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_product,
        data: {
          productId: product._id,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProducts();
        setShowDeleteModal(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div
      key={product._id}
      className="bg-white p-4 shadow rounded flex flex-col gap-2 overflow-hidden group relative cursor-pointer"
    >
      <img
        src={product.image[0]}
        alt={product.title}
        className="w-full h-40 object-contain group-hover:scale-110 transition-all duration-300"
      />
      <h1 className="font-bold text-ellipsis line-clamp-2">{product.name}</h1>
      <div className="absolute -translate-x-52 gap-2 group-hover:translate-x-0 flex inset-0 w-full h-full bg-yellow-400 group-hover:bg-neutral-900 group-hover:bg-opacity-20 items-end py-2 justify-center transition-all duration-500">
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
        <EditProductAdmin
          fetchProducts={fetchProducts}
          userData={product}
          close={() => setShowUpdateModal(false)}
        />
      )}

      {showDeleteModal && (
        <div className="fixed top-0 px-4 bottom-0 right-0 left-0 z-50 w-full h-full bg-neutral-900 bg-opacity-30 flex items-center justify-center">
          <DeleteCard
            confirm={handleDelete}
            setOpenModal={setShowDeleteModal}
            fetchProducts={fetchProducts}
          />
        </div>
      )}
    </div>
  );
};

export default ProductAdminCard;
