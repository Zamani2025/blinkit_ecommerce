import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../config/AxiosToastError";
import Axios from "../config/axios";
import SummaryApi from "../common/Summary";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [data, setData] = useState({
    email: location.state.email,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
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
        ...SummaryApi.reset_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="container mx-auto flex items-center justify-center h-full">
      <div className="bg-white max-w-[500px] w-full p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <form onSubmit={handleOnSubmit} className="grid gap-1 mt-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              New Password
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
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full px-4 py-2 outline-none border bg-slate-50 rounded focus-within:border-yellow-400"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="c_password" className="font-semibold">
              Confirm Password
            </label>
            <div className="w-full relative">
              {showCPassword ? (
                <FaEye
                  size={20}
                  className="hover:text-yellow-400 cursor-pointer absolute top-3 right-2"
                  onClick={() => setShowCPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  size={20}
                  className="hover:text-yellow-400 cursor-pointer absolute top-3 right-2"
                  onClick={() => setShowCPassword(true)}
                />
              )}
              <input
                type={showCPassword ? "text" : "password"}
                required
                id="c_password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                className="w-full px-4 py-2 outline-none border bg-slate-50 rounded focus-within:border-yellow-400"
                placeholder="Re-Type your password"
              />
            </div>
          </div>
          <button
            type={isLoading ? "button" : "submit"}
            className={`${
              isLoading
                ? "bg-neutral-800 cursor-not-allowed"
                : "bg-green-800 font-serif hover:bg-green-700 transition-all duration-300 cursor-pointer"
            } py-2 text-white flex justify-center items-center gap-1 rounded-md mt-2`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
          <p className="text-left">
            Already have an account?{" "}
            <a href="/login" className="text-green-800 font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
