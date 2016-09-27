import registrationUser from './registrationUser'
import * as actions from '../actions/index'
import deepFreeze from "deep-freeze"
import _ from 'lodash'

describe('registrationUser reducer - test suite', () => {
    it('should handle username change', () => {

        let stateBefore = {}

        let stateAfter = {
            username: 'kkornecki'
        };

        deepFreeze(stateBefore);

        expect(registrationUser(stateBefore, actions.saveRegistrationUsername('kkornecki'))).toEqual(stateAfter)
    })
})