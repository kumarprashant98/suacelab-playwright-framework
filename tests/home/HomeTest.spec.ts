import {expect, test} from "@playwright/test";
import { LoginData } from "../../dataFactory/LoginData";
import { LoginPage } from "../../pageObject/login/LoginPage";
import { log } from "console";
import { HomePage } from "../../pageObject/homePage/HomePage";

let i: number = 1;
test.describe('Home Page test', () =>{

    test.beforeEach(async ({ page }) =>{
        const login = new LoginPage(page);
        
        
        const loginDetails = LoginData.getLoginValidDetails();
        await login.navigateToUrl();
        await login.loginToApplication(loginDetails);
    })
   
    test('Apply filter on the Home page', async({page}) => {
        const homepage = new HomePage(page);
        
        log(`Step ${i}: Verify that the home page is displayed`)
        const homeHeaderText = await homepage.getHomePageHeaderText();
        expect(homeHeaderText).toBe("Swag Labs")

        log(`Step ${++i}: Select a random option from filter`)
        await homepage.selectRandomFilter();
    })
  
})