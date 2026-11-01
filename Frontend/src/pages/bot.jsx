import React, { useState } from "react";
import Nav from "../components/nav";
import { SendHorizontal, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const bot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userQuestion = question.trim();
    if (!userQuestion || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/ai/ai-bot",
        { question:userQuestion },
        {
          withCredentials: true,
        },
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.answer },
      ]);
      
    } catch (err) {
      console.log(err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#15122B] mind-font text-[#F2F0FF]">
      <Nav />
      <div className="h-[calc(100vh-80px)] flex justify-center">
        <ChevronLeft
          onClick={async () => {
            await navigate("/dashboard");
          }}
          className="absolute md:top-25 md:left-5 -left-5 z-50 cursor-pointer"
          size={60}
        />
        <div className="relative p-4 h-full w-full md:w-3/4 min-w-0">
          <div className="h-full w-full min-w-0 flex flex-col gap-4 p-4 md:p-6 rounded-2xl bg-[#201C42] border-2 border-[#38337A] shadow-2xl overflow-hidden">
            <div className="flex-1 min-h-0 w-full min-w-0 overflow-y-auto overflow-x-hidden scrollbar-none space-y-6 p-3">
              {messages.length === 0 && (
                <p className="text-[#B1ADD6] text-center mt-10">
                  Hello! I'm MindMate AI. Ask me anything about mental health.
                </p>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex w-full min-w-0 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`min-w-0 max-w-[90%] rounded-2xl p-4 md:p-5 ${
                      msg.role === "user"
                        ? "bg-[#38337A] rounded-br-sm"
                        : "bg-[#292451] border border-[#38337A] rounded-bl-sm"
                    }`}
                  >
                    <p className="text-xs text-[#B1ADD6] mb-3">
                      {msg.role === "user" ? "You" : "MindMate AI"}
                    </p>

                    {msg.role === "user" ? (
                      <p className="text-[#F2F0FF] leading-7 whitespace-pre-wrap wrap-break-word">
                        {msg.content}
                      </p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-3xl font-bold text-white mb-4">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-bold text-[#FF8FC7] mt-6 mb-3">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-[#B1ADD6] mt-4 mb-2">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-[#F2F0FF] leading-7 mb-4 wrap-break-word">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-6 space-y-2 mb-4 text-[#F2F0FF]">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-6 space-y-2 mb-4 text-[#F2F0FF]">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-[#F2F0FF] leading-7 wrap-break-word">
                              {children}
                            </li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-white">
                              {children}
                            </strong>
                          ),
                          hr: () => <hr className="my-6 border-[#38337A]" />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <p className="bg-[#292451] border border-[#38337A] rounded-2xl p-4 text-[#B1ADD6] animate-pulse">
                    MindMate AI is thinking...
                  </p>
                </div>
              )}
            </div>

            <div className="shrink-0 w-full flex">
              <form
                onSubmit={handleSubmit}
                className=" w-full flex items-center gap-3 p-2 bg-transparent border-2 border-[#aeabe0] rounded-full"
              >
                <input
                  type="text"
                  name="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={loading}
                  placeholder="Ask anything about mental health..."
                  className="flex-1 min-w-0 bg-transparent px-4 py-3 text-[#c7c6cf] outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="shrink-0 rounded-full bg-[#38337A] p-3 text-white"
                >
                  <SendHorizontal size={30} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default bot;
