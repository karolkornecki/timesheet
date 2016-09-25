import React, { Component } from 'react';
import ReservationListBox from './ReservationListBox'
import { connect } from 'react-redux'
import { addReservation, setDefaultProjectAndHours, saveWeekdayDescription } from '../actions/index'
import DescriptionModal from './DescriptionModal'
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

const mapStateToProps = (state, ownProps) => ({
    weekday: state.weekdaysMap[ownProps.weekdayId]
})

class TimesheetTableRow extends Component {

    openModal() {
        ModalManager.open(
            <DescriptionModal initialText={this.props.weekday.description}
                                     onRequestClose={() => true}
                                     onOkClose={
                                     (description) => {
                                             const { weekdayId , dispatch} = this.props;
                                             dispatch(saveWeekdayDescription(weekdayId, description))}
                                     }/>
        );
    }

    render() {
        const {weekday, dispatch} = this.props;
        return (
            <div className="row timesheet-row">
                <div className="col-lg-1">
                    <span>{weekday.day}/{weekday.month}/{weekday.year}</span>
                </div>

                <ReservationListBox weekdayId={weekday.id}/>

                <div className="col-lg-1">
                    <button type="button" className="btn btn-success" title="add new reservation to weekday"
                            onClick={()=> dispatch(addReservation(weekday))}>
                        <span className="glyphicon  glyphicon-plus img-circle text-success"></span>
                    </button>
                </div>
                <div className="col-lg-2">
                    <button type="button" className="btn btn-default" title="add note to weekday"
                            onClick={this.openModal.bind(this)}>
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="btn  btn-success" title="set default project and hours"
                            onClick={()=> dispatch(setDefaultProjectAndHours(weekday))}>
                        <span className="glyphicon glyphicon-time img-circle text-success"/>
                    </button>
                </div>
                <div className="col-lg-2">
                    <span>{weekday.statusCode}</span>
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
