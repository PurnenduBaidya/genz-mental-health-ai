import React, { useState, useEffect } from "react";
import Nav from "../components/nav.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Past from "../components/past.jsx";

const dashboard = () => {
  const [profile, setprofile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/user", {
          withCredentials: true,
        });
        setprofile(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    user();
  }, []);

  return (
    <div className="min-h-screen bg-[#15122B] mind-font text-[#F2F0FF]">
      <Nav />
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="p-4 h-full w-full md:w-3/4 gap-10 overflow-y-scroll grid grid-cols-1 md:grid-cols-2 place-items-center hide-scrollbar">
          <div className="w-95 md:w-160 h-90 md:max-h-125 p-6 flex flex-col gap-6 relative md:left-12 rounded-2xl bg-[#8E86FF] backdrop-blur-md border-2 border-[#F2F0FF] shadow-2xl">
            <h1 className="md:text-5xl text-4xl font-extrabold text-[#15122B]">
              Hey, {profile?.profile?.name || "there"}! Ready to check in?
            </h1>
            <p className="text-[#352c76]">
              9 questions on mood, 7 on anxiety. Think about how the last 2
              weeks have been.
            </p>
            <button
              className="bg-[#FFE27A] font-bold text-[#1F1B3D] w-50 text-lg border-2 px-6 py-2 rounded-full md:px-8 md:py-2 cursor-pointer absolute bottom-6 left-6 hover:bg-[#FFD700] transition duration-300"
              onClick={() => navigate("/questions")}
            >
              Start Check In
            </button>
            <div className="w-1/2 h-1/2 relative  -bottom-5 md:-bottom-5 left-46 md:left-79 overflow-hidden rounded-2xl">
              <div className="w-50 h-50 absolute top-0 left-5 md:left-32 rounded-full bg-[radial-gradient(circle_at_30%_28%,#FFF3B0,#FF8FC7_55%,#3A2FA8)]"></div>
            </div>
          </div>

          <div className="w-95 md:w-100 h-95 md:max-h-128 p-6 flex flex-col gap-6 relative rounded-2xl bg-[#201C42] backdrop-blur-md border-2 border-[#38337A] shadow-2xl">
            <h1 className="text-4xl font-extrabold text-[#ffffff]">
              Latest wellness score
            </h1>
            <p className="text-[#B1ADD6]">From your check-in on 1 Oct</p>
            <div>
              <span className="font-bold text-6xl">
                {profile?.Score?.percentage?.percentage ?? 0}%
              </span>
              <small className="font-bold text-lg">/100</small>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full ">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between text-[#F2F0FF]">
                  <span>Mood-PHQ-9</span>
                  <span>
                    {profile?.Score?.PHQ9?.score ?? 0}/27-
                    {profile?.Score?.PHQ9?.severity}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-3xl bg-white/20">
                  <div
                    className="h-full rounded-3xl bg-[#8E86FF]"
                    style={{
                      width: `${((profile?.Score?.PHQ9?.score ?? 0) / 27) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between text-[#F2F0FF]">
                  <span>Anxiety-GAD-7</span>
                  <span>
                    {profile?.Score?.GAD7?.score ?? 0}/21-
                    {profile?.Score?.GAD7?.severity}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-3xl bg-white/20">
                  <div
                    className="h-full rounded-3xl bg-[#FF8FC7]"
                    style={{
                      width: `${((profile?.Score?.GAD7?.score ?? 0) / 21) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-95 md:w-100 h-70 md:h-90 md:max-h-125 p-6 flex flex-col gap-6 relative md:-left-17 rounded-2xl bg-[#3A1530] backdrop-blur-md border-2 border-[#F2F0FF] shadow-2xl">
            <h1 className="text-4xl font-extrabold text-[#ffffff]">
              need to someone to talk to?
            </h1>
            <p className="text-[#B1ADD6]">
              Free, confidential support, any time of day..
            </p>
            <button
              onClick={async () => {
                await navigate("/ChatBot");
              }}
              className="bg-[#FFE27A] font-bold text-[#1F1B3D] w-78 text-lg border-2 px-6 py-2 rounded-full md:px-8 md:py-2 cursor-pointer absolute bottom-6 left-6 hover:bg-[#FFD700] transition duration-300"
            >
              Talk to a counselor
            </button>
          </div>

          <Past />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
