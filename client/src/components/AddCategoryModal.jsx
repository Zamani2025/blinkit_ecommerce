import React, { useState } from "react";
import AxiosToastError from "../config/AxiosToastError";
import uploadImage from "../utils/uploadImage";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";

const AddCategoryModal = ({ setOpenModal, fetchCategory }) => {
  const [loading, setLoading] = useState(false);
  const [loadImage, setLoadImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadImage = async (e) => {
    setLoadImage(true);
    const file = e.target.files[0];
    if (!file) {
      toast.error("File is required");
      return;
    }
    const imageResponse = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        image: imageResponse,
      };
    });
    setLoadImage(false);
  };

  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.add_category,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCategory();
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);

      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-4 rounded max-w-md w-full shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold mb-2">Add Category</h2>
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
      <form onSubmit={handleOnSubmit} className="grid gap-4 mt-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            name="name"
            value={data.name}
            onChange={handleOnChange}
            placeholder="Enter category name"
            className="w-full border outline-none focus-within:border-yellow-400 bg-slate-50 rounded py-2 px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Image</p>
          <div className="lg:flex grid lg:flex-row items-center gap-3 justify-items-center">
            <div className="h-36 lg:w-36 w-full rounded bg-blue-50 flex items-center justify-center">
              {data.image ? (
                <img
                  src={data.image}
                  alt=""
                  className="w-full h-full object-scale-down"
                />
              ) : (
                <p className="text-sm text-neutral-500">No Image</p>
              )}
            </div>
            <label htmlFor={data.name && "image"}>
              <div
                className={`${
                  data.name
                    ? "border-yellow-400 border hover:bg-yellow-400 cursor-pointer"
                    : "border-slate-900 border hover:bg-slate-800 cursor-not-allowed"
                } p-2 rounded hover:text-white`}
              >
                {loadImage ? "Uploading..." : "Upload Image"}
              </div>
            </label>
            <input
              onChange={handleUploadImage}
              type="file"
              name="image"
              id="image"
              className="hidden"
            />
          </div>
        </div>
        <button
          type={loading ? "button" : "submit"}
          className={`${
            loading && "pointer-events-none bg-neutral-900 text-white"
          } border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white`}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryModal;
