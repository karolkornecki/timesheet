import _ from "lodash"

const reservationsMap = ( state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    switch (action.type) {
        case 'SELECT_PROJECT':
            return state;
        case 'FILL_HOURS':
            if (!_.hasIn(state, action.reservationId)) {
                return state;
            }

            let reservation = _.set(_.assign({}, _.pick(state, action.reservationId)[action.reservationId]), "hours", action.hours);
            let reservationEntry = _.set(_.assign({}, _.pick(state, action.reservationId)), action.reservationId, reservation);
            return _.assign({}, _.omit(state, action.reservationId), reservationEntry);
        case 'ADD_RESERVATION':
            return state;
        case 'SET_DEFAULT_PROJECT':
            return state;
        default:
            return state;
    }
}


export default reservationsMap