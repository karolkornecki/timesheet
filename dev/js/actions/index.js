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

export const addReservation = (weekdayId) => ({
    type: 'ADD_RESERVATION',
    weekdayId
})

export const setDefaultProject = (weekdayId) => ({
    type: 'SET_DEFAULT_PROJECT',
    weekdayId
})