import React from "react";
import Footer from "./footer.jsx";
const body = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col">
      <div className="flex flex-col md:flex md:flex-row h-3/4 w-full">
        <div className="w-full h-[40%] md:h-[60%] md:w-[40%] justify-center items-center pl-25 pt-2 md:pl-30 md:pt-6">
          <div
            className="aspect-square w-59 md:w-87 animate-morph motion-reduce:animate-none
         rounded-[46%_54%_52%_48%/50%_44%_56%_50%]
         bg-[radial-gradient(circle_at_30%_28%,#FFF3B0,#FF8FC7_55%,#5B50F0)]
         shadow-[0_30px_60px_-20px_#5B50F0,inset_-14px_-18px_40px_rgba(31,27,61,0.25)]"
            role="img"
            aria-label="Soft, shifting mood orb"
          ></div>
        </div>
        <div className="w-full h-[60%] md:w-[60%]  flex flex-col justify-items-start gap-3 pt-8 px-4 py-2 md:p-10">
          <h1 className="mind-font text-white text-[clamp(2.6rem,8vw,4.8rem)] font-black">
            How's your Mind Today?
          </h1>
          <p className="text-[#B1ADD6] md:pr-50 text-2xl">
            A 3-minute check-in built on PHQ-9 and GAD-7, the same
            questionnaires clinicians use. Answer honestly, get a wellness score
            and a plain-English read of where you're at.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default body;
