import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createLead } from "./odooClient.js";

dotenv.config();

const app = express();

/* =========================
   CORS (DEV SAFE)
========================= */
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());

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
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
