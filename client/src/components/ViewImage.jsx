import React from "react";
import { IoClose } from "react-icons/io5";

const ViewImage = ({ image, setViewImage }) => {
  return (
    <div
      onClick={() => setViewImage(false)}
      className="fixed z-50 top-0 left-0 w-full h-full bg-neutral-900 bg-opacity-20 flex items-center justify-center p-4"
    >
      <div className="bg-white w-full max-w-md max-h-[80vh] rounded p-4 ">
        <div className="flex justify-between items-center gap-3 mb-8">
          <h1 className="font-semibold">{image.name}</h1>
          <IoClose
            className="text-2xl cursor-pointer"
            onClick={() => setViewImage(false)}
          />
        </div>
        <img src={image.image} alt="" className="w-full max-h-[70vh]" />
      </div>
    </div>
  );
};

export default ViewImage;
