import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import AxiosToastError from "../config/AxiosToastError";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";
import Axios from "../config/axios";
import { useDispatch } from "react-redux";
import { getUserDetails, setAvatar } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const UploadAvatar = ({ setOpenModal, user }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = async (e) => {
    alert("uploading...");
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await Axios({
        ...SummaryApi.upload_avatar,
        data: formData,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        const userDetails = await fetchUserDetails();
        dispatch(getUserDetails(userDetails.data));
        setOpenModal(false);
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-4 max-w-sm w-full rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold mb-2">Upload Avatar</h2>
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
      <div className="flex flex-col justify-center items-center">
        <div className="w-32 h-32 shadow bg-gray-200 rounded-full overflow-hidden items-center justify-center flex">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser size={90} className=" text-gray-500" />
          )}
        </div>
        <input
          type="file"
          onChange={handleOnChange}
          id="avatar"
          className="hidden"
        />
        <label
          htmlFor="avatar"
          type="submit"
          className="w-fit text-sm hover:bg-yellow-400 hover:text-white transition-all duration-300 cursor-pointer rounded border border-yellow-400 px-4 py-2 mt-2"
        >
          {loading ? <div>Loading....</div> : <div>Upload Avatar</div>}
        </label>
      </div>
    </div>
  );
};

export default UploadAvatar;
