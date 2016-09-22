import weekdaysReducer from "./index"
import deepFreeze from "deep-freeze"

describe("Timesheet weekdays reducers", ()=> {
    it("should handle SELECT_PROJECT", ()=> {

        var stateBefore = {
            weekDays: [{
                reservations: [{
                    availableProjects: [
                        {
                            id: 1,
                            hours: 10,
                            project: {
                                id: 2,
                                projectName: "IacsPlus"
                            }
                        },
                        {
                            id: 2,
                            hours: 10,
                            project: {
                                id: 3,
                                projectName: "PZSIP"
                            }
                        },
                        {
                            id: 3,
                            hours: 10,
                            project: {
                                id: 4,
                                projectName: "Wyrocznia"
                            }
                        }
                    ]
                }]
            }]
        };

        var stateAfter = {
            weekDays: [{
                reservations: [{
                    project: {
                        id: 4,
                        projectName: "Wyrocznia"
                    },
                    availableProjects: [
                        {
                            id: 1,
                            hours: 10,
                            project: {
                                id: 2,
                                projectName: "IacsPlus"
                            }
                        },
                        {
                            id: 2,
                            hours: 10,
                            project: {
                                id: 3,
                                projectName: "PZSIP"
                            }
                        },
                        {
                            id: 3,
                            hours: 10,
                            project: {
                                id: 4,
                                projectName: "Wyrocznia"
                            }
                        }
                    ]
                }]
            }]
        };

        //deepFreeze(stateBefore);

        expect(weekdaysReducer(stateBefore, {
            type: 'SELECT_PROJECT',
            weekdayIndex: 0,
            reservationIndex: 0,
            selectedProjectId: 3
        })).toEqual(stateAfter)
    })
})
