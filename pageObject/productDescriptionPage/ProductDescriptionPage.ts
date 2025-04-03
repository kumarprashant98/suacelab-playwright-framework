import { Page } from "@playwright/test";
import { PlayWrightHelper } from "../../utilities/PlayWrightHelper";
import { BasePage } from "../BasePage";

//Locators
const inventoryList = "div[data-test = 'inventory-item-name']"
const productName = "inventory-item-name"
const productPrice = "inventory-item-price"
const productDescription = "inventory-item-desc"
const productAddToCart = "#add-to-cart"
const cartBadge = ".shopping_cart_badge"
export class ProductDescriptionPage extends BasePage {
    randomproduct: string = "";
    playwrighthelper = new PlayWrightHelper();
    constructor(page: Page) {
        super(page);
    }

    clickOnRandomProduct = async () => {
        const product = await this.getListText(inventoryList);
        this.randomproduct = this.playwrighthelper.getRandomStringFromList(product);
        const productXpath = `//div[text() = '${this.randomproduct}']`
        await this.clickOn(productXpath);
    }

    productDetailsIsVisible = async () => {
        await this.elementIsVisble(productName);
        await this.elementIsVisble(productPrice);
        await this.elementIsVisble(productDescription);
    }

    clickOnProductAddToCart = async () => {
        await this.clickOn(productAddToCart);
    }

    cartBadgeCount = async () => {
        return await this.getText(cartBadge);
    }
}

