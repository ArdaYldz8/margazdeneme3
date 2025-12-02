
const { PrismaClient } = require('@prisma/client');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const dotenv = require('dotenv');
const path = require('path');

// Load env from backend root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const prisma = new PrismaClient();
const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

async function migrate() {
    console.log("🚀 Starting migration from Local SQLite to AWS DynamoDB...");

    try {
        // 1. Fetch all dealers from local DB
        const dealers = await prisma.dealer.findMany();
        console.log(`📦 Found ${dealers.length} dealers in local database.`);

        if (dealers.length === 0) {
            console.log("⚠️ No dealers to migrate.");
            return;
        }

        // 2. Upload to DynamoDB
        let successCount = 0;
        let failCount = 0;

        for (const dealer of dealers) {
            // Convert Dates to ISO strings for DynamoDB
            const item = {
                ...dealer,
                startDate: dealer.startDate ? dealer.startDate.toISOString() : null,
                endDate: dealer.endDate ? dealer.endDate.toISOString() : null,
                contractStartDate: dealer.contractStartDate ? dealer.contractStartDate.toISOString() : null,
                contractEndDate: dealer.contractEndDate ? dealer.contractEndDate.toISOString() : null,
                lastData: dealer.lastData ? dealer.lastData.toISOString() : null,
                createdAt: dealer.createdAt ? dealer.createdAt.toISOString() : null,
                updatedAt: dealer.updatedAt ? dealer.updatedAt.toISOString() : null,
            };

            // Remove null values as DynamoDB doesn't like them sometimes or it's cleaner without
            Object.keys(item).forEach(key => item[key] === null && delete item[key]);

            try {
                await docClient.send(new PutCommand({
                    TableName: "MargazDealers",
                    Item: item
                }));
                process.stdout.write("."); // Progress indicator
                successCount++;
            } catch (err) {
                console.error(`\n❌ Failed to upload dealer ${dealer.title}:`, err.message);
                failCount++;
            }
        }

        console.log("\n\n---------------------------------------------------");
        console.log(`✅ Migration Complete!`);
        console.log(`Uploaded: ${successCount}`);
        console.log(`Failed:   ${failCount}`);
        console.log("---------------------------------------------------");

    } catch (error) {
        console.error("❌ Migration failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

migrate();
