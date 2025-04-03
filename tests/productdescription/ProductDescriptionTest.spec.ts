import { expect, test } from "@playwright/test";
import { log } from "console";
import { LoginData } from "../../dataFactory/LoginData";
import { LoginPage } from "../../pageObject/login/LoginPage";
import { ProductDescriptionPage } from "../../pageObject/productDescriptionPage/ProductDescriptionPage";

let i: number = 1;
let login: LoginPage;
let productdescriptionpage: ProductDescriptionPage;
test.describe('Production description test', () => {

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        productdescriptionpage = new ProductDescriptionPage(page);
        const loginDetails = LoginData.getLoginValidDetails();
        await login.navigateToUrl();
        await login.loginToApplication(loginDetails);
    })

    test('Product Details are displayed', async () => {

        log(`Step ${i} : Click on a Product Title`)
        await productdescriptionpage.clickOnRandomProduct();

        log(`Step ${++i} : Verify product details are displayed`)
        await productdescriptionpage.productDetailsIsVisible();

        log(`Step ${++i} : Click on add to cart button`)
        await productdescriptionpage.clickOnProductAddToCart();

        log(`Step ${++i} : Verify cart badge is added`)
        const cartcount = await productdescriptionpage.cartBadgeCount();
        expect(Number(cartcount)).toBe(1);
    })
})