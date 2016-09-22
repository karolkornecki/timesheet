export const selectProject = (weekdayIndex, reservationIndex, selectedProjectId) => ({
    type: 'SELECT_PROJECT',
    weekdayIndex,
    reservationIndex,
    selectedProjectId
})

export const fillHours = (weekdayIndex, reservationIndex, hours) => ({
    type: 'FILL_HOURS',
    weekdayIndex,
    reservationIndex,
    hours
})

export const addReservation = (weekdayIndex) => ({
    type: 'ADD_RESERVATION',
    weekdayIndex
})

export const setDefaultProject = (weekdayIndex) => ({
    type: 'SET_DEFAULT_PROJECT',
    weekdayIndex
})