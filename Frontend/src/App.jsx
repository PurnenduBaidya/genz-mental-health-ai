import React from "react";
import Home from "./pages/home.jsx";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import AssessmentPage from "./pages/assessmentPage.jsx";
import Result from "./pages/result.jsx";
import Bot from "./pages/bot.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions" element={<AssessmentPage />} />
        <Route path="/result" element={<Result />} />
        <Route path="ChatBot" element={<Bot />} />
      </Routes>
    </div>
  );
};

export default App;
