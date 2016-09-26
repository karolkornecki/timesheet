import _ from "lodash"

const weekdayById = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    switch (action.type) {
        case 'SAVE_WEEKDAY_DESCRIPTION':
            return _.mapValues(state, (value) => {
                    if (value.id == action.weekdayId) {
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


export default weekdayById