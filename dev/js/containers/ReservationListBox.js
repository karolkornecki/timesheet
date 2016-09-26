import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fillHours, removeReservation, saveReservationDescription } from '../actions'
import AvailableProjectsListBox from './AvailableProjectsListBox'
import { ModalManager} from 'react-dynamic-modal'
import DescriptionModal from './DescriptionModal'

const mapStateToProps = (state, ownProps) => ({
    reservationById: state.reservationById,
    reservations: Object.values(state.reservationById).filter(r => r.weekdayId === ownProps.weekdayId),
    projectById: state.projectById
})

class ReservationListBox extends Component {

    openModal(reservationId) {
        ModalManager.open(
            <DescriptionModal initialText={this.props.reservationById[reservationId].description}
                              onRequestClose={() => true}
                              onOkClose={ (description) => {  this.props.dispatch(saveReservationDescription(reservationId, description))}}/>
        );
    }

    render() {
        const reservations = this.props.reservations.map((reservation) => {
            const project = this.props.projectById[reservation.projectId];
            const weekdayId = this.props.weekdayId;
            let hoursInput;
            return (
                <div className="reservation-row" key={reservation.id}>
                    <div className="btn-group timesheet-project-column">
                        <button type="button"
                                className="btn btn-primary reservation-project">{project.projectName}</button>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <AvailableProjectsListBox weekdayId={weekdayId} reservationId={reservation.id}/>
                    </div>
                    <div className="timesheet-column">
                        <button type="button" className="btn btn-default" title="add note to reservation"
                            onClick={ ()=> this.openModal(reservation.id)}>
                            <span className="glyphicon glyphicon-pencil"/>
                        </button>
                    </div>
                    <div className="timesheet-column">
                        <input ref={ node => {hoursInput = node}} type="text" className="form-control timesheet-hour"
                               value={reservation.hours}
                               onChange={()=> this.props.dispatch(fillHours(reservation.id, hoursInput.value))}/>
                    </div>
                    <div className="timesheet-column">
                        <button type="button" className="btn btn-danger" title="remove reservation"
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
