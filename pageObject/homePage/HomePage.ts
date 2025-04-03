import { Page } from "@playwright/test";
import { PlayWrightHelper } from "../../utilities/PlayWrightHelper";
import { BasePage } from "../BasePage";

//Locators
const homeHeaderText = ".app_logo"
const menuButton = "//button[text() = 'Open Menu']"
const aboutSideBar = "#about_sidebar_link"
const dashboardTab = "//button[text() = 'Go to Dashboard']"
const signInText = "//h3[text() = 'Sign in']"
const inventoryList = "div[data-test = 'inventory-item-name']"
const addToCartIcon = "#shopping_cart_container"
const filterDropdown = "//select[@class = 'product_sort_container']"
const listFilterDropdown = "//select[@class = 'product_sort_container']//option"
const twitterLink = "//a[text() = 'Twitter']"
const facebookLink = "//a[text() = 'Facebook']"
const linkedinLink = "//a[text() = 'LinkedIn']"


export class HomePage extends BasePage {
    randomitem: string = " ";
    constructor(page: Page) {
        super(page);
    }

    playwrighthelper = new PlayWrightHelper();

    getHomePageHeaderText = async () => await this.getText(homeHeaderText);

    clickOnTheMenuButton = async () => await this.clickOn(menuButton);

    clickOnTheAboutSideBar = async () => await this.clickOn(aboutSideBar);

    clickOnTheDashboardTab = async () => await this.clickOn(dashboardTab);

    getSignInText = async () => await this.getText(signInText);

    addRandomItemToCart = async () => {
        const items = await this.getListText(inventoryList)
        this.randomitem = this.playwrighthelper.getRandomStringFromList(items);
        const itemXpath = `//div[text()='${this.randomitem}']/parent::a/parent::div/following-sibling::div//button`;
        await this.clickOn(itemXpath)

    }

    clickOnAddToCartIcon = async () => await this.clickOn(addToCartIcon);

    getSelectedItem = () => this.randomitem;

    selectRandomFilter = async () => {
        const filteroptions = await this.getListText(listFilterDropdown)
        const randomfilteritem = this.playwrighthelper.getRandomStringFromList(filteroptions);
        console.log("Selected Filter:", randomfilteritem);

        //Select option use as it is a dropdown
        await this.selectDropDownValue(filterDropdown, randomfilteritem);

    }

    socialMediaLogoIsVisible = async () => {
        await this.elementIsVisble(twitterLink);
        await this.elementIsVisble(facebookLink);
        await this.elementIsVisble(linkedinLink)
    }

    clickOnLinkedinLink = async () => await this.clickOn(linkedinLink);

    getLinkedInNewTab = async (page: Page) => {
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'), //Capture new tab
            this.clickOnLinkedinLink()
        ])
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }
}




