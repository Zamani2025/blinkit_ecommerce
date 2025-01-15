import NoData from "../assets/No_data_found.png";
import React from "react";

const NoDataComponent = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-1 mt-8">
      <img src={NoData} alt="No Data Found" className="w-36 h-36 rounded animate-bounceOnce" />
      <p className="font-semibold text-red-600">No Data Available</p>
    </div>
  );
};

export default NoDataComponent;
