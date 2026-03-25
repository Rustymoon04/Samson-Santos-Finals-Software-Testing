const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

async function runAuthTests() {
    let options = new chrome.Options();
    options.excludeSwitches('enable-logging');
    options.addArguments('--log-level=3');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        console.log("Starting Authentication Testing Module...\n");
        await driver.get('https://www.saucedemo.com/');


        //TC3: Empty Fields Test

        console.log("Running TC3: Empty Fields...");

        await driver.findElement(By.id('login-button')).click();
        
        let emptyError = await driver.wait(until.elementLocated(By.css("h3[data-test='error']")), 5000);
        let emptyErrorText = await emptyError.getText();
        
        assert.strictEqual(emptyErrorText, "Epic sadface: Username is required");
        console.log("✅ TC3 Passed: Empty fields correctly blocked.");
        
        await driver.navigate().refresh(); 


        //TC2: Invalid Login Test

        console.log("\nRunning TC2: Invalid Login...");

        await driver.findElement(By.id('user-name')).sendKeys('wrongadmin@test.com');
        await driver.findElement(By.id('password')).sendKeys('badpassword123');
        await driver.findElement(By.id('login-button')).click();

        let invalidError = await driver.wait(until.elementLocated(By.css("h3[data-test='error']")), 5000);
        let invalidErrorText = await invalidError.getText();
        
        assert.strictEqual(invalidErrorText, "Epic sadface: Username and password do not match any user in this service");
        console.log("✅ TC2 Passed: Invalid login correctly blocked.");

        await driver.navigate().refresh();


        //TC1: Valid Login Test

        console.log("\nRunning TC1: Valid Login...");

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);
        
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, "https://www.saucedemo.com/inventory.html");
        console.log("✅ TC1 Passed: User successfully logged in.");


        //TC4: Logout Test

        console.log("\nRunning TC4: Logout...");

        await driver.findElement(By.id('react-burger-menu-btn')).click();
        
        let logoutBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.id('logout_sidebar_link'))), 5000);
        await logoutBtn.click();

        await driver.wait(until.elementLocated(By.id('login-button')), 5000);
        console.log("✅ TC4 Passed: User successfully logged out.");

    } catch (error) {
        console.error("❌ A test failed:", error.message);
    } finally {
        await driver.sleep(2000);
        await driver.quit();
        console.log("\nAuthentication Module Testing Complete.");
    }
}


runAuthTests();