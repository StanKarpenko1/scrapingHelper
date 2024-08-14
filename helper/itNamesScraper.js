import puppeteer from 'puppeteer';

(async () => {

    //#region variables
    const urlToFile = 'file:///C:/Users/sky/Desktop/Projects/nextGenTests/cypress/reports/html/index.html'

    //#endregion

    // open browser
    const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: false,
    });
    const page = await browser.newPage();
    await page.goto(urlToFile);

    //start the test
    await page.waitForSelector('h4.test--title---4c0rg')

    const itTitles = await page.$$eval('h4.test--title---4c0rg', elements => {
        return elements.map(el => el.textContent)
    });

    // print out results
    console.log(itTitles);

    // shut down the browser
    await new Promise(r => setTimeout(r, 5000));
    await browser.close();

})();
