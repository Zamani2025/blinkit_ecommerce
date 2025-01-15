import React, { useState } from "react";
import uploadImage from "../utils/uploadImage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

const AddSubCategoryModal = ({ setOpenModal }) => {
  const [loading, setLoading] = useState(false);
  const [loadImage, setLoadImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const allCategories = useSelector((state) => state.category.allCategories);

  const handleOnChange = (e) => {};
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
  const handleOnSubmit = async (e) => {};
  return (
    <div className="bg-white p-4 rounded max-w-md w-full shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold mb-2">Add Sub Category</h2>
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
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold"
          >
            Category
          </label>
          <div className="px-4 py-4 border rounded focus-within:border-yellow-400">
            <div className="flex flex-wrap gap-2 mb-2">
              {data.category.map((category) => (
                <div
                  key={category._id}
                  className="px-4 py-1 shadow-md rounded text-sm relative flex items-center gap-2"
                >
                  {category.name}
                  <span
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          category: prev.category.filter(
                            (cat) => cat._id !== category._id
                          ),
                        };
                      });
                    }}
                    className="absolute right-0 text-red-500 top-0 cursor-pointer"
                  >
                    <IoClose />
                  </span>
                </div>
              ))}
            </div>
            <select
              id="category"
              required
              onChange={(e) => {
                const { value } = e.target;
                const categoryIndex = allCategories.find(
                  (category) => category._id === value
                );
                setData((prev) => {
                  return {
                    ...prev,
                    category: [...prev.category, categoryIndex],
                  };
                });
              }}
              className="w-full border flex flex-col gap-2 outline-none focus-within:border-yellow-400 bg-slate-50 rounded py-2 px-3"
            >
              <option value="" disabled selected>
                Select a category
              </option>
              {allCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
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
          {loading ? "Adding..." : "Add Sub Category"}
        </button>
      </form>
    </div>
  );
};

export default AddSubCategoryModal;
