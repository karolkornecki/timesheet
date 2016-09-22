import reservationMap from './index'

describe('todos reducer', () => {
    it('should handle initial state', () => {

        var stateBefore = {
            reservationsMap: {
                1: {
                    id: 1,
                    weekdayId: 1,
                    projectId: 3,
                    hours: 8
                }
            }
        };


        expect(
            reservationMap(stateBefore, {
                type: 'FILL_HOURS',
                reservationIndex: 1,
                hours: 40
            })
        ).toEqual({
                reservationsMap: {
                    1: {
                        id: 1,
                        weekdayId: 1,
                        projectId: 3,
                        hours: 40
                    }
                }
            })
    })

})
