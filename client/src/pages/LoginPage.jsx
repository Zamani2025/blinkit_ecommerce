import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../config/AxiosToastError";
import SummaryApi from "../common/Summary";
import Axios from "../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
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
    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response?.data?.data.accessToken);
        localStorage.setItem("refreshToken", response?.data?.data.refreshToken);
        const userDetails = await fetchUserDetails();
        dispatch(getUserDetails(userDetails.data));
        localStorage.setItem("user", JSON.stringify(userDetails.data));
        setData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="px-4 flex items-center justify-center h-full w-full">
      <div className="bg-white max-w-[500px] w-full p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleOnSubmit} className="grid gap-2 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="w-full px-4 py-2 outline-none border bg-slate-50 rounded focus-within:border-yellow-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="w-full relative">
              {showPassword ? (
                <FaEye
                  size={20}
                  className="hover:text-yellow-400 cursor-pointer absolute top-3 right-2"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  size={20}
                  className="hover:text-yellow-400 cursor-pointer absolute top-3 right-2"
                  onClick={() => setShowPassword(true)}
                />
              )}
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={data.password}
                onChange={handleOnChange}
                id="password"
                className="w-full px-4 py-2 outline-none border bg-slate-50 rounded focus-within:border-yellow-400"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <Link
            to="/forgot-password"
            className="flex justify-end hover:text-yellow-400 cursor-pointer"
          >
            <p>Forgot password?</p>
          </Link>
          <button
            type={isLoading ? "button" : "submit"}
            className={`${
              isLoading
                ? "bg-neutral-800 cursor-not-allowed"
                : "bg-green-800 font-serif hover:bg-green-700 transition-all duration-300 cursor-pointer"
            } py-2 text-white flex justify-center items-center gap-1 rounded-md mt-2`}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="text-left">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-green-800 font-semibold">
              Register
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
