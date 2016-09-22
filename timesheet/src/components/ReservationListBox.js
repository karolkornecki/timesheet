import React, { Component, PropTypes } from 'react';
import ReservationBox from './ReservationBox'

class ReservationListBox extends Component {
    static propTypes = {
        reservations: PropTypes.array
    }
    render() {
        var reservations = this.props.reservations.map(function (reservation) {
            return (
                <ReservationBox key={reservation.id}
                                reservation={reservation}/>
            );
        });
        return (
            <div className="col-lg-5">
                {reservations}
            </div>
        );
    }
}

export default ReservationListBox
