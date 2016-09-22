import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TimesheetBox from './components/TimesheetBox'
import reducer from './reducers'

var data = {
    weekDateRangeLabel: "20-27.09.2016",
    weekdaysMap: {
        1: {
            id: 1,
            day: "09",
            month: "05",
            year: "2016",
            statusCode: "Accepted",
            defaultHoursNumber: 8,
            defaultProjectId: 1
        },
        2: {
            id: 2,
            day: "10",
            month: "05",
            year: "2016",
            statusCode: "Accepted",
            defaultHoursNumber: 8,
            defaultProjectId: 2
        }
    },
    projectsMap: {
        1: {
            id: 1,
            projectName: "K-Solutions"
        },
        2: {
            id: 2,
            projectName: "Lids PL"
        },
        3: {
            id: 3,
            projectName: "IacsPlus"
        },
        4: {
            id: 4,
            projectName: "PZSIP"
        },
        5: {
            id: 5,
            projectName: "Wyrocznia"
        }
    },
    reservationsMap: {
        1: {
            id: 1,
            weekdayId: 1,
            projectId: 3,
            hours: 8,
        },
        2: {
            id: 2,
            weekdayId: 2,
            projectId: 4,
            hours: 6,
        }
    },
    availableProjects: [
        {
            id: 1,
            projectId: 1,
            reservationId: 1
        },
        {
            id: 2,
            projectId: 2,
            reservationId: 1
        },
        {
            id: 3,
            projectId: 3,
            reservationId: 1
        },
        {
            id: 4,
            projectId: 4,
            reservationId: 2
        },
        {
            id: 5,
            projectId: 5,
            reservationId: 2
        }
    ]
};

const store = createStore(reducer, data)


ReactDOM.render(
    <Provider store={store}>
        <TimesheetBox />
    </Provider>,
    document.getElementById('root')
)
