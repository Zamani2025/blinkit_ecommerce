import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import UploadAvatar from "../components/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../config/AxiosToastError";
import { toast } from "react-toastify";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import fetchUserDetails from "../utils/fetchUserDetails";
import { getUserDetails } from "../store/userSlice";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.update_profile,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        const userDetails = await fetchUserDetails();
        dispatch(getUserDetails(userDetails.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col gap-2 items-center lg:items-start justify-center">
        <div className="rounded-full overflow-hidden w-48 h-48 lg:w-28 lg:h-28 shadow bg-white flex justify-center items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser size={80} className=" text-gray-500" />
          )}
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="lg:w-fit w-48 text-center text-sm hover:bg-yellow-400 hover:text-white transition-all duration-300 cursor-pointer rounded border border-yellow-400 px-2 py-1 mt-2"
        >
          Upload Avatar
        </div>
      </div>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full px-4 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <UploadAvatar user={user} setOpenModal={setOpenModal} />
        </div>
      )}
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 mt-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={data.name}
            onChange={handleOnChange}
            id="name"
            className="border w-full py-2 px-4 rounded outline-none bg-slate-50 focus-within:border-yellow-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            disabled
            value={data.email}
            onChange={handleOnChange}
            className="border w-full py-2 px-4 rounded outline-none bg-slate-50 focus-within:border-yellow-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="mobile" className="font-semibold">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            required
            value={data.mobile}
            onChange={handleOnChange}
            id="mobile"
            className="border w-full py-2 px-4 rounded outline-none bg-slate-50 focus-within:border-yellow-400"
          />
        </div>
        <button
          type={loading ? "button" : "submit"}
          className={`${
            loading
              ? "cursor-not-allowed bg-neutral-900 text-white "
              : "cursor-pointer bg-yellow-400 text-white  hover:bg-yellow-500 "
          } w-full mt-4 py-2 rounded transition-all duration-300`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-t-2 border-white"></div>
              <span>Loading...</span>
            </div>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
