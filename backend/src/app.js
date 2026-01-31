import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

/* =========================
   SAFETY: LOG CRASHES
========================= */
process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
});

/* =========================
   CORS
   (Handled by API Gateway HTTP API)
========================= */
app.use(cors());

/* =========================
   BODY PARSER
========================= */
app.use(express.json({ limit: "1mb" }));

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "real-value-marketing-backend",
    });
});

/* =========================
   ROUTES
========================= */
import bookCallRoutes from "./routes/bookCall.js";
app.use("/api", bookCallRoutes);

/* =========================
   ERROR HANDLER (LAST)
========================= */
app.use((err, _req, res, _next) => {
    console.error("❌ Express error:", err);
    res.status(500).json({
        success: false,
        message: "Server error",
    });
});

export default app;
