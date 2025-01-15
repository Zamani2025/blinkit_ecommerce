import React from "react";
import { IoClose } from "react-icons/io5";

const AddMoreField = ({ close, value, submit, onchange }) => {
  return (
    <section className=" p-4 fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-70 flex justify-center items-center ">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h1 className="font-bold">Add Field</h1>
          <IoClose size={25} onClick={close} />
        </div>
        <input
          type="text"
          value={value}
          onChange={onchange}
          placeholder="Enter field name"
          className="shadow w-full my-2 outline-none border  py-2 px-3 text-gray-700 leading-tight rounded focus-within:border-yellow-400"
        />
        <button
          onClick={submit}
          className="bg-yellow-400 px-4 py-2 rounded text-center text-white w-fit block hover:bg-yellow-400"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddMoreField;
