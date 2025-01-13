import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { IoMdArrowRoundBack } from "react-icons/io";

const Search = () => {
  const [searchPage, setSearchPage] = useState(false);
  const location = useLocation();
  const [isMobile] = useMobile();
  const navigate = useNavigate();

  const handleRedirectToSearch = () => {
    navigate("/search");
  };

  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchPage(true);
    } else {
      setSearchPage(false);
    }
  }, [location.pathname]);
  return (
    <div
      onClick={handleRedirectToSearch}
      className="w-full max-w-lg border h-11 bg-slate-50 border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 group focus-within:border-yellow-400"
    >
      {isMobile && searchPage ? (
        <IoMdArrowRoundBack
          onClick={() => navigate(-1)}
          size={25}
          className="h-full font-semibold group-focus-within:text-yellow-400"
        />
      ) : (
        <IoSearchOutline
          size={25}
          className="h-full font-semibold group-focus-within:text-yellow-400"
        />
      )}
      {!searchPage ? (
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Search for Mice",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Search for Hamsters",
            1000,
            "Search for Guinea Pigs",
            1000,
            "Search for Chinchillas",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      ) : (
        <input
          type="text"
          placeholder="Search for products"
          className="w-full outline-none bg-transparent"
        />
      )}
    </div>
  );
};

export default Search;
