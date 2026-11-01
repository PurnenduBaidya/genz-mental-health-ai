import React from "react";

const footer = () => {
  return (
    <div className="w-full h-screen md:h-50 pt-10 bg-[#15122B]">
      <div className="w-full h-full md:h-[40%] flex flex-col md:flex-row justify-center items-center gap-6 md:gap-20 px-4 py-2 md:p-10">
        <div className="flex flex-col justify-center gap-2 bg-[#201C42] border-2 border-[#38337A] rounded-4xl p-4">
          <h1 className="text-white text-xl font-bold ">Answer 16 questions</h1>
          <p className="text-[#B1ADD6] text-lg">
            9 about mood, 7 about anxiety. Think about the last 2 weeks.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-2 bg-[#201C42] border-2 border-[#38337A] rounded-4xl p-4">
          <h1 className="text-white text-xl font-bold">
            Get your wellness score
          </h1>
          <p className="text-[#B1ADD6] text-lg">
            One number from 0 to 100, plus a breakdown for each scale.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-2 bg-[#201C42] border-2 border-[#38337A] rounded-4xl p-4">
          <h1 className="text-white text-xl font-bold">See what helps</h1>
          <p className="text-[#B1ADD6] text-lg">
            Small, specific next steps, and where to get support if you need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default footer;
