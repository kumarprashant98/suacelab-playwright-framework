import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { Login } from "../../dataObject/Login";

//Locator
const usernameTextBox = '#user-name';
const passwordTextBox = '#password';
const loginButton = '#login-button';
const invalidUserText = 'h3';

export class LoginPage extends BasePage{
    constructor(page: Page){
        super(page);
    }

    enterUserName = async(UserName:string) => await this.enterText(usernameTextBox, UserName);

    enterPassword = async(password:string) => await this.enterText(passwordTextBox, password);
    
    clickOnLoginButton = async () => await this.clickOn(loginButton)
    
    loginToApplication = async (login:Login) => {
        await this.enterUserName(login.username);
        await this.enterPassword(login.password);
        await this.clickOnLoginButton();

    }

    validationMessageDisplayed = async () => await this.elementIsVisble(invalidUserText);

}