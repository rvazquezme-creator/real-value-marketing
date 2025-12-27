import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createLead } from "./odooClient.js";

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
    process.env.FRONTEND_ORIGIN, // https://xxx.vercel.app
    "http://localhost:5173",
].filter(Boolean);

app.use(
    cors({
        origin(origin, callback) {
            // allow requests with no origin (curl, health checks, etc.)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`CORS blocked for origin: ${origin}`)
            );
        },
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

/* =========================
   MIDDLEWARES
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
app.post("/api/book-call", async (req, res) => {
    try {
        const leadId = await createLead(req.body);
        res.status(200).json({ success: true, leadId });
    } catch (error) {
        console.error("❌ Odoo error full:", JSON.stringify(error, null, 2));
        res.status(500).json({
            success: false,
            message: "Failed to create lead",
            error,
        });
    }
});

/* =========================
   ERROR HANDLER
========================= */
app.use((err, _req, res, _next) => {
    if (String(err?.message || "").startsWith("CORS blocked")) {
        return res.status(403).json({ success: false, message: err.message });
    }

    console.error("❌ Express error:", err);
    res.status(500).json({ success: false, message: "Server error" });
});

/* =========================
   START SERVER (Railway)
========================= */
const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
    console.log(`✅ API running on port ${PORT}`);
    console.log("✅ Allowed CORS origins:", allowedOrigins);
});
