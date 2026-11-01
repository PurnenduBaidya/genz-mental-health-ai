import aicontroller from "../controller/ai.controller.js";
import express from "express";

const aiRouter = express.Router();

aiRouter.post("/ai-chat", aicontroller.chatgroq);
aiRouter.post("/ai-bot", aicontroller.chatbot);

export default aiRouter;
