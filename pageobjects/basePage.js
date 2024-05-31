// basePage.js (ensure this is the correct filename)
const { until } = require('selenium-webdriver');

const TIMEOUT = 5000;

module.exports = class Page {
    constructor(driver) {
        this.driver = driver;
    }

    getTimeout() {
        return TIMEOUT;
    }

    getDriver() {
        return this.driver;
    }

    async openUrl(url) {
        return await this.driver.get(url);
    }

    async sleep(milliSeconds) {
        return await this.driver.sleep(milliSeconds);
    }

    async findAndClick(locator) {
        return await this.driver.findElement(locator).click();
    }

    async click(element) {
        return await element.click();
    }

    async getElement(locator) {
        return await this.driver.findElement(locator);
    }

    async getElements(locator) {
        return await this.driver.findElements(locator);
    }

    async getElementText(locator) {
        return await this.driver.findElement(locator).getText();
    }

    async sendText(locator, text) {
        let element = await this.driver.findElement(locator);
        element.click();
        return element.sendKeys(text);
    }

    async hoverOverElement(element) {
        const actions = this.driver.actions({ async: true });
        return await actions.move({ origin: element }).perform();
    }

    async waitUntilElementText(locator, text) {
        let element = await this.driver.findElement(locator);
        return this.driver.wait(until.elementTextIs(element, text), TIMEOUT);
    }

    waitUntilElementVisible(locator) {
        this.driver.wait(until.elementLocated(locator), TIMEOUT);
        return this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)), TIMEOUT);
    }
};
