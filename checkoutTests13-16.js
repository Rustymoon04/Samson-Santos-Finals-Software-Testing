const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

async function runCheckoutTests() {
    let options = new chrome.Options();
    options.excludeSwitches('enable-logging');
    options.addArguments('--log-level=3');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        console.log("Starting Checkout Testing Module...\n");
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        
        await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);
        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
        await driver.findElement(By.className('shopping_cart_link')).click();


        //TC13: Initiate Checkout

        console.log("Running TC13: Initiate Checkout...");
        
        await driver.wait(until.elementLocated(By.id('checkout')), 5000).click();

        let currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes("checkout-step-one"), "Failed to navigate to Checkout Information page.");
        console.log("✅ TC13 Passed: Successfully initiated checkout process.");


        //TC14: Fill Checkout Form

        console.log("\nRunning TC14: Fill Checkout Form...");
        
        await driver.wait(until.elementLocated(By.id('first-name')), 5000).sendKeys('Earl');
        await driver.findElement(By.id('last-name')).sendKeys('QA');
        await driver.findElement(By.id('postal-code')).sendKeys('1600');
        
        await driver.findElement(By.id('continue')).click();

        await driver.wait(until.elementLocated(By.className('summary_info')), 5000);

        let overviewUrl = await driver.getCurrentUrl();
        assert.ok(overviewUrl.includes("checkout-step-two"), "Failed to navigate to Checkout Overview page.");
        console.log("✅ TC14 Passed: Checkout form successfully submitted and navigated to overview.");


        //TC15: Submit Order

        console.log("\nRunning TC15: Submit Order...");
        
        let finishBtn = await driver.wait(until.elementLocated(By.xpath('//*[@id="finish" or @data-test="finish" or text()="Finish"]')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", finishBtn);
        await driver.sleep(500); // Brief pause to let the scroll settle
        await finishBtn.click();

        let completeUrl = await driver.getCurrentUrl();
        assert.ok(completeUrl.includes("checkout-complete"), "Failed to reach the order completion page.");
        console.log("✅ TC15 Passed: Order successfully submitted.");


        //TC16: Validate Order Confirmation

        console.log("\nRunning TC16: Validate Order Confirmation...");
        
        let completeHeader = await driver.wait(until.elementLocated(By.className('complete-header')), 5000);
        let headerText = await completeHeader.getText();

        assert.strictEqual(headerText, "Thank you for your order!");
        console.log("✅ TC16 Passed: Order confirmation message successfully displayed.");

    } catch (error) {
        console.error("❌ A test failed:", error.message);
    } finally {
        await driver.sleep(2000); 
        await driver.quit(); 
        console.log("\nCheckout Module Testing Complete.");
    }
}


runCheckoutTests();