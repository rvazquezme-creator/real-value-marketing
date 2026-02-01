const REQUIRED_FIELDS = [
    "name",
    "businessEmail",
    "phoneNumber",
    "website",
    "companyName",
    "googleMapsLink",
    "solveTimeline",
];

const ALLOWED_TIMELINES = ["today", "tomorrow", "few_weeks"];

export function validateLeadPayload(data) {
    if (!data || typeof data !== "object") {
        throw new Error("VALIDATION: Invalid payload");
    }

    for (const field of REQUIRED_FIELDS) {
        if (!data[field] || String(data[field]).trim() === "") {
            throw new Error(`VALIDATION: Missing field "${field}"`);
        }
    }

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.businessEmail)
    ) {
        throw new Error("VALIDATION: Invalid email address");
    }

    if (!data.googleMapsLink.includes("google.com/maps")) {
        throw new Error("VALIDATION: Invalid Google Maps URL");
    }

    if (!ALLOWED_TIMELINES.includes(data.solveTimeline)) {
        throw new Error("VALIDATION: Invalid solve timeline");
    }
}
