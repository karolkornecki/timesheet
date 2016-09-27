import { combineReducers } from 'redux'
import reservationById from './reservationById'
import weekdayById from './weekdayById'
import availableProjects from './availableProjects'
import projectById from './projectById'
import weekDateRangeLabel from './weekDateRangeLabel'
import registrationUser from './registrationUser'

const reducers = combineReducers({
    reservationById,
    weekdayById,
    availableProjects,
    projectById,
    weekDateRangeLabel,
    registrationUser
});

export default reducers
