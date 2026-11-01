import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, ChevronLeft } from "lucide-react";
import Nav from "../components/nav";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Airesponse from "../components/Airesponse";

const result = () => {
  const [AiResponse, setAiResponse] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const phqResult = state?.phqresult;
  const gadResult = state?.gadresult;
  console.log("Received navigation state:", state);

  useEffect(() => {
    if (!phqResult?.result || !gadResult?.result) return;

    const assessmentData = {
      phq9: {
        score: phqResult.result.score,
        severity: phqResult.result.severity,
      },
      gad7: {
        score: gadResult.result.score,
        severity: gadResult.result.severity,
      },
    };
    const aiChat = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/ai/ai-chat",
          assessmentData,
          {
            withCredentials: true,
          },
        );
        setAiResponse(res.data.answer);
      } catch (error) {
        console.error("AI chat error:", error.response?.data || error.message);
      }
    };
    aiChat();
  }, [phqResult, gadResult]);

  return (
    <div className="min-h-screen bg-[#15122B] mind-font text-[#F2F0FF]">
      <Nav />
      <div className="w-full h-[calc(100vh-80px)] flex  gap-2 overflow-y-auto hide-scrollbar ">
        <div className="p-4 h-full w-full gap-10  flex flex-col  items-center ">
          <div className="w-full md:h-52 h-1/2 flex flex-col md:flex-row justify-center items-center gap-4">
            <ChevronLeft
              onClick={async () => {
                await navigate("/dashboard");
              }}
              className="absolute top-25 md:left-5 left-1  cursor-pointer"
              size={60}
            />
            <div className="md:w-1/4 w-75 h-full flex flex-col gap-4 p-4 relative rounded-2xl bg-[#201C42] backdrop-blur-md border-2 border-[#38337A] shadow-2xl">
              <h1 className="text-4xl font-extrabold text-[#ffffff]">
                Mood · PHQ-9
              </h1>
              <p className="text-[#B1ADD6]">
                Interest, mood, sleep, energy and focus
              </p>
              <div>
                <span className="font-bold text-4xl">
                  {" "}
                  {phqResult?.result?.score}
                </span>
                <small className="font-bold text-lg">/27</small>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-3xl bg-white/20">
                <div
                  className="h-full rounded-3xl bg-[#8E86FF]"
                  style={{
                    width: `${((phqResult?.result?.score ?? 0) / 27) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="md:w-1/4 h-full flex flex-col gap-4 p-4 relative rounded-2xl bg-[#201C42] backdrop-blur-md border-2 border-[#38337A] shadow-2xl">
              <h1 className="text-4xl font-extrabold text-[#ffffff]">
                Anxiety · GAD-7
              </h1>
              <p className="text-[#B1ADD6]">Worry, tension and restlessness</p>
              <div>
                <span className="font-bold text-4xl">
                  {gadResult?.result?.score}
                </span>
                <small className="font-bold text-lg">/21</small>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-3xl bg-white/20">
                <div
                  className="h-full rounded-3xl bg-[#FF8FC7]"
                  style={{
                    width: `${((gadResult?.result?.score ?? 0) / 21) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <Bot
            onClick={async () => {
                await navigate("/ChatBot");
              }}
              className="absolute md:right-10 right-2 top-25 cursor-pointer"
              size={50}
            />
          </div>
          <Airesponse AiResponse={AiResponse}/>
        </div>
      </div>
    </div>
  );
};

export default result;
