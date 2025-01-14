import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  return (
    <section className="grid lg:grid-cols-[250px_1fr] h-[82vh]">
      <div className="bg-white px-4 py-4 h-full sticky top-28 hidden lg:block border-r-2">
        <UserMenu />
      </div>
      <main className="h-full overflow-y-scroll">
        <Outlet />
      </main>
    </section>
  );
};

export default Dashboard;
