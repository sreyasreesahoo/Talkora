import express from "express";
import dotenv from "dotenv";
import { authRoutes, userRoutes, chatRoutes } from "./routes/index.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

const __dirname = path.resolve();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/Talkora/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/Talkora/dist/index.html"));
  });
}

// Start server and connect DB
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
