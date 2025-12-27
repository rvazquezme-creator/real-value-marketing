import fetch from "node-fetch";

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
   Partner helpers
========================= */
async function findPartnerByEmail(uid, email) {
    if (!email) return null;

    const partners = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "search_read",
        [[["email", "=", email]]],
        { limit: 1 },
    ]);

    return partners.length ? partners[0] : null;
}

async function findOrCreateCompany(uid, companyName) {
    if (!companyName) return null;

    const companies = await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "search_read",
        [[["name", "=", companyName], ["is_company", "=", true]]],
        { limit: 1 },
    ]);

    if (companies.length) {
        return companies[0].id;
    }

    return await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "create",
        [
            {
                name: companyName,
                is_company: true,
            },
        ],
    ]);
}

async function createContact(uid, formData, companyId) {
    return await jsonRpcCall("object", "execute_kw", [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        "res.partner",
        "create",
        [
            {
                name: formData.name,
                email: formData.businessEmail,
                phone: formData.phoneNumber || false,
                website: formData.website || false,
                parent_id: companyId || false,
            },
        ],
    ]);
}

/* =========================
   Main Lead Creator
========================= */
export async function createLead(formData) {
    const uid = await authenticate();

    // 1️⃣ Find or create company
    const companyId = await findOrCreateCompany(
        uid,
        formData.companyName
    );

    // 2️⃣ Find or create contact
    let contact = await findPartnerByEmail(
        uid,
        formData.businessEmail
    );

    let contactId;
    if (contact) {
        contactId = contact.id;
    } else {
        contactId = await createContact(
            uid,
            formData,
            companyId
        );
    }

    // 3️⃣ Create CRM lead linked to contact
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
                contact_name: formData.name,
                email_from: formData.businessEmail,
                phone: formData.phoneNumber || false,
                description: `
Can afford $997 trial: ${formData.canAffordTrial}
Timeline: ${formData.solveTimeline}

Problem:
${formData.currentProblem}
                `,
            },
        ],
    ]);

    return leadId;
}
