import React, { Component, PropTypes } from 'react';
import ReservationListBox from './ReservationListBox'


class TimesheetTableRow extends Component {
    static propTypes = {
        weekday: PropTypes.object
    }
    render() {
        return (
            <div className="row timesheet-row">
                <div className="col-lg-1">
                    <span>{this.props.weekday.day}/{this.props.weekday.month}/{this.props.weekday.year}</span>
                </div>

                <ReservationListBox reservations={this.props.weekday.reservations}/>

                <div className="col-lg-1">
                    <button type="button" className="btn btn-success">
                        <span className="glyphicon  glyphicon-plus img-circle text-success"></span>
                    </button>
                </div>
                <div className="col-lg-2">
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="btn  btn-success" title="Set default">
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

export default TimesheetTableRow
