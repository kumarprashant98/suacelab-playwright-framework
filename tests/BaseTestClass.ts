import { Page } from "@playwright/test";
import { BasePage } from "../pageObject/BasePage";


export class BaseTest {

    constructor(public page: Page) {
    }

    async navigateToBaseURL() {
        const base = new BasePage(this.page);
        await base.navigateToUrl();
        
    }
}
