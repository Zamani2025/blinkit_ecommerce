import React from "react";
import UserMenu from "../components/UserMenu";
import { IoArrowBack } from "react-icons/io5";
import useMobile from "../hooks/useMobile";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [isMobile] = useMobile();
  const navigate = useNavigate();

  if (!isMobile) {
    navigate("/");
  };
  return (
    <section className="bg-white px-4 py-16 container  mx-auto relative text-2xl">
      <IoArrowBack
        onClick={() => window.history.back()}
        size={25}
        className="absolute top-4 left-4"
      />
      <UserMenu />
    </section>
  );
};

export default UserPage;
