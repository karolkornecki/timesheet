import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import reservationById from '../routes/TimesheetPage/reducers/reservationById'
import weekdayById from '../routes/TimesheetPage/reducers/weekdayById'
import availableProjects from '../routes/TimesheetPage/reducers/availableProjects'
import projectById from '../routes/TimesheetPage/reducers/projectById'
import weekDateRangeLabel from '../routes/TimesheetPage/reducers/weekDateRangeLabel'

const reducers = combineReducers({
    reservationById,
    weekdayById,
    availableProjects,
    projectById,
    weekDateRangeLabel,
    form: formReducer
});

export default reducers
