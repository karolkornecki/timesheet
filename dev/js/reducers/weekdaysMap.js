import _ from "lodash"

const weekdaysMap = (state = {}, action = {}) => { // default action to satisfy intellij checkstyle
    switch (action.type) {
        case 'SAVE_WEEKDAY_DESCRIPTION':
            return _.mapValues(state, (value) => {
                    if (value.id == action.weekdayId) {
                        return {
                            id: value.id,
                            day: value.day,
                            month: value.month,
                            year: value.year,
                            statusCode: value.statusCode,
                            defaultHoursNumber: value.defaultHoursNumber,
                            defaultProjectId: value.defaultProjectId,
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


export default weekdaysMap