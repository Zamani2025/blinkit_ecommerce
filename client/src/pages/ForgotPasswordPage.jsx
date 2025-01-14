import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../config/AxiosToastError";
import SummaryApi from "../common/Summary";
import Axios from "../config/axios";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ email: "" });
  const navigate = useNavigate();
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
        ...SummaryApi.forgot_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verify-otp", { state: { email: data.email } });
        setData({ email: "" });
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
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleOnSubmit} className="grid gap-2 mt-4">
          <div className="flex flex-col gap-4">
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
          <button
            type={isLoading ? "button" : "submit"}
            className={`${
              isLoading
                ? "bg-neutral-800 cursor-not-allowed"
                : "bg-green-800 font-serif hover:bg-green-700 transition-all duration-300 cursor-pointer"
            } py-2 text-white flex justify-center items-center gap-1 rounded-md mt-2`}
          >
            {isLoading ? "Sending..." : "Send OTP"}
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

export default ForgotPasswordPage;
