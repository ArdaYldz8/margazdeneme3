const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    try {
        // Handle OPTIONS (CORS Preflight)
        if (event.requestContext && event.requestContext.http && event.requestContext.http.method === "OPTIONS") {
            return { statusCode: 200, headers, body: "" };
        }

        const method = event.requestContext ? event.requestContext.http.method : (event.httpMethod || "POST");
        const path = event.requestContext ? event.requestContext.http.path : (event.path || "/");

        // --- GET /api/dealers (List all dealers) ---
        if (method === "GET" && path === "/api/dealers") {
            const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
            const command = new ScanCommand({ TableName: "MargazDealers" });
            const response = await docClient.send(command);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(response.Items)
            };
        }

        // --- GET /api/dealers/:id (Get specific dealer) ---
        if (method === "GET" && path.startsWith("/api/dealers/")) {
            const id = path.split("/").pop();
            const { GetCommand } = require("@aws-sdk/lib-dynamodb");
            const command = new GetCommand({
                TableName: "MargazDealers",
                Key: { id }
            });
            const response = await docClient.send(command);

            if (!response.Item) {
                return { statusCode: 404, headers, body: JSON.stringify({ error: "Dealer not found" }) };
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(response.Item)
            };
        }

        // --- POST / (Telemetry Data) ---
        // Default behavior for root POST or direct invocation
        let body;
        if (event.body) {
            body = JSON.parse(event.body);
        } else {
            body = event;
        }

        const item = {
            device_id: body.device_id || "unknown",
            timestamp: Date.now(),
            tank_level: body.tank_level,
            voltage: body.voltage,
            received_at: new Date().toISOString()
        };

        const command = new PutCommand({
            TableName: "MargazTelemetry",
            Item: item,
        });

        await docClient.send(command);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Data saved successfully", item }),
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
        };
    }
};
