import React from "react";
import Nav from "../components/nav.jsx";

const AssessmentPage = () => {
  return (
    <div className="min-h-screen bg-[#15122B] mind-font text-[#F2F0FF]">
      <Nav />
      <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-start items-center">
        <div className="p-4 w-100 md:w-270 flex flex-col justify-center items-center ">
          <div className="h-3 w-full overflow-hidden rounded-3xl bg-white/20">
            <div
              className="h-full rounded-3xl bg-[#8E86FF]"
              style={{ width: `${(10 / 27) * 100}%` }}
            ></div>
          </div>
          <div className="flex flex-col gap-2 w-full md:text-lg text-sm py-2 px-1">
            <div className="flex justify-between text-[#B1ADD6]">
              <span>Part 1 of 2 . MOOD</span>
              <span>1 of 16</span>
            </div>
          </div>
        </div>
        <div className="w-90  md:w-270 h-90 md:max-h-125 p-3 flex flex-col gap-6 relative ">
          <div className="text-[#B1ADD6] py-5 flex flex-col justify-start gap-3">
            <p>Over the last 2 weeks, how often have you been bothered by:</p>

            <h2 className=" mind-font text-[#F2F0FF] font-bold py-2 text-2xl md:text-4xl md:font-extrabold">
              Little interest or pleasure in doing things
            </h2>
            <div className="flex flex-col  gap-5 w-full md:text-lg text-sm py-2 px-1">
              <button className="md:w-3/4 w-full h-15 flex justify-center items-center gap-2 bg-[#201C42] border-2 border-[#38337A] rounded-full text-2xl transform transition duration-300 hover:border-[#8E86FF] hover:scale-105">
                <span>🌤️</span>Not At All
              </button>
              <button className="md:w-3/4 w-full h-15 flex justify-center items-center gap-2 bg-[#201C42] border-2 border-[#38337A] rounded-full text-2xl transform transition duration-300 hover:border-[#8E86FF] hover:scale-105">
                <span>⛅</span>Several Days
              </button>
             <button className="md:w-3/4 w-full h-15 flex justify-center items-center gap-2 bg-[#201C42] border-2 border-[#38337A] rounded-full text-2xl transform transition duration-300 hover:border-[#8E86FF] hover:scale-105">
                <span>🌥️</span>More Than Half The Days
              </button>
             <button className="md:w-3/4 w-full h-15 flex justify-center items-center gap-2 bg-[#201C42] border-2 border-[#38337A] rounded-full text-2xl transform transition duration-300 hover:border-[#8E86FF] hover:scale-105">
                <span>🌧️</span>Nearly Every Day
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
