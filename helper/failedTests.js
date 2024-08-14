import puppeteer from 'puppeteer';



(async () => {
  

    const urlToFile = 'file:///C:/Users/sky/Desktop/intTestsReports/Integration%20tests%202024/0808/index.html';
  

    // open browser
    const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: false,
    });
    const page = await browser.newPage();
    await page.goto(urlToFile);

     //start the test
    await page.waitForSelector('button.test--header-btn---mI0Oy');

    const itElements = await page.$$eval('button.test--header-btn---mI0Oy', buttons => {
        return buttons.map(button => {
        const failIconElement = button.querySelector('i.material-icons.md-18.test--icon---2jgH_.test--fail---3u2w0');
        if (failIconElement) {
            const titleElement = button.querySelector('h4.test--title---4c0rg');
            if (titleElement) {
            return titleElement.textContent;
            }
        }
        return null;
        }).filter(title => title !== null); 
    });

    // print out results
    console.log(itElements);

    // shut down the browser
    await new Promise(r => setTimeout(r, 5000));
    await browser.close();
     
})();
