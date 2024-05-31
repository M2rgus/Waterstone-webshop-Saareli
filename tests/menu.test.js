const { Builder } = require("selenium-webdriver");
let Homepage = require("./pageobjects/homePage");
require("chromedriver");

const TIMEOUT = 5000;

describe("Filter menu", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });

    Homepage = new Homepage(driver);
    await Homepage.openUrl();
    await Homepage.agreeWithCookies();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("The page opens", async () => {
    await Homepage.verifyPageTitleContains("Waterstones");
  });
});