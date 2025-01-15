import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import uploadImage from "../utils/uploadImage";
import AddMoreField from "../components/AddMoreField";
import AxiosToastError from "../config/AxiosToastError";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";

const UploadProductPage = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    unit: "",
    image: [],
    category: [],
    subCategory: [],
    description: "",
    discount: "",
    more_details: {},
    stock: "",
  });

  const [fieldName, setFieldName] = useState("");
  const allCategories = useSelector((state) => state.category.allCategories);
  const allSubCategories = useSelector(
    (state) => state.subCategory.allSubCategories
  );
  const [loadImage, setLoadImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMoreFieldModal, setShowMoreFieldModal] = useState(false);

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (JSON.parse(user)?.role !== "admin") {
      window.location.href = "/";
    }
  }, []);

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
        image: [...prev.image, imageResponse],
      };
    });
    setLoadImage(false);
  };
  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setShowMoreFieldModal(false);
  };
  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.create_product,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          price: "",
          discount: "",
          description: "",
          image: [],
          unit: "",
          category: [],
          subCategory: [],
          more_details: {},
          stock: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="container mx-auto p-4">
      <div className="px-4 py-3 bg-white rounded flex items-center justify-between gap-2">
        <h1 className="font-bold">Upload Products</h1>
      </div>
      <form onSubmit={handleOnSubmit} className="grid gap-2 mt-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            name="name"
            id="title"
            value={data.name}
            onChange={handleOnChange}
            placeholder="Enter product name"
            className="border rounded px-4 py-2 outline-none focus-within:border-yellow-400 bg-slate-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={data.price}
            onChange={handleOnChange}
            placeholder="Enter product price"
            className="border rounded px-4 py-2 outline-none focus-within:border-yellow-400 bg-slate-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="unit">Image</label>
          <label
            htmlFor="image"
            className="h-20 bg-slate-50 cursor-pointer text-slate-500 rounded flex flex-col items-center justify-center"
          >
            <FaCloudUploadAlt size={30} />
            <p className="text-sm">
              {loadImage ? "Uploading...." : "Upload File"}
            </p>
            <input
              type="file"
              onChange={handleUploadImage}
              name="image"
              className="hidden"
              accept="image/*"
              id="image"
            />
          </label>
          <div className="flex flex-wrap items-start justify-start gap-2">
            {data.image.map((item, index) => {
              return (
                <div className="p-2 mt-1 rounded shadow-md bg-white relative">
                  <img
                    src={item}
                    alt="Product Image"
                    className="w-10 h-10 object-scale-down"
                  />
                  <div
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          image: data.image.filter((img) => img !== item),
                        };
                      });
                    }}
                    className="absolute cursor-pointer top-0 right-0 text-red-600"
                  >
                    <IoClose />
                  </div>
                </div>
              );
            })}
          </div>
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
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold"
          >
            Sub Category
          </label>
          <div className="px-4 py-4 border rounded focus-within:border-yellow-400">
            <div className="flex flex-wrap gap-2 mb-2">
              {data.subCategory.map((s_category) => (
                <div
                  key={s_category._id}
                  className="px-4 py-1 shadow-md rounded text-sm relative flex items-center gap-2"
                >
                  {s_category.name}
                  <span
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          subCategory: prev.subCategory.filter(
                            (cat) => cat._id !== s_category._id
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
              onChange={(e) => {
                const { value } = e.target;
                const s_categoryIndex = allSubCategories.find(
                  (s_category) => s_category._id === value
                );
                setData((prev) => {
                  return {
                    ...prev,
                    subCategory: [...prev.subCategory, s_categoryIndex],
                  };
                });
              }}
              className="w-full border flex flex-col gap-2 outline-none focus-within:border-yellow-400 bg-slate-50 rounded py-2 px-3"
            >
              <option value="" disabled selected>
                Select a sub category
              </option>
              {allSubCategories.map((s_category) => (
                <option key={s_category._id} value={s_category._id}>
                  {s_category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            cols={10}
            value={data.description}
            onChange={handleOnChange}
            placeholder="Enter product description"
            className="border rounded px-4 py-2 outline-none focus-within:border-yellow-400 bg-slate-50"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            name="unit"
            id="unit"
            value={data.unit}
            onChange={handleOnChange}
            placeholder="Enter product unit"
            className="border rounded px-4 py-2 outline-none focus-within:border-yellow-400 bg-slate-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            name="discount"
            value={data.discount}
            onChange={handleOnChange}
            id="discount"
            placeholder="Enter product discount"
            className="border rounded px-4 py-2 outline-none focus-within:border-yellow-400 bg-slate-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            value={data.stock}
            onChange={handleOnChange}
            id="stock"
            placeholder="Enter product stock"
            className="border rounded px-4 py-2 outline-none focus-within:border-yellow-400 bg-slate-50"
          />
        </div>
        <div>
          {Object?.keys(data?.more_details)?.map((k, index) => {
            return (
              <div className="flex flex-col gap-1">
                <label htmlFor={k}>{k}</label>
                <div className="w-full h-full relative">
                  <input
                    type="text"
                    placeholder={`Enter product ${k}`}
                    required
                    value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((prev) => {
                        return {
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [k]: value,
                          },
                        };
                      });
                    }}
                    id={k}
                    className=" w-full h-full bg-slate-50 outline-none border  py-2 px-4 rounded focus-within:border-yellow-400"
                  />
                  <IoClose
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          more_details: Object?.keys(
                            data?.more_details
                          )?.filter((item) => item !== k),
                        };
                      });
                    }}
                    className="absolute top-2 right-2 cursor-pointer"
                    size={20}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setShowMoreFieldModal(true)}
          className="border px-4 py-1 rounded border-yellow-400 w-fit mt-1 hover:bg-yellow-400 hover:text-white"
        >
          Add More Field
        </button>
        <button
          className={`${
            loading
              ? "cursor-not-allowed bg-neutral-900 text-white"
              : "cursor-pointer"
          } border px-4 py-2 rounded border-yellow-400 mt-1 hover:bg-yellow-400 hover:text-white`}
          type={loading ? "button" : "submit"}
        >
          {loading ? "Uploading...." : "Upload Product"}
        </button>
      </form>
      {showMoreFieldModal && (
        <div className="fixed top-0 w-full h-full left-0 bottom-0 z-50 bg-neutral-900 bg-opacity-30 flex items-center justify-center px-4">
          <AddMoreField
            close={() => setShowMoreFieldModal(false)}
            value={fieldName}
            submit={handleAddField}
            onchange={(e) => setFieldName(e.target.value)}
          />
        </div>
      )}
    </section>
  );
};

export default UploadProductPage;
