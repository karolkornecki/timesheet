import _ from "lodash"

const reservationsMap = (state = {}, action) => {
    switch (action.type) {
        case 'SELECT_PROJECT':
            return state;
        case 'FILL_HOURS':
            return _.merge(
                ..._.omit(state, [action.reservationIndex]),
                _.set(_.pick(state, [action.reservationIndex].action.reservationIndex,"hours", action.hours))
            );
        case 'ADD_RESERVATION':
            return state;
        case 'SET_DEFAULT_PROJECT':
            return state;
        default:
            return state;
    }
}


export default reservationsMap
