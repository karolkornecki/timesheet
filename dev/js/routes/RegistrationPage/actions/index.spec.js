import * as actions from "./index"

describe("registration form actions", () => {

    it("saveRegistrationUsername should create SAVE_REGISTRATION_USERNAME action", ()=> {
        expect(actions.saveRegistrationUsername("kkornecki")).toEqual({
            type: 'SAVE_REGISTRATION_USERNAME',
            username: 'kkornecki'
        })
    })
})