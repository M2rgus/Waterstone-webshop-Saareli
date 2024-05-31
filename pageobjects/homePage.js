// homePage.js (ensure this is the correct filename)
const Page = require('./basePage'); // Adjust the path if necessary
const Cartpage = require('../pageobjects/cartPage'); // Ensure this path is correct
const { By } = require('selenium-webdriver');

const baseUrl = "https://www.waterstones.com/";
const TIMEOUT = 5000;

const cookieButton = By.css("#onetrust-button-group > #onetrust-accept-btn-handler");
const pageTitleElement = By.css("#main-logos > div > a.logo");
const searchField = By.className("input input-search");
const searchButton = By.className("input-search-button icon");
const searchResultKeyword = By.className("search-result-tab-all");
const searchResultImg = By.css("div.book-thumb > div > a > img");
const searchResultBasket = By.className("button-buy button button-teal button-small");
const cartButton = By.css("a.basket > strong");

module.exports = class Homepage extends Page {
    constructor(driver) {
        super(driver);
    }

    async openUrl() {
        await super.openUrl(baseUrl);
    }

    async agreeWithCookies() {
        await super.sleep(TIMEOUT);
        await super.findAndClick(cookieButton);
    }

    async verifyPageTitleContains(text) {
        let pageTitle = await super.getElementText(pageTitleElement);
        expect(pageTitle).toBe(text);
    }

    async searchForText(text) {
        await super.sendText(searchField, text);
        await super.findAndClick(searchButton);
    }

    async verifySearchResultCount(number) {
        const searchCount = await super.getElementText(searchResultKeyword);
        const searchCountNum = searchCount.replaceAll(/\D+/g, "");
        expect(parseInt(searchCountNum)).toBeGreaterThan(number);
    }

    async hoverOverProduct(elementNum) {
        const imageElements = await super.getElements(searchResultImg);
        await super.hoverOverElement(imageElements[elementNum - 1]);
    }

    async verifyProductCanBeAddedToBasket(elementNum) {
        let basketElem = await super.getElements(searchResultBasket);
        expect((await basketElem[elementNum - 1].getText()).toLowerCase()).toContain("Add to Basket".toLowerCase());
    }

    async addProductToBasket(elementNum) {
        let basketElem = await super.getElements(searchResultBasket);
        await super.click(basketElem[elementNum - 1]);
    }

    async verifyProductIsAddedToBasket(number) {
        await super.waitUntilElementText(cartButton, number.toString());
    }

    async goToShoppingCart() {
        await super.waitUntilElementVisible(cartButton);
        await super.findAndClick(cartButton);
        return new Cartpage(super.getDriver());
    }
};
