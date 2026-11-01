import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assessmentQuestions } from "../Data/assessmentQuestions.js";
import axios from "axios";

function AssessmentPage() {
  const [phqresult, setphqresult] = useState(null);
  const [gadresult, setgadresult] = useState(null);
  const phq = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/assessment/submit-phq9",
        {
          answers: answers["phq-9"],
        },
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error) {
      console.error(
        "Error submitting PHQ-9:",
        error.response?.data || error.message,
      );
    }
  };

  const gad = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/assessment/submit-gad7",
        {
          answers: answers["gad-7"],
        },
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error) {
      console.error(
        "Error submitting GAD-7:",
        error.response?.data || error.message,
      );
    }
  };

  const navigate = useNavigate();
  const [type, settype] = useState("phq-9");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({
    "phq-9": [],
    "gad-7": [],
  });
  const assessment = assessmentQuestions[type];

  if (!assessment) {
    return <div>Assessment not found.</div>;
  }
  const currentQuestion = assessment.questions[currentIndex];

  const handleAnswer = (value) => {
    setAnswers((previous) => {
      const updated = [...previous[type]];

      updated[currentIndex] = value;

      return {
        ...previous,
        [type]: updated,
      };
    });
  };

  const handleNext = async () => {
    if (answers[type][currentIndex] === undefined) {
      alert("Please select an answer first.");
      return;
    }

    if (currentIndex < assessment.questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      return;
    }
    // const score = answers[type].reduce((total, value) => total + value, 0);

    // console.log("Assessment:", assessment.type);
    // console.log("Answers:", answers[type]);
    // console.log("Score:", score);

    if (type === "phq-9") {
      const result = await phq();
      if (!result) return;

      setphqresult(result);
      settype("gad-7");
      setCurrentIndex(0);
      return;
    }
    if (type === "gad-7") {
      const result = await gad();
      if (!result) return;
      setgadresult(result);
      navigate("/result", {
        state: {
          phqresult: phqresult,
          gadresult: result,
        },
      });
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
    }
  };

  const progress = ((currentIndex + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#100D20] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
        <div className="mb-8">
          <p className="text-sm text-[#FF8FC7]">{assessment.type} Assessment</p>

          <h1 className="mt-2 text-3xl font-bold">{assessment.title}</h1>

          <p className="mt-2 text-white/60">{assessment.description}</p>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex justify-between text-sm text-white/70">
            <span>
              Question {currentIndex + 1} of {assessment.questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#FF8FC7] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="mb-6 text-xl font-semibold leading-relaxed md:text-2xl">
          {currentQuestion}
        </h2>

        <div className="space-y-3">
          {assessment.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleAnswer(option.value)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                answers[type][currentIndex] === option.value
                  ? "border-[#FF8FC7] bg-[#FF8FC7]/15"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    answers[type][currentIndex] === option.value
                      ? "border-[#FF8FC7] bg-[#FF8FC7]"
                      : "border-white/40"
                  }`}
                >
                  {answers[type][currentIndex] === option.value && (
                    <span className="h-2 w-2 rounded-full bg-[#100D20]" />
                  )}
                </span>

                {option.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="rounded-xl border border-white/20 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="rounded-xl bg-[#FF8FC7] px-6 py-3 font-semibold text-[#100D20] transition hover:bg-[#ffa8d3]"
          >
            {currentIndex === assessment.questions.length - 1
              ? "Finish Assessment"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssessmentPage;
