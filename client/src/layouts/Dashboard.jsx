import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {

  return (
    <section className="grid md:grid-cols-[250px_1fr] h-[82vh]">
      <div className="bg-white px-4 py-4 h-full sticky top-28 hidden md:block border-r-2">
        <UserMenu />
      </div>
      <main className=" overflow-y-scroll scroll-smooth scrollBarNone">
        <Outlet />
      </main>
    </section>
  );
};

export default Dashboard;
