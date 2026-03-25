const { Builder, By, until } = require('selenium-webdriver');
const path = require('path'); // Node tool to handle file paths

async function runLocalTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Get the exact path to your local HTML file
        const filePath = "file://" + path.resolve(__dirname, 'local_site', 'index.html');
        console.log("Opening local file:", filePath);
        
        // 2. Open the local HTML file
        await driver.get(filePath);

        // 3. Pause for 2 seconds just so you can see the page open
        await driver.sleep(2000);

        // 4. Find the username box by its ID and type something
        console.log("Typing username...");
        await driver.findElement(By.id('username')).sendKeys('EarlJoshQA');

        // 5. Find the password box by its ID and type something
        console.log("Typing password...");
        await driver.findElement(By.id('password')).sendKeys('MySecretPass123');

        // 6. Pause for 2 seconds so you can see the text get typed
        await driver.sleep(2000);

        // 7. Click the login button
        console.log("Clicking the login button...");
        await driver.findElement(By.id('loginBtn')).click();

        console.log("Local test successful!");

    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // 8. Close the browser
        await driver.sleep(1000); // Brief pause before closing
        await driver.quit();
        console.log("Browser closed.");
    }
}

// Execute the test
runLocalTest();