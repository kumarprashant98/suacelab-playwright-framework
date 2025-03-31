import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckOutPage extends BasePage{
    constructor(page : Page){
        super(page)
    }

    //Locators
    checkOutPageHeaderText = "//div[@id = 'header_container']/child::div[2]//span"
    checkOutFirstName = "#first-name"
    checkOutLastName = "#last-name"
    checkOutPostalCode = "#postal-code"
    checkOutContinueButton = "#continue"

    getCheckoutPageHeaderText = async () => await this.getText(this.checkOutPageHeaderText)

    checkoutInformation = async (firstname : string, lastname : string, postalcode : string) =>{
        await this.enterText(this.checkOutFirstName, firstname)
        await this.enterText(this.checkOutLastName, lastname)
        await this.enterText(this.checkOutPostalCode, postalcode)
         
    }

    clickOnCheckoutContinueButton = async () => await this.clickOn(this.checkOutContinueButton)
}