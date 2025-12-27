import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createLead } from "./odooClient.js";

dotenv.config();

const app = express();

/* =========================
   CORS (DEV SAFE)
========================= */
const allowedOrigins = [
    process.env.FRONTEND_ORIGIN,
    "http://localhost:5173",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like curl, postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`CORS blocked for origin: ${origin}`)
            );
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());

/* =========================
   HELTH CHECK
========================= */
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

/* =========================
   ROUTES
========================= */
app.post("/api/book-call", async (req, res) => {
    try {
        const leadId = await createLead(req.body);

        res.json({
            success: true,
            leadId,
        });
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
   START SERVER
========================= */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
