const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SELECT_PROJECT':
            return state;
        case 'FILL_HOURS':
            alert('fill');
            return state;
        case 'ADD_RESERVATION':
            return state;
        case 'SET_DEFAULT_PROJECT':
            return state;
        default:
            return state;
    }
}

//const weekdaysMap = (state = {}, action) => {
//    switch (action.type) {
//        case 'SELECT_PROJECT':
//            return state;
//        default :
//            return state;
//    }
//}
//
//const selectProjectReducer = (state, action) => {
//
//    //var reservation = state.weekDays[action.weekdayIndex].reservations[action.reservationIndex];
//    //var selectedProject = reservation.availableProjects.filter(p => p.id === action.selectedProjectId);
//    //state.weekDays[action.weekdayIndex].reservations[action.reservationIndex].project = selectedProject[0].project;
//    //
//    var new_state = Object.assign({}, state.weekDays);
//
//    new_state.weekDays[action.weekdayIndex].reservations[action.reservationIndex].project = state.weekDays[action.weekdayIndex]
//        .reservations[action.reservationIndex]
//        .availableProjects.filter(p => p.id === action.selectedProjectId)[0].project;
//    return state;
//
//}

export default reducer
