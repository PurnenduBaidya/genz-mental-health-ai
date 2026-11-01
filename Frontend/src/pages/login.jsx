import React from "react";
import Navbar from "../components/navbar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.Email.value,
      password: e.target.password.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        data,
        {
          withCredentials: true,
        },
      );
      navigate("/dashboard");
    } catch (error) {
      alert("User is not exist");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-[calc(100vh-80px)] bg-[#15122B] text-[#F2F0FF] flex flex-col items-center justify-center overflow-hidden">
        <div className="w-80 md:w-100 h-95 md:max-h-125 p-6 flex flex-col gap-6 relative rounded-2xl bg-[#201C42] backdrop-blur-md border border-white/40 shadow-2xl">
          <h2 className="text-4xl font-extrabold mind-font">Welcome Back</h2>
          <p className="text-[#B1ADD6] text-lg">
            Log in to see your past check-ins.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="">
              <span className="font-semibold pl-3">Email</span>
              <input
                type="Email"
                name="Email"
                placeholder="xyz@gmail.com"
                autoComplete="email"
                className="w-full px-4 py-2 mb-3 rounded-lg bg-black text-slate-100 placeholder-slate-500 border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
            <label htmlFor="">
              <span className="font-semibold pl-3">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 mb-3 rounded-lg bg-black text-slate-100 placeholder-slate-500 border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-300 cursor-pointer"
            >
              Log In
            </button>
          </form>
          <span className=" w-full text-center">
            Never Here ,{" "}
            <a
              className="underline text-blue-400"
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Make an Account
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default login;
