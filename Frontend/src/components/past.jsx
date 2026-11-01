
import React, { useEffect, useState } from "react";
import { History, Brain, Activity, CalendarDays, ChevronRight } from "lucide-react";
import axios from "axios";

const Past = () => {
  const [past, setPast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assessment = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/assessment",
          {
            withCredentials: true,
          }
        );

        setPast(res.data.Score);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    assessment();
  }, []);

  const checkIns = [
    ...(past?.PHQ9 || []).map((item) => ({
      ...item,
      type: "PHQ-9",
      title: "Depression Check",
      maxScore: 27,
    })),
    ...(past?.GAD7 || []).map((item) => ({
      ...item,
      type: "GAD-7",
      title: "Anxiety Check",
      maxScore: 21,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case "minimal":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-400/30";
      case "mild":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-400/30";
      case "moderate":
        return "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30";
      case "moderately severe":
        return "bg-orange-500/20 text-orange-300 border-orange-400/30";
      case "severe":
        return "bg-red-500/20 text-red-300 border-red-400/30";
      default:
        return "bg-[#38337A] text-[#B1ADD6] border-[#514A91]";
    }
  };

  return (
    <div className="w-95 md:w-160 h-120 md:h-90 md:max-h-125 p-6 flex flex-col gap-6 relative md:right-25 rounded-2xl bg-[#201C42] backdrop-blur-md border-2 border-[#38337A] shadow-2xl">


      <div className="flex items-center gap-4 shrink-0">
        <div className="p-3 rounded-2xl bg-linear-to-br from-fuchsia-500 to-violet-600">
          <History size={32} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Past Check-ins
          </h1>
          <p className="text-sm text-[#B1ADD6]">
            Your previous mental health check-ins
          </p>
        </div>

        <span className="ml-auto text-sm text-[#B1ADD6]">
          {checkIns.length} results
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none pr-1 space-y-3">

        {loading ? (
          <div className="h-full flex items-center justify-center text-[#B1ADD6]">
            Loading your check-ins...
          </div>
        ) : checkIns.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
            <Brain size={45} className="text-[#8178D8]" />
            <h2 className="text-lg font-semibold text-white">
              No past check-ins yet
            </h2>
            <p className="text-sm text-[#B1ADD6]">
              Your completed assessments will appear here.
            </p>
          </div>
        ) : (
          checkIns.map((item, index) => (
            <div
              key={`${item.type}-${item.createdAt}-${index}`}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-[#38337A] bg-[#292451]/70 hover:bg-[#30295D] transition-colors"
            >
              <div
                className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  item.type === "PHQ-9"
                    ? "bg-linear-to-br from-fuchsia-500 to-purple-700"
                    : "bg-linear-to-br from-blue-500 to-cyan-500"
                }`}
              >
                {item.type === "PHQ-9" ? (
                  <Brain size={25} className="text-white" />
                ) : (
                  <Activity size={25} className="text-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-white text-lg">
                  {item.type}
                </h2>
                <p className="text-sm text-[#B1ADD6]">
                  {item.title}
                </p>
              </div>


              <div className="sm:min-w-20">
                <p className="text-xs text-[#B1ADD6]">Score</p>
                <p className="text-2xl font-extrabold text-white">
                  <span
                    className={
                      item.type === "PHQ-9"
                        ? "text-fuchsia-400"
                        : "text-cyan-400"
                    }
                  >
                    {item.score}
                  </span>
                  <span className="text-sm font-normal text-[#B1ADD6]">
                    {" "}/ {item.maxScore}
                  </span>
                </p>
              </div>

              <div className="sm:min-w-28">
                <p className="text-xs text-[#B1ADD6] mb-1">
                  Severity
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${getSeverityStyle(
                    item.severity
                  )}`}
                >
                  {item.severity}
                </span>
              </div>

              <div className="sm:min-w-28 sm:max-w-32">
                <div className="flex items-center gap-2 text-[#B1ADD6]">
                  <CalendarDays size={17} className="shrink-0" />
                  <span className="text-xs">
                    {new Date(item.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>

              <ChevronRight
                size={22}
                className="hidden sm:block text-violet-400 shrink-0"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Past;
