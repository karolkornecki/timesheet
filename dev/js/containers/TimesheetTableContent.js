import React, { Component } from 'react';
import TimesheetTableRow from './TimesheetTableRow'
import { connect } from 'react-redux'


const mapStateToProps = (state, ownProps) => ({
    weekdays: Object.values(state.weekdaysMap)
})

class TimesheetTableContent extends Component {

    render() {
        var rows = this.props.weekdays.map(function (weekday) {
            return (
                <TimesheetTableRow key={weekday.id} weekdayId={weekday.id}/>
            );
        });
        return (
            <div>
                {rows}
            </div>
        );
    }
}

TimesheetTableContent = connect(mapStateToProps)(TimesheetTableContent);

export default TimesheetTableContent
