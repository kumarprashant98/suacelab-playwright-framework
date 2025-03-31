import test, { expect } from "@playwright/test";
import { LoginData } from "../../dataFactory/LoginData";
import { LoginPage } from "../../pageObject/login/LoginPage";
import { log } from "console";
import { Login } from "../../dataObject/Login";
import { HomePage } from "../../pageObject/homePage/HomePage";
let i: number = 1;

test.describe('Login page test', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToUrl();
    })

    test('Verify that user is logged in successfully ', async({ page }) =>{

        //Page
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        //Data
        const loginDetails = LoginData.getLoginValidDetails();

        log(`Step ${i}: Login with valid credentials`)
        await loginPage.enterUserName(loginDetails.username);
        await loginPage.enterPassword(loginDetails.password);
        await loginPage.clickOnLoginButton();
        
        log(`Step ${++i}: Handle the displayed dialog box`)
        const dialogLocator = page.locator('text=OK');
        await dialogLocator.click();

        log(`Step ${++i}: Verify that the Home Page is displayed`);
        const headertext = await homePage.getHomePageHeaderText();
        expect(headertext).toBe("Swag Labs")
    })

    test('Verify that validation message is displayed for invalid user', async({page}) =>{

        //Page
        const loginPage = new LoginPage(page);

        //Data
        const loginDetails = LoginData.getLoginWithInvalidDetails();

        log(`Step ${i}: Login with invalid credentials`)
        await loginPage.enterUserName(loginDetails.username);
        await loginPage.enterPassword(loginDetails.password);
        await loginPage.clickOnLoginButton();

        log(`Step ${++i}: Validation message displayed`)
        await loginPage.validationMessageDisplayed();
    })


})