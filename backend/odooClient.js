/* =========================
   ENV VALIDATION
========================= */
const REQUIRED_ENVS = [
    "ODOO_URL",
    "ODOO_DB",
    "ODOO_USER",
    "ODOO_PASSWORD",
];

for (const key of REQUIRED_ENVS) {
    if (!process.env[key]) {
        throw new Error(`Missing required env var: ${key}`);
    }
}

/* =========================
   JSON-RPC HELPER
========================= */
async function jsonRpcCall(service, method, args) {
    const response = await fetch(`${process.env.ODOO_URL}/jsonrpc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: { service, method, args },
            id: Date.now(),
        }),
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.data?.message || "Odoo RPC Error");
    }

    return data.result;
}

/* =========================
   AUTHENTICATION
========================= */
async function authenticate() {
    const uid = await jsonRpcCall("common", "login", [
        process.env.ODOO_DB,
        process.env.ODOO_USER,
        process.env.ODOO_PASSWORD,
    ]);

    if (!uid) {
        throw new Error("Odoo authentication failed");
    }

    return uid;
}

/* =========================
   HTML HELPERS (SECURITY)
========================= */
function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function normalizeTimeline(value) {
    const map = {
        today: "Today",
        tomorrow: "Tomorrow",
        few_weeks: "In a few weeks",
    };
    return map[value] || "N/A";
}

/* =========================
   PARTNER HELPERS
========================= */
async function findPartner(uid, domain) {
    const ids = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "search",
        [domain],
        { limit: 1 },
    ]);

    return ids.length ? ids[0] : null;
}

async function readPartner(uid, partnerId, fields) {
    const [record] = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "read",
        [[partnerId], fields],
    ]);

    return record;
}

async function createPartner(uid, values) {
    return await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "create",
        [values],
    ]);
}

async function updatePartner(uid, partnerId, values) {
    return await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "write",
        [[partnerId], values],
    ]);
}

/* =========================
   MAIN ENTRY
========================= */
export async function createLead(formData) {
    const uid = await authenticate();

    /* =========================
       1️⃣ COMPANY (PARENT)
    ========================= */
    let companyId = await findPartner(uid, [
        "|", "|",
        ["name", "ilike", formData.companyName],
        ["website", "=", formData.website],
        ["phone", "=", formData.phoneNumber],
    ]);

    if (!companyId) {
        companyId = await createPartner(uid, {
            name: formData.companyName,
            website: formData.website,
            phone: formData.phoneNumber,
            is_company: true,
            company_type: "company",
        });
    } else {
        const company = await readPartner(uid, companyId, ["is_company"]);
        if (!company.is_company) {
            await updatePartner(uid, companyId, {
                is_company: true,
                company_type: "company",
            });
        }
    }

    /* =========================
       2️⃣ CONTACT (PERSON)
    ========================= */
    let contactId = await findPartner(uid, [
        "|", "|",
        ["email", "=", formData.businessEmail],
        ["phone", "=", formData.phoneNumber],
        ["website", "=", formData.website],
    ]);

    if (!contactId) {
        contactId = await createPartner(uid, {
            name: formData.name,
            email: formData.businessEmail,
            phone: formData.phoneNumber,
            website: formData.website,
            parent_id: companyId,
            company_type: "person",
        });
    } else {
        const contact = await readPartner(uid, contactId, ["parent_id"]);
        const currentParentId = contact.parent_id?.[0] || null;

        if (
            companyId &&
            contactId !== companyId &&
            currentParentId !== companyId
        ) {
            await updatePartner(uid, contactId, {
                parent_id: companyId,
            });
        }
    }

    /* =========================
       3️⃣ LEAD (CRM)
    ========================= */
    const descriptionHtml = `
<div style="font-family: Arial, sans-serif; line-height: 1.45;">
  <h3 style="margin-bottom: 10px;">📞 Book a Call – New Lead</h3>

  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="font-weight:700;">📌 Company</td><td>${escapeHtml(formData.companyName)}</td></tr>
    <tr><td style="font-weight:700;">👤 Contact</td><td>${escapeHtml(formData.name)}</td></tr>
    <tr><td style="font-weight:700;">📧 Email</td>
        <td><a href="mailto:${escapeHtml(formData.businessEmail)}">${escapeHtml(formData.businessEmail)}</a></td></tr>
    <tr><td style="font-weight:700;">📞 Phone</td>
        <td><a href="tel:${escapeHtml(formData.phoneNumber)}">${escapeHtml(formData.phoneNumber)}</a></td></tr>
    <tr><td style="font-weight:700;">🌐 Website</td>
        <td><a href="${escapeHtml(formData.website)}" target="_blank">${escapeHtml(formData.website)}</a></td></tr>
    <tr><td style="font-weight:700;">📍 Google Maps</td>
        <td><a href="${escapeHtml(formData.googleMapsLink)}" target="_blank">Open location</a></td></tr>
    <tr><td style="font-weight:700;">⏱ Timeline</td>
        <td>${normalizeTimeline(formData.solveTimeline)}</td></tr>
    <tr><td style="font-weight:700;">💰 Can afford trial</td>
        <td>${formData.canAffordTrial === "yes" ? "Yes" : "No"}</td></tr>
  </table>

  <hr style="margin:14px 0;" />

  <h4>🧠 Current Problem</h4>
  <p style="white-space: pre-wrap;">${escapeHtml(formData.currentProblem || "N/A")}</p>
</div>
`.trim();

    const leadId = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "crm.lead",
        "create",
        [
            {
                name: `Book a Call – ${formData.companyName}`,
                partner_id: contactId,
                contact_name: formData.name,
                email_from: formData.businessEmail,
                phone: formData.phoneNumber,
                website: formData.website,
                description: descriptionHtml,
            },
        ],
    ]);

    return leadId;
}
