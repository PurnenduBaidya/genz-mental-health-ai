import React from "react";
import { useNavigate } from "react-router-dom";

const navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-20 w-full bg-[#201C42] flex justify-center items-center border-b-2 border-[#8E86FF]">
      <div className="flex justify-between items-center h-full w-full text-white px-2 py-4 md:px-8 md:py-4">
        <div className=" flex justify-center items-center px-4 gap-2 h-full">
          <button
            onClick={() => {
              navigate("/");
            }}
           className="logo cursor-pointer">
            <i></i>
          </button>
          <h1 className="font-bold text-lg mind-font md:text-2xl ">
            Mind Metere
          </h1>
        </div>
        <div className=" flex justify-center items-center px-2 md:px-4 gap-5 h-full ">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="font-bold text-sm md:text-lg border-2 border-blue-400 px-6 py-2 rounded-full md:px-8 md:py-2 cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-[#8E86FF]  font-bold text-sm md:text-lg border-2 px-6 py-2 rounded-full md:px-8 md:py-2 cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default navbar;
