import cookies from "cookie-parser";
import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.routes.js";
import userRoter from "./routes/user.routes.js";
import assesmentrouter from "./routes/assesments.routes.js";

const app = express();

app.use(express.json());
app.use(cookies());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/ai",aiRouter)
app.use("/api/user",userRoter)
app.use("/api/assessment", assesmentrouter);

export default app;
