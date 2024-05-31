const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
let Homepage = require('../pageobjects/homePage');
let Cartpage = require('../pageobjects/cartPage');
require('chromedriver')

const TIMEOUT = 5000;

describe('Add products to shopping cart', () => {

    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
        driver.manage().setTimeouts({implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT});

        Homepage = new Homepage(driver);
        await Homepage.openUrl();
        await Homepage.agreeWithCookies();
    });
      
    afterAll(async() => {
        await driver.quit();
    });
    
    test('Test Open Web Page', async () => {
        await Homepage.verifyPageTitleContains("Waterstones");
    })

    test('Test Search for any product keyword', async () => {
        await Homepage.searchForText("dune");
        await Homepage.verifySearchResultCount(1);
    })

    test('Test adding first item to shopping cart', async () => {
        await Homepage.hoverOverProduct(1);
        await Homepage.verifyProductCanBeAddedToBasket(1);
        await Homepage.addProductToBasket(1);
        await Homepage.verifyProductIsAddedToBasket(1);
    })

    test('Test adding second item to shopping cart', async () => {
        await Homepage.hoverOverProduct(2);
        await Homepage.addProductToBasket(2);
        await Homepage.verifyProductIsAddedToBasket(2);      
    })

    test('Test shopping cart has two correct items', async () => {
        Cartpage = await Homepage.goToShoppingCart();
        await Cartpage.verifyCartSumIsCorrect();
        //Verify that cart has correct items added.
    })

    test('Test remove first product from the cart', async () => {
        await Cartpage.removeFirstItemFromCart();
        await Cartpage.verifyCartHasItems(1);
        await Cartpage.verifyCartSumIsCorrect();
        //Verify that cart has correct items added.
    })
    
})