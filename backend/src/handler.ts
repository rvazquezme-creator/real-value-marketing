export const api = async () => {
    return {
        statusCode: 200,
        headers: {
            "access-control-allow-origin": "*",
            "access-control-allow-headers": "*",
            "access-control-allow-methods": "*",
        },
        body: JSON.stringify({ ok: true, service: "api" }),
    };
};
