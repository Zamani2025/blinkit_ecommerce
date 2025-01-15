import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const [searchPage, setSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchPage(true);
    } else {
      setSearchPage(false);
    }
  }, [location.pathname]);

  const handleRedirectToUser = () => {
    if (user?._id) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="border flex flex-col gap-2 sticky top-0 shadow bg-white h-28 lg:h-20 px-4 z-30">
      <div className="flex justify-between items-center md:h-full container mx-auto">
        <Link
          to={"/"}
          className="lg:text-5xl text-4xl font-bold text-green-700"
        >
          Blink<span className="text-yellow-400">it</span>
        </Link>
        <div className="hidden md:block md:w-[300px] lg:w-[400px]">
          <Search />
        </div>
        <div className="flex justify-center items-center">
          <FaUserCircle onClick={handleRedirectToUser} size={30} className="block md:hidden" />
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="hidden justify-center items-center gap-8 md:flex"
          >
            {user?._id ? (
              <div className="flex cursor-pointer justify-center transition-all duration-300 items-center gap-1 relative">
                <p>Account</p>
                {showDropdown ? (
                  <GoTriangleUp size={25} />
                ) : (
                  <GoTriangleDown size={25} />
                )}
                {showDropdown && (
                  <div className="absolute w-[200px] rounded top-8 right-0 bg-white shadow-md p-2 flex flex-col gap-2">
                    <UserMenu close={() => setShowDropdown(false)} />
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <div className="bg-green-800 px-2 hover:bg-green-700 transition-all duration-300 cursor-pointer  py-2 text-white flex justify-center items-center gap-1 rounded-md">
              <FaShoppingBag size={30} className="animate-bounce" />
              <p className="font-semibold">My Cart</p>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <Search />{" "}
      </div>
    </div>
  );
};

export default Header;
