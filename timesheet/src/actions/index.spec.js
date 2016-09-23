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
        expect(actions.addReservation(4)).toEqual({
            type: "ADD_RESERVATION",
            weekdayId: 4
        })
    })

    it("setDefaultProject should create SET_DEFAULT_PROJECT action", () => {
        expect(actions.setDefaultProject(0)).toEqual({
            type: "SET_DEFAULT_PROJECT",
            weekdayId: 0
        })
    })
})