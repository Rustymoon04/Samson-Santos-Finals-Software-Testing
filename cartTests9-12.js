const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

async function runCartTests() {
    let options = new chrome.Options();
    options.excludeSwitches('enable-logging');
    options.addArguments('--log-level=3');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        console.log("Starting Cart Testing Module...\n");
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);


        //TC9: Add to Cart

        console.log("Running TC9: Add to Cart...");
        
        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
        await driver.findElement(By.className('shopping_cart_link')).click();

        let cartContents = await driver.wait(until.elementLocated(By.className('cart_list')), 5000);
        let cartItemName = await cartContents.findElement(By.className('inventory_item_name')).getText();
        
        assert.strictEqual(cartItemName, "Sauce Labs Backpack");
        console.log("✅ TC9 Passed: Product successfully added to the cart.");


        //TC10: Update Quantity (Adapted)

        console.log("\nRunning TC10: Update Quantity (Badge Test)...");
        
        await driver.findElement(By.id('continue-shopping')).click();
        await driver.wait(until.elementLocated(By.id('add-to-cart-sauce-labs-bike-light')), 5000).click();

        let cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        assert.strictEqual(cartBadge, "2");
        console.log("✅ TC10 Passed: Cart badge correctly updated to 2 items.");


        //TC11: Remove Item

        console.log("\nRunning TC11: Remove Item...");
        
        await driver.findElement(By.className('shopping_cart_link')).click();
        await driver.wait(until.elementLocated(By.id('remove-sauce-labs-backpack')), 5000).click();

        let updatedBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        assert.strictEqual(updatedBadge, "1");
        console.log("✅ TC11 Passed: Item removed and cart badge successfully updated.");


        //TC12: Validate Total Price

        console.log("\nRunning TC12: Validate Total Price...");
        
        await driver.findElement(By.id('checkout')).click();
        
        await driver.wait(until.elementLocated(By.id('first-name')), 5000).sendKeys('Test');
        await driver.findElement(By.id('last-name')).sendKeys('User');
        await driver.findElement(By.id('postal-code')).sendKeys('12345');
        await driver.findElement(By.id('continue')).click();

        await driver.wait(until.elementLocated(By.className('summary_info')), 5000);
        
        let itemPriceText = await driver.findElement(By.className('inventory_item_price')).getText();
        let itemPriceValue = parseFloat(itemPriceText.replace(/[^0-9.]/g, '')); 

        let subtotalText = await driver.findElement(By.className('summary_subtotal_label')).getText();
        let subtotalValue = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));

        assert.strictEqual(itemPriceValue, subtotalValue);
        console.log("✅ TC12 Passed: System successfully calculated the correct Item Total.");

    } catch (error) {
        console.error("❌ A test failed:", error.message);
    } finally {
        await driver.sleep(2000); 
        await driver.quit(); 
        console.log("\nCart Module Testing Complete.");
    }
}


runCartTests();