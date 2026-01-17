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
   JSON-RPC helper
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
        throw data.error;
    }

    return data.result;
}

/* =========================
   Authentication
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
   PARTNER HELPERS
========================= */
async function findPartner(uid, domain) {
    const results = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "search",
        [domain],
        { limit: 1 },
    ]);

    return results.length ? results[0] : null;
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

/* =========================
   MAIN ENTRY
========================= */
export async function createLead(formData) {
    const uid = await authenticate();

    /* =========================
       1️⃣ Company (parent)
    ========================= */
    let companyId = null;

    if (formData.companyName) {
        companyId = await findPartner(uid, [
            ["name", "=", formData.companyName],
            ["is_company", "=", true],
        ]);

        if (!companyId) {
            companyId = await createPartner(uid, {
                name: formData.companyName,
                is_company: true,
            });
        }
    }

    /* =========================
       2️⃣ Contact
    ========================= */
    let contactId = await findPartner(uid, [
        ["email", "=", formData.businessEmail],
        ["is_company", "=", false],
    ]);

    if (!contactId) {
        contactId = await createPartner(uid, {
            name: formData.name,
            email: formData.businessEmail,
            phone: formData.phoneNumber || false,
            parent_id: companyId || false,
        });
    }

    /* =========================
       3️⃣ Lead
    ========================= */
    const leadId = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "crm.lead",
        "create",
        [
            {
                name: `Book a Call – ${formData.name}`,
                partner_id: contactId,
                email_from: formData.businessEmail,
                phone: formData.phoneNumber || false,
                //                 description: `
                // Problem:
                // ${formData.currentProblem || "N/A"}

                // Budget:
                // ${formData.canAfford === "yes" ? "Yes" : "No"}

                // Timeline:
                // ${formData.timeline || "N/A"}

                // Website:
                // ${formData.website || "N/A"}
                //         `,
            },
        ],
    ]);

    return leadId;
}
