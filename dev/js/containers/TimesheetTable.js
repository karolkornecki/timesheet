import React, { Component } from 'react';
import TimesheetTableRow from './TimesheetTableRow'
import { connect } from 'react-redux'

import './timesheet.scss'


const mapStateToProps = (state, ownProps) => ({
    weekdays: Object.values(state.weekdayById)
})

class TimesheetTable extends Component {

    render() {
        var rows = this.props.weekdays.map(function (weekday) {
            return (
                <TimesheetTableRow key={weekday.id} weekdayId={weekday.id}/>
            );
        });
        return (
            <div>
                <div className="row timesheet-table-header">
                    <div className="col-lg-1">
                        <span>Date</span>
                    </div>
                    <div className="col-lg-5">
                        <span>Project name and hours</span>
                    </div>
                    <div className="col-lg-1">
                    </div>
                    <div className="col-lg-2">
                        <span>Description</span>
                    </div>
                    <div className="col-lg-1">
                        <span>Actions</span>
                    </div>
                    <div className="col-lg-2">
                        <span>Status</span>
                    </div>
                </div>
                {rows}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-default">
                                <span className="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Edit</span>
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <span className="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span>
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <span className="glyphicon glyphicon-send"></span>&nbsp;<span>Submit</span>
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <span className="glyphicon glyphicon-print"></span>&nbsp;<span>Print</span>
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <span className="glyphicon glyphicon-remove"></span>&nbsp;
                                <span>Request for rejection</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TimesheetTable = connect(mapStateToProps)(TimesheetTable);

export default TimesheetTable
