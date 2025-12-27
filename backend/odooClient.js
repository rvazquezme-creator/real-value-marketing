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
   Lead creator
========================= */
export async function createLead(formData) {
    const uid = await authenticate();

    const leadId = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "crm.lead",
        "create",
        [
            {
                name: `Book a Call – ${formData.name}`,
                email_from: formData.businessEmail,
                phone: formData.phoneNumber || false,
                description: formData.currentProblem || "",
            },
        ],
    ]);

    return leadId;
}
