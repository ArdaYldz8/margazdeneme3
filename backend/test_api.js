
const https = require('https');

const url = 'https://mqpf5j1s9a.execute-api.eu-north-1.amazonaws.com/api/dealers';

console.log(`Testing API: ${url}`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        try {
            const json = JSON.parse(data);
            console.log(`Received ${Array.isArray(json) ? json.length : 'Not an array'} items.`);
            if (Array.isArray(json) && json.length > 0) {
                console.log('First item:', JSON.stringify(json[0], null, 2));
            } else {
                console.log('Body:', data);
            }
        } catch (e) {
            console.log('Response is not JSON:', data);
        }
    });

}).on('error', (err) => {
    console.error('Error:', err.message);
});
