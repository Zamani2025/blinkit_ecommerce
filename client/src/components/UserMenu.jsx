import React, { useEffect } from "react";
import { AiOutlineProfile } from "react-icons/ai";
import Divider from "./Divider";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        if (close) {
          close();
        }
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="flex flex-col gap-2 z-50">
      <Link to="/dashboard/profile" className="flex items-center gap-2">
        <p>{user.name || user.mobile}</p>
        <AiOutlineProfile />
      </Link>
      <Divider />
      {user.role === "admin" && (
        <>
          <Link
            to="/dashboard/category"
            className="px-2 py-1 hover:bg-blue-700 rounded hover:text-white"
            onClick={close}
          >
            Category
          </Link>
          <Link
            to="/dashboard/sub-category"
            className="px-2 py-1 hover:bg-blue-700 rounded hover:text-white"
            onClick={close}
          >
            Sub Category
          </Link>
          <Link
            to="/dashboard/product"
            className="px-2 py-1 hover:bg-blue-700 rounded hover:text-white"
            onClick={close}
          >
            Products
          </Link>
          <Link
            to="/dashboard/upload-product"
            className="px-2 py-1 hover:bg-blue-700 rounded hover:text-white"
            onClick={close}
          >
            Upload Product
          </Link>
        </>
      )}
      <Link
        to="/dashboard/orders"
        className="px-2 py-1 hover:bg-blue-700 rounded hover:text-white"
        onClick={close}
      >
        Orders
      </Link>
      <Link
        to="/dashboard/address"
        className="px-2 py-1 hover:bg-blue-700 rounded hover:text-white"
        onClick={close}
      >
        Address
      </Link>
      <button
        onClick={handleLogout}
        className="px-2 py-1 text-left hover:bg-blue-700 rounded hover:text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
