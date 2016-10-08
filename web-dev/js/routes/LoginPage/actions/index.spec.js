import * as actions from "./index"

describe("login form actions - test suite", () => {

    it("receiveLogin should create LOGIN_SUCCESS action", () => {

        let account = {
            firstName: 'Karol',
            lastName: 'Kornecki',
            email: 'karol.kornecki@gmail.com'
        }

        expect(actions.receiveLogin(account)).toEqual({
            type: "LOGIN_SUCCESS",
            account,
            isAuthenticated: true
        })
    })
})