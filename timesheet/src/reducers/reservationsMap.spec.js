import reservationMap from './index'
import deepFreeze from "deep-freeze"

describe('reservationsMap reducer - test suite', () => {
    it('should handle hours change', () => {


        let stateBefore = {
            reservationsMap: {
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
            }
        };

        let stateAfter = {
            reservationsMap: {
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
            }
        };

        deepFreeze(stateBefore);

        expect(
            reservationMap(stateBefore, {
                type: 'FILL_HOURS',
                reservationId: 1,
                hours: 40
            })
        ).toEqual(stateAfter)
    })

    it('should return previous state in case of incorrect reservation id', () => {

        var stateBefore = {
            reservationsMap: {
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
            }
        };

        deepFreeze(stateBefore);
        expect(
            reservationMap(stateBefore, {
                type: 'FILL_HOURS',
                reservationId: 3,
                hours: 40
            })
        ).toEqual(stateBefore)
    })

})
