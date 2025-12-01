const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    try {
        // Handle both direct invocation and API Gateway proxy integration
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
            body: JSON.stringify({ message: "Data saved successfully", item }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to save data", details: error.message }),
        };
    }
};
