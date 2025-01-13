import React from "react";
import { CiFacebook } from "react-icons/ci";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="border-t px-4 gap-2 py-2 flex flex-col lg:flex-row  items-center justify-center lg:justify-between ">
      <p>
        Copyright &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold text-green-800">
          Blink<span className="text-yellow-400">it</span>
        </span>
        . All rights reserved
      </p>
      <p>Developed by <span className="font-bold text-green-800">xamani</span></p>
      <div className="flex justify-between items-center gap-2">
        <CiFacebook className="hover:text-yellow-400 cursor-pointer" size={23} />
        <AiFillTikTok className="hover:text-yellow-400 cursor-pointer" size={23} />
        <FaInstagram className="hover:text-yellow-400 cursor-pointer" size={23} />
        <CiLinkedin className="hover:text-yellow-400 cursor-pointer" size={23} />
      </div>
    </div>
  );
};

export default Footer;
