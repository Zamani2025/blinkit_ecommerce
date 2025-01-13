import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [searchPage, setSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchPage(true);
    } else {
      setSearchPage(false);
    }
  }, [location.pathname]);

  return (
    <div className="border flex flex-col gap-2 sticky top-0 shadow bg-white h-28 lg:h-20 px-4">
      <div className="flex justify-between items-center lg:h-full container mx-auto">
        <Link to={"/"} className="lg:text-5xl text-4xl font-bold text-green-700">
          Blink<span className="text-yellow-400">it</span>
        </Link>
        <div className="hidden lg:block w-[400px]">
          <Search />
        </div>
        <div>
          <FaUserCircle size={30} className="block lg:hidden" />
          <div className="hidden justify-center items-center gap-8 lg:flex">
            <Link to="/login">Login</Link>
            <div className="bg-green-800 px-2 hover:bg-green-700 transition-all duration-300 cursor-pointer  py-2 text-white flex justify-center items-center gap-1 rounded-md">
              <FaShoppingBag size={30} className="animate-bounce" />
              <p className="font-semibold">My Cart</p>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <Search />{" "}
      </div>
    </div>
  );
};

export default Header;
