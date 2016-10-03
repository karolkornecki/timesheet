import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import throttle from "lodash/throttle"
import allReducers from './reducers'
import {loadState, saveState} from './localStorage'

var data = {
    account: {
        id: 1,
        firstName: 'Karol',
        lastName: 'Kornecki',
        email: 'karol.kornecki@gmail.com',
        langKey: 'PL',
        password: '',
        confirmation: ''
    },
    weekDateRangeLabel: "20-27.09.2016",
    weekdayById: {
        1: {
            id: 1,
            day: "09",
            month: "05",
            year: "2016",
            statusCode: "Accepted",
            defaultHoursNumber: 50,
            defaultProjectId: 1,
            description: "weekday 1 description"
        },
        2: {
            id: 2,
            day: "10",
            month: "05",
            year: "2016",
            statusCode: "Accepted",
            defaultHoursNumber: 50,
            defaultProjectId: 5,
            description: "weekday 2 description"
        }
    },
    projectById: {
        1: {
            id: 1,
            projectName: "Google Chrome"
        },
        2: {
            id: 2,
            projectName: "React"
        },
        3: {
            id: 3,
            projectName: "Redux"
        },
        4: {
            id: 4,
            projectName: "Facebook"
        },
        5: {
            id: 5,
            projectName: "Angular 2"
        }
    },
    reservationById: {
        1: {
            id: 1,
            weekdayId: 1,
            projectId: 3,
            hours: 8,
            description: "reservation 1 description"
        },
        2: {
            id: 2,
            weekdayId: 2,
            projectId: 4,
            hours: 6,
            description: "reservation 2 description"
        }
    },
    availableProjects: [
        {
            id: 1,
            projectId: 1,
            weekdayId: 1
        },
        {
            id: 2,
            projectId: 2,
            weekdayId: 1
        },
        {
            id: 3,
            projectId: 3,
            weekdayId: 1
        },
        {
            id: 4,
            projectId: 4,
            weekdayId: 2
        },
        {
            id: 5,
            projectId: 5,
            weekdayId: 2
        },
        {
            id: 6,
            projectId: 3,
            weekdayId: 2
        }
    ]
};


//const persistedState = loadState();

const configureStore = ()=> {

    const logger = createLogger();
    return createStore(
        allReducers,
        applyMiddleware(thunk, promise, logger)
    )
}

//store.subscribe(throttle(()=> saveState(store.getState()), 1000));

export default configureStore