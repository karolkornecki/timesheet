import React, { Component } from 'react';
import ReservationBox from './ReservationBox'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
    reservations: Object.values(state.reservationsMap).filter(r => r.weekdayId === ownProps.weekdayId)
})

class ReservationListBox extends Component {
    render() {
        var reservations = this.props.reservations.map(function (reservation) {
            return (
                <ReservationBox key={reservation.id}
                                reservationId={reservation.id} />
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
