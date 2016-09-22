import React, { Component, PropTypes } from 'react';
import TimesheetTableRow from './TimesheetTableRow'

class TimesheetTableContent extends Component {
    static propTypes = {
        weekdays: PropTypes.array
    }
    render() {
        var rows = this.props.weekdays.map(function (weekday) {
            return (
                <TimesheetTableRow key={weekday.day} weekday={weekday}/>
            );
        });
        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default TimesheetTableContent
