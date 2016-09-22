import _ from "lodash"

const reservationsMap = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    switch (action.type) {
        case 'SELECT_PROJECT':
            return state;
        case 'FILL_HOURS':
            let reservation = _.pick(state, action.reservationId);
            let id = action.reservationId;
            return _.merge(_.omit(state, id), _.set(reservation, _.set(reservation[id], "hours", action.hours)));
        case 'ADD_RESERVATION':
            return state;
        case 'SET_DEFAULT_PROJECT':
            return state;
        default:
            return state;
    }
}


export default reservationsMap
