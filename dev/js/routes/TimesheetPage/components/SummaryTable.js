import React, { Component } from 'react';

class SummaryTable extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h4>Your reservations</h4>
                    </div>
                </div>
                <div className="row timesheet-table-header">
                    <div className="col-lg-3">
                        <span>Project</span>
                    </div>
                    <div className="col-lg-3">
                        <span className="float-right">Hours</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <span>IACSplus</span>
                    </div>
                    <div className="col-lg-3">
                        <span className="float-right">40</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SummaryTable
