import { Login } from "../dataObject/Login"

export class LoginData {

    static getLoginValidDetails(): Login {
        return new Login({
            username: "standard_user",
            password: "secret_sauce"
        })
    }

    static getLoginWithInvalidDetails(): Login {
        return new Login({
            username: "test",
            password: "123456"
        })
    }
}