const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); 

async function runSetupTest() {

    let options = new chrome.Options();
    options.excludeSwitches('enable-logging'); 
    options.addArguments('--log-level=3');    

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options) 
        .build();

    try {
        console.log("Opening browser...");

        await driver.get('https://www.saucedemo.com/');

        await driver.wait(until.elementLocated(By.id('user-name')), 10000);

        let title = await driver.getTitle();
        console.log("Success! Page loaded with title:", title);

    } catch (error) {
        console.error("An error occurred:", error);
    } finally {

        console.log("Test finished. Browser left open for inspection.");
    }
}


runSetupTest();