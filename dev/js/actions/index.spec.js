import * as actions from "./index"

describe("timesheet form actions", () => {

    it("selectProject should create SELECT_PROJECT action", () => {
        expect(actions.selectProject(0, 1)).toEqual({
            type: "SELECT_PROJECT",
            reservationId: 0,
            selectedProjectId: 1
        })
    })

    it("fillHours should create FILL_HOURS action", () => {
        expect(actions.fillHours(2, 8)).toEqual({
            type: "FILL_HOURS",
            reservationId: 2,
            hours: 8
        })
    })

    it("addReservation should create ADD_RESERVATION action", () => {

        const weekday = {
            id: 4,
            day: "10",
            month: "05",
            year: "2016",
            statusCode: "Accepted",
            defaultHoursNumber: 8,
            defaultProjectId: 2
        };

        const action = actions.addReservation(weekday);

        const UUID_FORMAT = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i

        expect(action.type).toEqual("ADD_RESERVATION")
        expect(action.weekday).toEqual(weekday)
        expect(UUID_FORMAT.test(action.reservationId)).toBe(true)
    })

    it("removeReservation should create CREATE_RESERVATION action", () => {
        expect(actions.removeReservation(1)).toEqual({
            type: "REMOVE_RESERVATION",
            reservationId: 1
        })
    })

    it("setDefaultProjectAndHours should create SET_DEFAULT_PROJECT_AND_HOURS action", () => {
        const weekday = {
            id: 4,
            day: "10",
            month: "05",
            year: "2016",
            statusCode: "Accepted",
            defaultHoursNumber: 8,
            defaultProjectId: 2
        }
        const action = actions.setDefaultProjectAndHours(weekday)

        expect(action.type).toEqual("SET_DEFAULT_PROJECT_AND_HOURS")
        expect(action.weekday).toEqual(weekday)
    })
})