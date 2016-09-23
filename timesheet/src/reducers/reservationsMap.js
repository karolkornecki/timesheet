import _ from "lodash"

const reservationsMap = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    switch (action.type) {
        case 'SELECT_PROJECT':
            return state;
        case 'FILL_HOURS':
            console.log("Reducer w akcji "+action.reservationId+" "+action.hours);
            let reservation = _.pick(state, action.reservationId);
            let id = action.reservationId;
            var x =  _.merge(_.omit(state, id), _.set(reservation, _.set(reservation[id], "hours", action.hours)));

            console.log(_.pick(x, action.reservationId)[id].hours);
            return x
        case 'ADD_RESERVATION':
            return state;
        case 'SET_DEFAULT_PROJECT':
            return state;
        default:
            return state;
    }
}


export default reservationsMap
