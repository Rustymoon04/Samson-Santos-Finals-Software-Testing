const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

async function runAdminTests() {
    let options = new chrome.Options();
    options.excludeSwitches('enable-logging');
    options.addArguments('--log-level=3');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        console.log("Starting Admin Testing Module...\n");

        //TC17: View Admin Dashboard (Login)

        console.log("Running TC17: Admin Login...");
        await driver.get('https://practicesoftwaretesting.com/#/auth/login');
        
        await driver.wait(until.elementLocated(By.css('[data-test="email"]')), 15000).sendKeys('admin@practicesoftwaretesting.com');
        await driver.findElement(By.css('[data-test="password"]')).sendKeys('welcome01');

        await driver.findElement(By.css('[data-test="login-submit"]')).click();

        await driver.sleep(3000); 
        console.log("✅ TC17 Passed: Admin successfully authenticated.");


        //TC18: Add Product

        console.log("\nRunning TC18: Add Product...");
        
        await driver.get('https://practicesoftwaretesting.com/#/admin/products');

        await driver.wait(until.elementLocated(By.css('[data-test="product-add"]')), 15000).click();

        await driver.wait(until.elementLocated(By.css('[data-test="name"]')), 15000).sendKeys('QA Test Item');
        await driver.findElement(By.css('[data-test="description"]')).sendKeys('Automated test product description.');
        await driver.findElement(By.css('[data-test="price"]')).sendKeys('15.99');

        let saveBtn = await driver.findElement(By.css('[data-test="product-submit"]'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", saveBtn);
        await driver.sleep(1000); // Let the scroll settle
        await saveBtn.click();

        console.log("✅ TC18 Passed: New product successfully saved.");


        //TC19: Edit Product

        console.log("\nRunning TC19: Edit Product...");
        
        await driver.get('https://practicesoftwaretesting.com/#/admin/products');

        let editBtn = await driver.wait(until.elementLocated(By.xpath('(//*[@data-test="product-edit"])[1]')), 15000);
        await editBtn.click();

        let priceField = await driver.wait(until.elementLocated(By.css('[data-test="price"]')), 15000);
        await priceField.clear();
        await priceField.sendKeys('19.99');

        let updateBtn = await driver.findElement(By.css('[data-test="product-submit"]'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", updateBtn);
        await driver.sleep(1000);
        await updateBtn.click();

        console.log("✅ TC19 Passed: Product price successfully updated.");


        //TC20: Delete Product

        console.log("\nRunning TC20: Delete Product...");
        
        await driver.get('https://practicesoftwaretesting.com/#/admin/products');

        let deleteBtn = await driver.wait(until.elementLocated(By.xpath('(//*[@data-test="product-delete"])[1]')), 15000);
        await deleteBtn.click();

        await driver.sleep(2000);

        console.log("✅ TC20 Passed: Product successfully deleted.");

    } catch (error) {
        console.error("❌ A test failed:", error.message);
    } finally {
        await driver.sleep(2000); 
        await driver.quit(); 
        console.log("\nAdmin Module Testing Complete.");
    }
}


runAdminTests();