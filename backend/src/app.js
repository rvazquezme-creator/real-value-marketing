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
   CORS (PROD + DEV)
========================= */
const allowedOrigins = [
    process.env.FRONTEND_ORIGIN,          // https://realvaluemarketing.com
    process.env.FRONTEND_ORIGIN_WWW,      // https://www.realvaluemarketing.com
    "http://localhost:5173",
].filter(Boolean);

app.use(
    cors({
        origin(origin, callback) {
            // Allow requests with no origin (curl, health checks, server-to-server)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.warn("❌ CORS blocked origin:", origin);
            return callback(new Error("CORS blocked"));
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
        credentials: false,
    })
);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json({ limit: "1mb" }));

/* =========================
   HEALTH CHECK (MUST ALWAYS WORK)
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
    if (String(err?.message || "").startsWith("CORS blocked")) {
        return res.status(403).json({
            success: false,
            message: "CORS not allowed",
        });
    }

    console.error("❌ Express error:", err);
    res.status(500).json({
        success: false,
        message: "Server error",
    });
});

export default app;
