import { v4 } from "node-uuid";

export const selectProject = (reservationId, selectedProjectId) => ({
    type: 'SELECT_PROJECT',
    reservationId,
    selectedProjectId
})

export const fillHours = (reservationId, hours) => ({
    type: 'FILL_HOURS',
    reservationId,
    hours
})

export const addReservation = (weekday) => ({
    type: 'ADD_RESERVATION',
    weekday,
    reservationId: v4()
})

export const removeReservation = (reservationId) => ({
    type: 'REMOVE_RESERVATION',
    reservationId
})

export const setDefaultProject = (weekdayId) => ({
    type: 'SET_DEFAULT_PROJECT',
    weekdayId
})