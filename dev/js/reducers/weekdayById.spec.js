import weekdayMap from './index'
import * as actions from '../actions/index'
import deepFreeze from "deep-freeze"
import _ from 'lodash'

describe('weekdayMap reducer - test suite', () => {
    it('should handle save weekday description', () => {


        let stateBefore = {
            availableProjects: {},
            weekdayById: {
                1: {
                    id: 1,
                    day: "09",
                    month: "05",
                    year: "2016",
                    statusCode: "Accepted",
                    defaultHoursNumber: 50,
                    defaultProjectId: 1,
                    description: "weekday 1 description"
                },
                2: {
                    id: 2,
                    day: "10",
                    month: "05",
                    year: "2016",
                    statusCode: "Accepted",
                    defaultHoursNumber: 50,
                    defaultProjectId: 5,
                    description: "weekday 2 description"
                }
            },
            weekDateRangeLabel: {},
            projectById: {},
            reservationById: {}
        }


        let stateAfter = {
            availableProjects: {},
            weekdayById: {
                1: {
                    id: 1,
                    day: "09",
                    month: "05",
                    year: "2016",
                    statusCode: "Accepted",
                    defaultHoursNumber: 50,
                    defaultProjectId: 1,
                    description: "some description"
                },
                2: {
                    id: 2,
                    day: "10",
                    month: "05",
                    year: "2016",
                    statusCode: "Accepted",
                    defaultHoursNumber: 50,
                    defaultProjectId: 5,
                    description: "weekday 2 description"
                }
            },
            weekDateRangeLabel: {},
            projectById: {},
            reservationById: {}
        }

        deepFreeze(stateBefore);

        expect(
            weekdayMap(stateBefore, actions.saveWeekdayDescription(1, 'some description'))
        ).toEqual(stateAfter)
    })
})