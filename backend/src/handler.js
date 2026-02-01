import { createLead as createOdooLead } from "./odooClient.js";
import { validateLeadPayload } from "./validators.js";
import { ok, badRequest, serverError } from "./responses.js";

export async function createLead(event) {
    try {
        if (!event.body) {
            return badRequest("Missing request body");
        }

        const payload = JSON.parse(event.body);

        validateLeadPayload(payload);

        const leadId = await createOdooLead(payload);

        return ok({
            success: true,
            leadId,
        });
    } catch (error) {
        console.error("Lambda error:", error);

        if (error.message?.startsWith("VALIDATION")) {
            return badRequest(error.message.replace("VALIDATION: ", ""));
        }

        return serverError("Internal server error");
    }
}
