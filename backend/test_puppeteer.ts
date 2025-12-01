import puppeteer from 'puppeteer';

async function testLaunch() {
    console.log('Attempting to launch browser...');
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized']
        });
        console.log('Browser launched successfully!');

        const page = await browser.newPage();
        await page.goto('https://google.com');
        console.log('Navigated to Google.');

        console.log('Waiting 10 seconds...');
        await new Promise(r => setTimeout(r, 10000));

        await browser.close();
        console.log('Browser closed.');
    } catch (error) {
        console.error('Launch failed:', error);
    }
}

testLaunch();
