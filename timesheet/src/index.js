import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TimesheetBox from './components/TimesheetBox'
import reducer from './reducers'

const store = createStore(reducer)


ReactDOM.render(
    <Provider store={store}>
        <TimesheetBox />
    </Provider>,
    document.getElementById('root')
)
