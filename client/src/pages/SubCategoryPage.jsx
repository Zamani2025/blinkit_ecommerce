import React, { useEffect, useState } from "react";
import AddSubCategoryModal from "../components/AddSubCategoryModal";
import { ImBin } from "react-icons/im";
import { createColumnHelper } from "@tanstack/react-table";
import AxiosToastError from "../config/AxiosToastError";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";
import ViewImage from "../components/ViewImage";
import { FaPencilAlt } from "react-icons/fa";
import DisplayTable from "../components/DisplayTable";
import EditSubCategoryModal from "../components/EditSubCategoryModal";
import DeleteCard from "../components/DeleteCard";

const SubCategoryPage = () => {
  const [openSubCategoryModal, setOpenSubCategoryModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [setImage, setSetImage] = useState({
    image: "",
    name: "",
    category: [],
    id: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState("");
  const columnHelper = createColumnHelper();

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (JSON.parse(user)?.role !== "admin") {
      window.location.href = "/";
    }
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <div className="flex items-center justify-center">
          <img
            onClick={() => {
              setSetImage(() => {
                return {
                  image: info.row.original.image,
                  name: info.row.original.name,
                  category: info.row.original.category,
                };
              });
              setViewImage(true);
            }}
            src={info.row.original.image}
            alt={info.row.original.name}
            className="w-8 h-8 cursor-pointer"
          />
          {viewImage && (
            <ViewImage image={setImage} setViewImage={setViewImage} />
          )}
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {row.original.category.map((item) => {
              return (
                <div
                  key={item._id}
                  className="bg-white shadow-md px-2 py-1 rounded-md"
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => (
        <div className="flex lg:gap-8 gap-2 items-center justify-center">
          <button
            onClick={() => {
              setShowEditModal(true);
              setSetImage(() => {
                return {
                  image: info.row.original.image,
                  name: info.row.original.name,
                  category: info.row.original.category,
                  id: info.row.original._id,
                };
              });
            }}
            className="text-green-600 cursor-pointer px-2 py-2 rounded-full border border-green-600 hover:bg-green-600 hover:text-white"
          >
            <FaPencilAlt size={20} />
          </button>
          <button
            onClick={() => {
              setShowConfirmBox(true);
              setSubCategoryId(info.row.original._id);
            }}
            className="text-red-600 cursor-pointer px-2 py-2 rounded-full border border-red-600 hover:bg-red-600 hover:text-white"
          >
            <ImBin size={20} />
          </button>
        </div>
      ),
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_subCategory,
        data: { subCategoryId: subCategoryId },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setShowConfirmBox(false);
        fetchSubCategory();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchSubCategory = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.get_subCategory,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        setData(response?.data?.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded">
        <h1 className="font-bold">Sub Category</h1>
        <div
          onClick={() => setOpenSubCategoryModal(true)}
          className="px-4 py-2 border border-yellow-400 cursor-pointer rounded hover:bg-yellow-400 hover:text-white"
        >
          Add Sub Category
        </div>
      </div>
      <div className="mt-4 w-full container mx-auto overflow-auto">
        <DisplayTable data={data} column={column} />
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-t-2 border-gray-900"></div>
        </div>
      )}

      {openSubCategoryModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <AddSubCategoryModal
            fetchSubCategory={fetchSubCategory}
            setOpenModal={setOpenSubCategoryModal}
          />
        </div>
      )}

      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <EditSubCategoryModal
            setShowEditModal={setShowEditModal}
            subCategory={setImage}
            fetchSubCategory={fetchSubCategory}
          />
        </div>
      )}

      {showConfirmBox && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <DeleteCard
            setOpenModal={() => setShowConfirmBox(false)}
            confirm={handleDeleteSubCategory}
          />
        </div>
      )}
    </div>
  );
};

export default SubCategoryPage;
