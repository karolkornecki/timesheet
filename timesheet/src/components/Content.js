import React, { Component, PropTypes } from 'react'
import DateBox from './DateBox'
import WeekNavigationBox from './WeekNavigationBox'
import TimesheetTableHeader from './TimesheetTableHeader'
import TimesheetTableContent from './TimesheetTableContent'
import TimesheetButtons from './TimesheetButtons'
import SummaryTitle from './SummaryTitle'
import SummaryHeader from './SummaryHeader'
import SummaryContent from './SummaryContent'

class Content extends Component {
    static propTypes = {
        data: PropTypes.object
    }

    render() {
        return (
            <div className="container">
                <form>
                    <DateBox weekDateRangeLabel={this.props.data.weekDateRangeLabel}/>
                    <WeekNavigationBox />
                    <TimesheetTableHeader />
                    <TimesheetTableContent weekdays={this.props.data.weekDays}/>
                    <TimesheetButtons />
                    <SummaryTitle />
                    <SummaryHeader />
                    <SummaryContent />
                </form>
            </div>
        );
    }
}

export default Content
