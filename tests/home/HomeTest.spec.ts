import { expect, test } from "@playwright/test";
import { log } from "console";
import { LoginData } from "../../dataFactory/LoginData";
import { HomePage } from "../../pageObject/homePage/HomePage";
import { LoginPage } from "../../pageObject/login/LoginPage";

let i: number = 1;
let homepage: HomePage;
let login: LoginPage;
test.describe('Home Page test', () => {

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        homepage = new HomePage(page);

        const loginDetails = LoginData.getLoginValidDetails();
        await login.navigateToUrl();
        await login.loginToApplication(loginDetails);
    })

    test('Apply filter on the Home page', async ({ page }) => {


        log(`Step ${i}: Verify that the home page is displayed`)
        const homeHeaderText = await homepage.getHomePageHeaderText();
        expect(homeHeaderText).toBe("Swag Labs")

        log(`Step ${++i}: Select a random option from filter`)
        await homepage.selectRandomFilter();
    })

    test('Click on the Social Media Links', async ({ page }) => {

        log(`Scroll to the bottom of the home page`)
        await homepage.scrollToBottom();

        log('Verify social media icons visible')
        await homepage.socialMediaLogoIsVisible();

        log('Click on the linkedln link');
        const newPage = await homepage.getLinkedInNewTab(page);
        const newPageURL = newPage.url();

        log('Assert linkedin website is displayed')
        expect(newPageURL).toContain("linkedin.com");
    })

    test('Redirect to new page and perform action', async ({ page }) => {
        log('Verify that the home page is displayed')
        const homeHeaderText = await homepage.getHomePageHeaderText();
        expect(homeHeaderText).toBe("Swag Labs")

        log('Click on the Menu button')
        await homepage.clickOnTheMenuButton();

        log('Click on the About SideBar')
        await homepage.clickOnTheAboutSideBar();

        log('Click on the Dashboard tab')
        await homepage.clickOnTheDashboardTab();

        log('Assert Sign In Screen is displayed')
        const signInText = await homepage.getSignInText();
        expect(signInText).toBe("Sign in");


    })
})