import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fillHours, removeReservation } from '../actions'
import AvailableProjectsListBox from './AvailableProjectsListBox'

const mapStateToProps = (state, ownProps) => ({
    reservations: Object.values(state.reservationsMap).filter(r => r.weekdayId === ownProps.weekdayId),
    projectsMap: state.projectsMap
})

class ReservationListBox extends Component {
    render() {
        let reservations = this.props.reservations.map((reservation) => {
            let project = this.props.projectsMap[reservation.projectId];

            return (
                <div key={reservation.id}>
                    <div className="btn-group timesheet-project-column">
                        <button type="button"
                                className="btn btn-primary">{project.projectName}</button>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <AvailableProjectsListBox reservationId={reservation.id}/>
                    </div>
                    <div className="timesheet-column">
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-pencil"/>
                        </button>
                    </div>
                    <div className="timesheet-column">
                        <input ref="hoursInput" type="text" className="form-control timesheet-hour"
                               value={reservation.hours}
                               onChange={()=> this.props.dispatch(fillHours(reservation.id, this.refs.hoursInput.value))}/>
                    </div>
                    <div className="timesheet-column">
                        <button type="button" className="btn btn-danger"
                                onClick={() => this.props.dispatch(removeReservation(reservation.id))}>
                            <span className="glyphicon  glyphicon-trash img-circle text-danger"></span>
                        </button>
                    </div>
                </div>
            );
        });
        return (
            <div className="col-lg-5">
                {reservations}
            </div>
        );
    }
}

ReservationListBox = connect(mapStateToProps)(ReservationListBox);

export default ReservationListBox
