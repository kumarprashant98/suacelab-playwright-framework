export class Login{
    username: string
    password: string;

    constructor(option:{username:string; password: string}){
        this.username = option.username;
        this.password = option.password;
    }
}