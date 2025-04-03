import test, { Page } from "@playwright/test";
//import fs from 'fs';
const fs = require('fs');
//import path from 'path';
const path = require('path');
const pdfParse = require('pdf-parse');
//import { PdfReport } from "../dataObject/PdfReport";
const downloadReportPath = path.join(__dirname, "../", "sauceLabDownloadReports");

export class BasePage {

    constructor(public page: Page) {
    }

    async navigateToUrl() {
        //Navigate to Home Page
        const baseURL = test.info().project.use.baseURL;
        if (!baseURL) throw new Error("Base URL is not defined in the Playwright config");
        await this.page.goto(baseURL);
    }
    enterText = async (Locator: string, value: string) => await this.page.locator(Locator).fill(value);

    //clickOn = async (locator: string) => await this.page.locator(locator).click();

    clickOn = async (locator: string) => {

        const element = this.page.locator(locator);
        // Click the element
        await element.click();

    };

    doubleClickOn = async (locator: string) => await this.page.locator(locator).dblclick();

    getText = async (locator: string) => await this.page.locator(locator).textContent();

    getListText = async (locator: string) => await this.page.locator(locator).allTextContents();
    /**
    * Clicks on the specified locator.
    * @param {Locator} locator - The Playwright locator to be clicked.
    */
    logoIsDisplayed = async (locator: string) => await this.page.locator(locator).isDisabled();

    elements = async (locator: string) => await this.page.locator(locator).elementHandle();

    checksBox = async (locator: string) => await this.page.locator(locator).isChecked();

    checkBox = async (locator: string) => await this.page.locator(locator).uncheck();

    elementIsVisble = async (locator: string) => await this.page.locator(locator).isVisible();

    CopyToTicketNumeber = async (locator: string) => await this.page.locator(locator).innerText();

    clearTextbox = async (locator: string) => await this.page.locator(locator).clear();

    getValue = async (locator: string) => await this.page.locator(locator).innerText();

    getStatusLabelText = async (locator: string) => await this.page.locator(locator).innerText();

    scrollToBottom = async () => await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    /**
          * Clicks on the specified locator.
          * @param {Locator} locator - The Playwright locator to be clicked.
          * @param {string} dropDownValue - The Playwright locator to be clicked.
          */
    selectDropDownValue = async (locator: string, dropDownValue: string, forceClick: boolean = false) => await this.page.locator(locator).selectOption({ label: dropDownValue });

    /**
    * Clicks on the specified locator.
    * @param {Locator} locator - The Playwright locator to be clicked.
    */
    //clickOnButton = async (locator: string, forceClick: boolean = false) => await this.page.locator(locator).click({ force: forceClick });


    downloadFile = async (printPackageLabel: string, title: string = "") => {

        //delete downloaded file first
        const filePath = path.join(downloadReportPath, title || 'PackageLabel.pdf');
        this.deleteFile(filePath);

        // download the file
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.clickOn(printPackageLabel),
        ]);


        // Create the directory if it doesn't exist
        if (!fs.existsSync(downloadReportPath)) {
            fs.mkdirSync(downloadReportPath, { recursive: true });
        }

        // Save the downloaded file to the correct path
        await download.saveAs(filePath);
        console.log(`File saved successfully at: ${filePath}`);
    }

    checkFileDownloaded = async (fileName: string) => {
        const filePath = path.join(downloadReportPath, fileName);
        return fs.existsSync(filePath);
    }

    readPdfReport = async (fileName) => {

        const filePath = path.join(downloadReportPath, fileName);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return;
        }

        // Read the file
        const dataBuffer = fs.readFileSync(filePath);

        // Parse the PDF
        try {
            const pdfData = await pdfParse(dataBuffer);

            //let extractedText = pdfData.replace(/\s+/g, ' ').trim();

            //console.log("Extract the text from the PDF" , extractedText.text)
            // Extracted text from the PDF
            console.log("Extracted text from PDF: ", pdfData.text);

            // You can return or process the text as needed
            //return extractedText.text;
            return pdfData.text;
        } catch (error) {
            console.error("Error reading PDF file: ", error);
        }
    }



    // removeTimeStapsFromPdfText = (pdfData: string): [string, any] => {
    //     //First remove new lines from the pdf text
    //     let text = pdfData.replace(/\n/g, "");

    //     //Now remove all the text which having time stamps using Regular expression pattern
    //     let pattern: RegExp = new RegExp("Printed On \\d{2}/\\d{2}/\\d{4} \\d{2}:\\d{2}:\\d{2} [AP]M");

    //     //Remove all time stamps from the pdf text
    //     const filteredText = text.replace(pattern, "");
    //     const timestampData = text.match(pattern || []);

    //     let myTuple: [string, any] = [filteredText, timestampData];
    //     return myTuple;
    // }

    deleteFile = async (fileName: string): Promise<void> => {
        try {
            if (fs.existsSync(fileName)) {
                fs.unlinkSync(fileName);
                console.log('File deleted successfully');
            } else {
                console.log('File does not exist, no need to delete.');
            }
        } catch (err) {
            console.error('Error deleting file:', err);
        }
    }

}