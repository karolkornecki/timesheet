import reservationMap from './index'
import * as actions from '../actions/index'
import deepFreeze from "deep-freeze"
import _ from 'lodash'

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
            reservationMap(stateBefore, actions.fillHours(1, 40))
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
            reservationMap(stateBefore, actions.selectProject(2, 1))
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
            reservationMap(stateBefore, actions.fillHours(3, 40))
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
            reservationMap(stateBefore, actions.removeReservation(1))
        ).toEqual(stateAfter)
    })

    it('should handle add reservation', () => {

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

        deepFreeze(stateBefore);

        //when
        let result = reservationMap(stateBefore, actions.addReservation({id: 1}));

        //then
        let newReservation = _.values(_.omit(_.pick(result, 'reservationsMap').reservationsMap, [1, 2]))[0]; // TODO I dont like the way it's done. I need to find better way to unwrap inner object
        expect(newReservation.weekdayId).toEqual(1)

    })

    it('should handle select default project and hours for reservation', () => {

        const stateBefore = {
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
                    weekdayId: 2,
                    projectId: 2,
                    hours: 8
                }
            }
        };

        const weekday = {
            id: 2,
            defaultHoursNumber: 10,
            defaultProjectId: 7
        }

        const stateAfter = {
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
                    weekdayId: 2,
                    projectId: 7,
                    hours: 10
                }
            }
        };


        deepFreeze(stateBefore);
        deepFreeze(weekday);

        //when
        let result = reservationMap(stateBefore, actions.setDefaultProjectAndHours(weekday));

        //then
        expect(result).toEqual(stateAfter)

    })


    it('should handle save reservation description', () => {

        const stateBefore = {
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
            reservationsMap: {
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
            }
        };

        const stateAfter = {
            availableProjects: {},
            weekdaysMap: {},
            weekDateRangeLabel: {},
            projectsMap: {},
            reservationsMap: {
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
            }
        };


        deepFreeze(stateBefore);

        expect(reservationMap(stateBefore, actions.saveReservationDescription(1, 'new description from reservation'
        ))).toEqual(stateAfter)

    })
})
