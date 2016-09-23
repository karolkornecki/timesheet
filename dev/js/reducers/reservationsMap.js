import _ from "lodash"

const reservationsMap = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    if (!_.hasIn(state, action.reservationId)) {
        return state;
    }

    switch (action.type) {
        case 'SELECT_PROJECT':
            return createNewReservationState(state, action.reservationId, "projectId", action.selectedProjectId);
        case 'FILL_HOURS':
            return createNewReservationState(state, action.reservationId, "hours", action.hours);
        case 'ADD_RESERVATION':
            return state;
        case 'SET_DEFAULT_PROJECT':
            return state;
        default:
            return state;
    }
}

const createNewReservationState = (state, id, property, value) => {
    let reservation = _.set(_.assign({}, _.pick(state, id)[id]), property, value);
    let reservationEntry = _.set(_.assign({}, _.pick(state, id)), id, reservation);
    return _.assign({}, _.omit(state, id), reservationEntry);
}


export default reservationsMap