
const { CloudWatchLogsClient, GetLogEventsCommand, DescribeLogStreamsCommand } = require("@aws-sdk/client-cloudwatch-logs");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const client = new CloudWatchLogsClient({ region: process.env.AWS_REGION || "eu-north-1" });
const LOG_GROUP_NAME = "/aws/lambda/MargazIngest";

async function getLogs() {
    try {
        // Get the latest log stream
        const streams = await client.send(new DescribeLogStreamsCommand({
            logGroupName: LOG_GROUP_NAME,
            orderBy: "LastEventTime",
            descending: true,
            limit: 1
        }));

        if (!streams.logStreams || streams.logStreams.length === 0) {
            console.log("No log streams found.");
            return;
        }

        const streamName = streams.logStreams[0].logStreamName;
        console.log(`Reading logs from stream: ${streamName}`);

        const logs = await client.send(new GetLogEventsCommand({
            logGroupName: LOG_GROUP_NAME,
            logStreamName: streamName,
            limit: 20
        }));

        logs.events.forEach(event => {
            console.log(`[${new Date(event.timestamp).toISOString()}] ${event.message}`);
        });

    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}

getLogs();
