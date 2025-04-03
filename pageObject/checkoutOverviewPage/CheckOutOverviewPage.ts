import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckOutOverview extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    finishButton = "#finish"
    successMessage = "//div[@id = 'checkout_complete_container']//h2"

    clickOnFinishButton = async () => await this.clickOn(this.finishButton);

    getSuccessMessage = async () => await this.getText(this.successMessage);
}