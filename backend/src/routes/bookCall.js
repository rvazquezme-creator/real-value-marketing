import express from "express";

const router = express.Router();

router.post("/book-call", async (req, res) => {
    try {
        // Lazy import: avoids crashing Lambda on cold start
        const { createLead } = await import("../../odooClient.js");

        const leadId = await createLead(req.body);

        return res.status(200).json({
            success: true,
            leadId,
        });
    } catch (error) {
        console.error("❌ Book call error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create lead",
        });
    }
});

export default router;
