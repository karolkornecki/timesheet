import { combineReducers } from 'redux'
import reservationsMap from './reservationsMap'
import weekdaysMap from './weekdaysMap'
import availableProjects from './availableProjects'
import projectsMap from './projectsMap'
import weekDateRangeLabel from './weekDateRangeLabel'

const reducers = combineReducers({
    reservationsMap,
    weekdaysMap,
    availableProjects,
    projectsMap,
    weekDateRangeLabel
});

export default reducers
