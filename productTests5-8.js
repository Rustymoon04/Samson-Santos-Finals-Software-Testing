const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

async function runProductTests() {
    let options = new chrome.Options();
    options.excludeSwitches('enable-logging');
    options.addArguments('--log-level=3');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        console.log("Starting Product Testing Module...\n");
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();


        //TC5: View Product List

        console.log("Running TC5: View Product List...");
        
        let inventoryContainer = await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);
        
        let products = await inventoryContainer.findElements(By.className('inventory_item'));
        assert.ok(products.length > 0, "Product list is empty or not visible!");
        console.log("✅ TC5 Passed: Product inventory list is successfully displayed.");


        //TC6: View Product Details

        console.log("\nRunning TC6: View Product Details...");
        
        let backpackLink = await driver.findElement(By.xpath("//div[text()='Sauce Labs Backpack']"));
        await backpackLink.click();

        let detailsContainer = await driver.wait(until.elementLocated(By.className('inventory_details_container')), 5000);
        
        let detailName = await detailsContainer.findElement(By.className('inventory_details_name')).getText();
        assert.strictEqual(detailName, "Sauce Labs Backpack");
        console.log("✅ TC6 Passed: Successfully navigated to specific product details.");


        //TC8: Return to Product List

        console.log("\nRunning TC8: Return to Product List...");
        
        await driver.findElement(By.id('back-to-products')).click();

        await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);
        let returnUrl = await driver.getCurrentUrl();
        assert.strictEqual(returnUrl, "https://www.saucedemo.com/inventory.html");
        console.log("✅ TC8 Passed: Successfully returned to the main product list.");


        //TC7: Sort/Filter Products

        console.log("\nRunning TC7: Sort/Filter Products (Price Low to High)...");
        
        let sortDropdown = await driver.findElement(By.className('product_sort_container'));
        await sortDropdown.click();

        await sortDropdown.findElement(By.css("option[value='lohi']")).click();

        await driver.sleep(1000);

        let firstPrice = await driver.findElement(By.className('inventory_item_price')).getText();
        assert.strictEqual(firstPrice, "$7.99");
        console.log("✅ TC7 Passed: Products successfully sorted by Price (low to high).");

    } catch (error) {
        console.error("❌ A test failed:", error.message);
    } finally {
        await driver.sleep(2000); 
        await driver.quit(); 
        console.log("\nProduct Module Testing Complete.");
    }
}


runProductTests();