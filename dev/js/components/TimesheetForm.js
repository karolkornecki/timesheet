import React, { Component } from 'react'
import WeekNavigationBox from './WeekNavigationBox'
import TimesheetTable from '../containers/TimesheetTable'
import SummaryTable from './SummaryTable'
import DateBox from '../containers/DateBox'

class TimesheetForm extends Component {

    render() {
        return (
            <div className="container">
                <form>
                    <DateBox />
                    <WeekNavigationBox />
                    <TimesheetTable />
                    <SummaryTable />
                </form>
            </div>
        );
    }
}

export default TimesheetForm
