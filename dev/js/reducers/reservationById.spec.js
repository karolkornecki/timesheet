import reservationsById from './reservationById'
import * as actions from '../actions/index'
import deepFreeze from "deep-freeze"
import _ from 'lodash'

describe('reservationById reducer - test suite', () => {
    it('should handle hours change', () => {


        let stateBefore = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 2,
                hours: 8
            }
        };

        let stateAfter = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 40
            },
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 2,
                hours: 8
            }
        };

        deepFreeze(stateBefore);

        expect(
            reservationsById(stateBefore, actions.fillHours(1, 40))
        ).toEqual(stateAfter)
    })


    it('should handle select project', () => {

        let stateBefore = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 2,
                hours: 8
            }
        };

        let stateAfter = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 1,
                hours: 8
            }
        };

        deepFreeze(stateBefore);

        expect(
            reservationsById(stateBefore, actions.selectProject(2, 1))
        ).toEqual(stateAfter)
    })

    it('should return previous state in case of incorrect reservation id', () => {

        var stateBefore = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 2,
                hours: 8
            }
        };

        deepFreeze(stateBefore);

        expect(reservationsById(stateBefore, actions.fillHours(3, 40))).toEqual(stateBefore)
    })


    it('should handle remove reservation', () => {

        let stateBefore = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 2,
                hours: 8
            }
        };

        let stateAfter = {
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 2,
                hours: 8
            }
        };

        deepFreeze(stateBefore);

        expect(reservationsById(stateBefore, actions.removeReservation(1))).toEqual(stateAfter)
    })

    it('should handle add reservation', () => {

        let stateBefore = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 1,
                projectId: 2,
                hours: 8
            }
        };

        deepFreeze(stateBefore);

        //when
        let result = reservationsById(stateBefore, actions.addReservation({id: 1}));

        expect(_.values(_.omitBy(result, (value, key) => {return key === '1' || key === '2'}))[0].weekdayId).toEqual(1)

    })

    it('should handle select default project and hours for reservation', () => {

        const stateBefore = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 2,
                projectId: 2,
                hours: 8
            }
        };

        const weekday = {
            id: 2,
            defaultHoursNumber: 10,
            defaultProjectId: 7
        }

        const stateAfter = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8
            },
            2: {
                id: 2,
                weekdayId: 2,
                projectId: 7,
                hours: 10
            }
        };


        deepFreeze(stateBefore);
        deepFreeze(weekday);

        //when
        let result = reservationsById(stateBefore, actions.setDefaultProjectAndHours(weekday));

        //then
        expect(result).toEqual(stateAfter)

    })


    it('should handle save reservation description', () => {

        const stateBefore = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8,
                description: 'old description 1'
            },
            2: {
                id: 2,
                weekdayId: 2,
                projectId: 2,
                hours: 8,
                description: 'description 2'
            }
        };

        const stateAfter = {
            1: {
                id: 1,
                weekdayId: 1,
                projectId: 3,
                hours: 8,
                description: 'new description from reservation'
            },
            2: {
                id: 2,
                weekdayId: 2,
                projectId: 2,
                hours: 8,
                description: 'description 2'
            }
        };


        deepFreeze(stateBefore);

        expect(reservationsById(stateBefore, actions.saveReservationDescription(1, 'new description from reservation'))).toEqual(stateAfter)

    })
})
