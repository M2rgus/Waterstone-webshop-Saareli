const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Homepage = require('../pageobjects/homePage'); // Ensure the path is correct
const Cartpage = require('../pageobjects/cartPage'); // Ensure the path is correct
require('chromedriver');

const TIMEOUT = 5000;

describe('Add products to shopping cart', () => {
    let driver;
    let homepage;
    let cartpage;

    beforeAll(async () => {
        try {
            driver = await new Builder().forBrowser('chrome').build();
            driver.manage().window().maximize();
            driver.manage().setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });

            homepage = new Homepage(driver);
            await homepage.openUrl();
            await homepage.agreeWithCookies();
        } catch (error) {
            console.error("Error in beforeAll: ", error);
        }
    });

    afterAll(async () => {
        try {
            if (driver) {
                await driver.quit();
            }
        } catch (error) {
            console.error("Error in afterAll: ", error);
        }
    });

    test('Test Open Web Page', async () => {
        await homepage.verifyPageTitleContains("Waterstones");
    });

    test('Test Search for any product keyword', async () => {
        await homepage.searchForText("dune");
        await homepage.verifySearchResultCount(1);
    });

    test('Test adding first item to shopping cart', async () => {
        await homepage.hoverOverProduct(1);
        await homepage.verifyProductCanBeAddedToBasket(1);
        await homepage.addProductToBasket(1);
        await homepage.verifyProductIsAddedToBasket(1);
    });

    test('Test adding second item to shopping cart', async () => {
        await homepage.hoverOverProduct(2);
        await homepage.addProductToBasket(2);
        await homepage.verifyProductIsAddedToBasket(2);
    });

    test('Test shopping cart has two correct items', async () => {
        cartpage = await homepage.goToShoppingCart();
        await cartpage.verifyCartSumIsCorrect();
    });

    test('Test remove first product from the cart', async () => {
        await cartpage.removeFirstItemFromCart();
        await cartpage.verifyCartHasItems(1);
        await cartpage.verifyCartSumIsCorrect();
    });
});
