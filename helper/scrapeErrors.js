import puppeteer from 'puppeteer';

(async () => {
    //#region variables
    const urlToFile = 'file:///C:/Users/sky/Desktop/intTestsReports/Integration%20tests%202024/0725/index.html';
    //#endregion

    // open browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();
    await page.goto(urlToFile);

    //start the test
    await page.waitForSelector('button.test--header-btn---mI0Oy');

    const errorMessages = await page.$$eval('button.test--header-btn---mI0Oy', buttons => {
        return buttons.map(button => {
            const failIconElement = button.querySelector('i.material-icons.md-18.test--icon---2jgH_.test--fail---3u2w0');
            if (failIconElement) {
                const titleElement = button.querySelector('p[class="test--error-message---3Grn0"]');
                if (titleElement) {
                    return titleElement.textContent;
                }
            }
            return null;
        }).filter(message => message !== null); 
    });

    // print out results
    // Format and print the scraped error messages
    errorMessages.forEach(message => {
        console.log('Error: ' +  message);
    });

    // shut down the browser
    await new Promise(r => setTimeout(r, 5000));
    await browser.close();

})();
