import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { PlayWrightHelper } from "../../utilities/PlayWrightHelper";

//Locators
const homeHeaderText = ".app_logo"
const inventoryList = "div[data-test = 'inventory-item-name']"
const addToCartIcon = "#shopping_cart_container"
const filterDropdown = "//select[@class = 'product_sort_container']"
const listFilterDropdown = "//select[@class = 'product_sort_container']//option"



export class HomePage extends BasePage{
    randomitem : string = " ";
    constructor(page : Page){
        super(page);
    }

    playwrighthelper = new PlayWrightHelper();

    getHomePageHeaderText = async () => await this.getText(homeHeaderText);
    
    addRandomItemToCart = async () =>{
        const items = await this.getListText(inventoryList)
        this.randomitem = this.playwrighthelper.getRandomStringFromList(items);
        const itemXpath = `//div[text()='${this.randomitem}']/parent::a/parent::div/following-sibling::div//button`;
        await this.clickOn(itemXpath)
        
        }

    clickOnAddToCartIcon = async () => await this.clickOn(addToCartIcon);
    
    getSelectedItem = () =>  this.randomitem;
    
    selectRandomFilter = async () =>{
        const filteroptions = await this.getListText(listFilterDropdown)
        const randomfilteritem = this.playwrighthelper.getRandomStringFromList(filteroptions);
        console.log("Selected Filter:", randomfilteritem);

        //Select option use as it is a dropdown
        await this.selectDropDownValue(filterDropdown,randomfilteritem);
      
    }
}



    
