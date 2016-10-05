import * as actions from "./index"

describe("login form actions - test suite", () => {

    it("requestLogin should create REQUEST_LOGIN action", () => {
        expect(actions.requestLogin('karol', 'secret')).toEqual({
            type: "REQUEST_LOGIN",
            username: 'karol',
            password: 'secret',
            isAuthenticated: false
        })
    })

    it("receiveLogin should create LOGIN_SUCCESS action", () => {
        expect(actions.receiveLogin({token: 'BVG%$%^&$#@'})).toEqual({
            type: "LOGIN_SUCCESS",
            user: {
                token: 'BVG%$%^&$#@'
            },
            isAuthenticated: true
        })
    })
})