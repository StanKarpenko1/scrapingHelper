import puppeteer from 'puppeteer';

(async () => {
  //#region variables
  const urlToFile = 'file:///C:/Users/sky/Desktop/intTestsReports/Integration%20tests%202024/0725/index.html';
  let failReportElements = [];
  //#endregion

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
  }

  // Open browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto(urlToFile);

  // Start the test
  try {
    await page.waitForSelector('button.test--header-btn---mI0Oy');

    // Scrape names of failed tests
    failReportElements = await page.$$eval('button.test--header-btn---mI0Oy', buttons => {
      return buttons.map(button => {
        const failIconElement = button.querySelector('i.material-icons.md-18.test--icon---2jgH_.test--fail---3u2w0');
        if (failIconElement) {
          const titleElement = button.querySelector('h4.test--title---4c0rg');
          const errorElement = button.querySelector('p[class="test--error-message---3Grn0"]');

          if (titleElement && errorElement) {
            return 'Title: ' + titleElement.textContent + ' Error: ' + errorElement.textContent;
          }
        }
        return null;
      }).filter(report => report !== null);
    });

    // Format and print the scraped error messages
    failReportElements.forEach(message => {
      const formattedMessage = escapeHtml(message);
      console.log(formattedMessage);
    });

  } catch (error) {
    console.log(error);
  }

  // Shut down the browser
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();

})();
