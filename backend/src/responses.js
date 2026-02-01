function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
    };
}

export function ok(body) {
    return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(body),
    };
}

export function badRequest(message) {
    return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({
            success: false,
            error: message,
        }),
    };
}

export function serverError(message) {
    return {
        statusCode: 500,
        headers: corsHeaders(),
        body: JSON.stringify({
            success: false,
            error: message,
        }),
    };
}
