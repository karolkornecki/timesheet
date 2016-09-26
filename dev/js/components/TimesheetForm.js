import React, { Component } from 'react'
import WeekNavigationBox from './WeekNavigationBox'
import TimesheetTableHeader from './TimesheetTableHeader'
import TimesheetTableContent from '../containers/TimesheetTableContent'
import TimesheetButtons from './TimesheetButtons'
import SummaryTitle from './SummaryTitle'
import SummaryHeader from './SummaryHeader'
import SummaryContent from './SummaryContent'
import DateBox from '../containers/DateBox'

class TimesheetForm extends Component {

    render() {
        return (
            <div className="container">
                <form>
                    <DateBox />
                    <WeekNavigationBox />
                    <TimesheetTableHeader />
                    <TimesheetTableContent />
                    <TimesheetButtons />
                    <SummaryTitle />
                    <SummaryHeader />
                    <SummaryContent />
                </form>
            </div>
        );
    }
}

export default TimesheetForm
