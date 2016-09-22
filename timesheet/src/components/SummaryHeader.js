import React, { Component } from 'react';

class SummaryHeader extends Component {
    render() {
        return (
            <div className="row timesheet-table-header">
                <div className="col-lg-3">
                    <span>Project</span>
                </div>
                <div className="col-lg-3">
                    <span className="float-right">Hours</span>
                </div>
            </div>
        );
    }
}

export default SummaryHeader
