import React, { Component } from 'react';
import AvailableProjectsListBox from './AvailableProjectsListBox'
import { connect } from 'react-redux'
import { fillHours } from '../actions'

const mapStateToProps = (state, ownProps) => ({
    reservation: state.reservationsMap[ownProps.reservationId],
    project: state.projectsMap[state.reservationsMap[ownProps.reservationId].projectId]
});


class ReservationBox extends Component {
    constructor(props) {
        super(props);
        this.state = {hours: ''};
        this.onHoursChange = this.onHoursChange.bind(this); // must be bind to this in ES6 class
    }

    onHoursChange(e) {
        this.props.dispatch(fillHours(this.props.reservation.id, e.target.value))
        this.setState({hours: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="btn-group timesheet-project-column">
                    <button type="button"
                            className="btn btn-primary">{this.props.project.projectName}</button>
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        <span className="caret"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <AvailableProjectsListBox reservationId={this.props.reservation.id}/>
                </div>
                <div className="timesheet-column">
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="timesheet-column">
                    <input type="text" className="form-control timesheet-hour"
                           value={this.state.hours} onChange={this.onHoursChange}/>
                </div>
                <div className="timesheet-column">
                    <button type="button" className="btn btn-danger">
                        <span className="glyphicon  glyphicon-trash img-circle text-danger"></span>
                    </button>
                </div>
            </div>
        );
    }
}

ReservationBox = connect(
    mapStateToProps)(ReservationBox);

export default ReservationBox
