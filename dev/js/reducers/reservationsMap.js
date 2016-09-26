import _ from "lodash"

const reservationsMap = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle

    switch (action.type) {
        case 'SELECT_PROJECT':
            return _.mapValues(state, (value) => {
                    if (value.id == action.reservationId) {
                        return {
                            ...value,
                            projectId: action.selectedProjectId
                        }

                    }
                    return value
                }
            )
        case 'FILL_HOURS':
            return _.mapValues(state, (value) => {
                    if (value.id == action.reservationId) {
                        return {
                            ...value,
                            hours: action.hours
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
            return _.assign({}, _.omit(state, action.reservationId));
        case
        'SET_DEFAULT_PROJECT_AND_HOURS':
            return _.mapValues(state, (value) => {
                    if (value.weekdayId == action.weekday.id) {
                        return {
                            ...value,
                            hours: action.weekday.defaultHoursNumber,
                            projectId: action.weekday.defaultProjectId
                        }

                    }
                    return value
                }
            );
        case 'SAVE_RESERVATION_DESCRIPTION':
            return _.mapValues(state, (value) => {
                    if (value.id == action.reservationId) {
                        return {
                            ...value,
                            description: action.descriptionText
                        }

                    }
                    return value
                }
            )
        default:
            return state;
    }
}

export default reservationsMap