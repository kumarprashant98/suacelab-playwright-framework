import { Page } from "@playwright/test"
import { BasePage } from "../BasePage"

//Locators
const cartItemText = "//a[@id = 'item_1_title_link']//div"
const checkoutButton = "#checkout"



export class CartPage extends BasePage{
    constructor(page : Page){
        super(page)
    }
    

getCartItemText = async (cartItemName: string) => {
     const cartItemLocator = `//div[text() = '${cartItemName}']`;
     return await this.getText(cartItemLocator);
} 

clickOnCheckoutButton = async () => await this.clickOn(checkoutButton);

}