import React, { useEffect, useState } from "react";
import AddCategoryModal from "../components/AddCategoryModal";
import AxiosToastError from "../config/AxiosToastError";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";
import CategoryCard from "../components/CategoryCard";

const CategoryPage = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.get_category,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      console.log(error);

      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <section className="container mx-auto px-4 py-4">
      <div className="bg-white px-4 py-2 flex items-center gap-2 justify-between rounded">
        <h1 className="font-bold">Categories</h1>
        <button
          onClick={() => setOpenCategoryModal(true)}
          className="border hover:bg-yellow-400 border-yellow-400 px-4 py-2 hover:text-white rounded"
        >
          Add Category
        </button>
      </div>
      {openCategoryModal && (
        <div className="fixed top-0 left-0 w-full h-full px-4 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddCategoryModal setOpenModal={setOpenCategoryModal} fetchCategory={fetchCategory} />
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-t-2 border-gray-900"></div>
        </div>
      )}

      <div className="grid grid-cols-3 lg:grid-cols-7 md:grid-cols-4 gap-2 mt-4">
        {categoryData.map((category) => {
          return <CategoryCard category={category} fetchCategory={fetchCategory} />;
        })}
      </div>
    </section>
  );
};

export default CategoryPage;
