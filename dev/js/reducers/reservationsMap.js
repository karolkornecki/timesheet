import _ from "lodash"

const reservationsMap = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle

    switch (action.type) {
        case 'SELECT_PROJECT':
            if (!_.hasIn(state, action.reservationId)) {
                return state;
            }
            return createNewReservationState(state, action.reservationId, "projectId", action.selectedProjectId);
        case 'FILL_HOURS':
            if (!_.hasIn(state, action.reservationId)) {
                return state;
            }
            return createNewReservationState(state, action.reservationId, "hours", action.hours);
        case 'ADD_RESERVATION':
            return {
                ...state,
                [action.reservationId]: {
                    id: action.reservationId,
                    weekdayId: action.weekdayId,
                    hours: 11,
                    projectId: 1
                }
            };
        case 'REMOVE_RESERVATION':
            if (!_.hasIn(state, action.reservationId)) {
                return state;
            }
            return _.assign({}, _.omit(state, action.reservationId));
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