export class Checkout {
    firstname: string;
    lastname: string;
    postalcode: string;

    constructor(option: { firstname: string, lastname: string, postalcode: string }) {
        this.firstname = option.firstname;
        this.lastname = option.lastname;
        this.postalcode = option.postalcode;
    }
}