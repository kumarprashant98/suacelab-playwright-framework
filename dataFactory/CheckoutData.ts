import { Checkout } from "../dataObject/Checkout";

export class CheckoutData{
    static getCheckoutDetails(): Checkout{
        return new Checkout({
               firstname: "Test",
               lastname: "User",
               postalcode: "123456"
        })
    }
}
