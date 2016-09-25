import _ from "lodash"

const reservationsMap = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle

    switch (action.type) {
        case 'SELECT_PROJECT':
            if (!_.hasIn(state, action.reservationId)) {
                return state;
            }
            return _.mapValues(state, (value) => {
                    if (value.id == action.reservationId) {
                        return {
                            id: value.id,
                            weekdayId: value.weekdayId,
                            hours: value.hours,
                            projectId: action.selectedProjectId
                        }

                    }
                    return value
                }
            )
        case 'FILL_HOURS':
            if (!_.hasIn(state, action.reservationId)) {
                return state;
            }
            return _.mapValues(state, (value) => {
                    if (value.id == action.reservationId) {
                        return {
                            id: value.id,
                            weekdayId: value.weekdayId,
                            hours: action.hours,
                            projectId: value.projectId
                        }

                    }
                    return value
                }
            );
        case
        'ADD_RESERVATION':
            return {
                ...state,
                [action.reservationId]: {
                    id: action.reservationId,
                    weekdayId: action.weekday.id,
                    hours: action.weekday.defaultHoursNumber,
                    projectId: action.weekday.defaultProjectId
                }
            };
        case
        'REMOVE_RESERVATION':
            if (!_.hasIn(state, action.reservationId)) {
                return state;
            }
            return _.assign({}, _.omit(state, action.reservationId));
        case
        'SET_DEFAULT_PROJECT':
            return state;
        default:
            return state;
    }
}

export default reservationsMap