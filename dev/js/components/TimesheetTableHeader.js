import React, { Component } from 'react';


class TimesheetTableHeader extends Component {
    render() {
        return (
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
        );
    }
}

export default TimesheetTableHeader
