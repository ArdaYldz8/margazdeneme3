const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const dotenv = require('dotenv');
dotenv.config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });

async function checkData() {
    console.log("Checking DynamoDB for data...");
    try {
        const command = new ScanCommand({
            TableName: "MargazTelemetry",
            Limit: 10 // Just get the last few items
        });
        const response = await client.send(command);

        if (response.Items && response.Items.length > 0) {
            console.log(`✅ Found ${response.Items.length} items!`);
            response.Items.forEach(item => {
                console.log(`- Device: ${item.device_id.S}, Level: ${item.tank_level.N}%, Time: ${item.timestamp.N}`);
            });
        } else {
            console.log("❌ No data found in table yet.");
        }
    } catch (err) {
        console.error("Error scanning table:", err);
    }
}

checkData();
