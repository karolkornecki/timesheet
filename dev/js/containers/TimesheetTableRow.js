import React, { Component } from 'react';
import ReservationListBox from './ReservationListBox'
import { connect } from 'react-redux'
import { addReservation, setDefaultProjectAndHours } from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
    weekday: state.weekdaysMap[ownProps.weekdayId]
})

class TimesheetTableRow extends Component {
    render() {
        return (
            <div className="row timesheet-row">
                <div className="col-lg-1">
                    <span>{this.props.weekday.day}/{this.props.weekday.month}/{this.props.weekday.year}</span>
                </div>

                <ReservationListBox weekdayId={this.props.weekday.id}/>

                <div className="col-lg-1">
                    <button type="button" className="btn btn-success"
                            onClick={()=> this.props.dispatch(addReservation(this.props.weekday))}>
                        <span className="glyphicon  glyphicon-plus img-circle text-success"></span>
                    </button>
                </div>
                <div className="col-lg-2">
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="btn  btn-success" title="Set default"
                            onClick={()=> this.props.dispatch(setDefaultProjectAndHours(this.props.weekday))}>
                        <span className="glyphicon glyphicon-time img-circle text-success"/>
                    </button>
                </div>
                <div className="col-lg-2">
                    <span>{this.props.weekday.statusCode}</span>
                </div>
            </div>
        );
    }
}

TimesheetTableRow = connect(
    mapStateToProps
)
(TimesheetTableRow);

export default TimesheetTableRow
