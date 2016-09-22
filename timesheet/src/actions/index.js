export const selectProject = (weekdayId, reservationId, selectedProjectId) => ({
    type: 'SELECT_PROJECT',
    reservationId,
    selectedProjectId
})

export const fillHours = (weekdayId, reservationId, hours) => ({
    type: 'FILL_HOURS',
    reservationId,
    hours
})

export const addReservation = (weekdayId) => ({
    type: 'ADD_RESERVATION',
    weekdayId
})

export const setDefaultProject = (weekdayId) => ({
    type: 'SET_DEFAULT_PROJECT',
    weekdayId
})