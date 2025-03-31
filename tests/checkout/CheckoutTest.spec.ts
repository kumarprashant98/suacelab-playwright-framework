import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pageObject/login/LoginPage";
import { Login } from "../../dataObject/Login";
import { LoginData } from "../../dataFactory/LoginData";
import { log } from "console";
import { HomePage } from "../../pageObject/homePage/HomePage";
import { CartPage } from "../../pageObject/cartPage/CartPage";
import { CheckOutPage } from "../../pageObject/checkOutPage/CheckOutPage";
import { CheckoutData } from "../../dataFactory/CheckoutData";
import { CheckOutOverview } from "../../pageObject/checkoutOverviewPage/CheckOutOverviewPage";

let i: number = 1;

test.describe('Checkout item test', () =>{

    test.beforeEach(async ({ page }) =>{
        const login = new LoginPage(page);
        
        const loginDetails = LoginData.getLoginValidDetails();
        await login.navigateToUrl();
        await login.loginToApplication(loginDetails);
    })

    test('Verify that an item is successfully added to the cart and the checkout process is completed. ', async({page}) => {
        
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckOutPage(page);
        const checkoutOverviewPage = new CheckOutOverview(page);
        const checkoutDetails = CheckoutData.getCheckoutDetails();

        log(`Step ${i}: Add item To cart`)
        await homePage.addRandomItemToCart();

        log(`Step ${++i}: Click on the cart icon`)
        await homePage.clickOnAddToCartIcon();

        log(`Step ${++i}: Assert added item displayed on cart page`)
        const item = homePage.getSelectedItem();
        const cartitem = await cartPage.getCartItemText(item);
        expect(item).toBe(cartitem);

        log(`Step ${++i}: Click on the Checkout button`)
        await cartPage.clickOnCheckoutButton();

        log(`Step ${++i}: Assert Checkout Screen is displayed`)
        const checkoutHeader = await checkoutPage.getCheckoutPageHeaderText();
        expect(checkoutHeader).toBe("Checkout: Your Information");

        log(`Step ${++i}: Enter checkout Details`)
        await checkoutPage.checkoutInformation(checkoutDetails.firstname, checkoutDetails.lastname, checkoutDetails.postalcode);

        log(`Step ${++i}: Click on the Continue Button`)
        await checkoutPage.clickOnCheckoutContinueButton();
       
        log(`Step ${++i}: Click on the Finish Button`)
        await checkoutOverviewPage.clickOnFinishButton();

        log(`Step ${++i}: Verify Success Message is Displayed`)
        const successmessage = await checkoutOverviewPage.getSuccessMessage();
        expect(successmessage).toBe("Thank you for your order!");
    })
})