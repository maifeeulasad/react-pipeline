const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        slowMo: 50
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:5173/react-pipeline/');
    await delay(2000);
    await page.screenshot({ path: 'homepage.png' });

    await browser.close();
})();