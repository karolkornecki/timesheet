import reservationMap from './index'
import deepFreeze from "deep-freeze"

describe('reservationsMap reducer - test suite', () => {
    it('should handle hours change', () => {


        let stateBefore = {
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
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
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
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


    it('should handle select project', () => {


        let stateBefore = {
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
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
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
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
                    projectId: 1,
                    hours: 8
                }
            }
        };

        deepFreeze(stateBefore);

        expect(
            reservationMap(stateBefore, {
                type: 'SELECT_PROJECT',
                reservationId: 2,
                selectedProjectId: 1
            })
        ).toEqual(stateAfter)
    })

    it('should return previous state in case of incorrect reservation id', () => {

        var stateBefore = {
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
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


    it('should handle remove reservation', () => {


        let stateBefore = {
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
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
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
            reservationsMap: {
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
                type: 'REMOVE_RESERVATION',
                reservationId: 1
            })
        ).toEqual(stateAfter)
    })

})
