import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../config/AxiosToastError";
import Axios from "../config/axios";
import { toast } from "react-toastify";
import SummaryApi from "../common/Summary";

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.verify_email,
        data: {
          otp: data.join(""),
        },
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
    <section className="px-4 flex items-center justify-center h-full w-full">
      <div className="bg-white max-w-[500px] w-full p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Verify Your Account</h1>
        <form onSubmit={handleOnSubmit} className="grid gap-2 mt-2">
          <div className="flex flex-col gap-4">
            <label htmlFor="otp" className="font-semibold">
              Enter OTP
            </label>
            <div className="flex gap-2 lg:gap-4 items-center justify-between">
              {data.map((item, index) => (
                <input
                  ref={(ref) => {
                    inputRef.current[index] = ref;
                  }}
                  key={index}
                  type="text"
                  maxLength={1}
                  onChange={(e) => {
                    const { value } = e.target;
                    const newData = [...data];
                    newData[index] = value;
                    setData(newData);
                    if (value && index < 5) {
                      inputRef.current[index + 1].focus();
                    }
                    if (!value && index > 0) {
                      inputRef.current[index - 1].focus();
                    }
                  }}
                  id="otp"
                  className="max-w-14 w-full px-4 py-2 text-center font-bold outline-none border bg-slate-50 rounded focus-within:border-yellow-400"
                />
              ))}
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
            {isLoading ? "Verifying..." : "Verify Email"}
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

export default VerifyEmailPage;
