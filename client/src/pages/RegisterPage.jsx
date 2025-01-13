import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../config/AxiosToastError";
import Axios from "../config/axios";
import { toast } from "react-toastify";
import SummaryApi from "../common/Summary";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/verify-email", { state: { email: data.email } });
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
        <h1 className="text-2xl font-bold text-center">Register Account</h1>
        <form onSubmit={handleOnSubmit} className="grid gap-1 mt-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              required
              id="name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full px-4 py-2 outline-none border bg-slate-50 rounded focus-within:border-yellow-400"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              value={data.email}
              name="email"
              onChange={handleOnChange}
              id="email"
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
            {isLoading ? "Registering..." : "Register"}
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

export default RegisterPage;
