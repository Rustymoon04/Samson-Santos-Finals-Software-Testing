Automated Testing of Retail Web Application

Final Project - Fundamentals of Software Testing**
Created by: SamsonMC & SantosEJ

Project Overview
This repository contains the automated Selenium WebDriver testing scripts for our Final Project. We designed and implemented 20 automated test cases to validate the core functionalities of a retail web application, simulating a real-world QA process. 

To bypass anti-bot security measures (like Cloudflare) and ensure stable test execution, our testing scope is split across two highly reliable, open-source QA practice environments:
Storefront SUT: [SauceDemo](https://www.saucedemo.com/) (Covers Authentication, Product, Cart, and Checkout)
Admin SUT: [Practice Software Testing](https://practicesoftwaretesting.com/) (Covers Admin Dashboard functionalities)

Tools & Technologies Used
Framework: Selenium WebDriver
Language: JavaScript (Node.js)
Browser: Google Chrome

Prerequisites & Installation
To run these automated tests on your local machine, you will need to have [Node.js](https://nodejs.org/) installed. 

1. Download or clone this repository to your local machine.
2. Open the project folder in your terminal (or Visual Studio Code).
3. Install the required Selenium WebDriver dependencies by running the following command:
   ```bash
   npm install selenium-webdriver
