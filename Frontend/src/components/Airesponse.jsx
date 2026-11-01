import React from "react";
import ReactMarkdown from "react-markdown";

const Airesponse = ({ AiResponse }) => {
  return (
    <div className="shrink-0 w-full min-h-150 flex flex-col gap-4 p-4 md:p-6 relative rounded-2xl bg-[#201C42] border-2 border-[#38337A] shadow-2xl overflow-hidden">
      <div className="w-full min-w-0 overflow-y-auto overflow-x-hidden">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
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
              <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-[#F2F0FF] leading-7 wrap-break-word">
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-white">{children}</strong>
            ),
            hr: () => <hr className="my-6 border-[#38337A]" />,
          }}
        >
          {AiResponse || "Generating your personalized insights..."}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Airesponse;
