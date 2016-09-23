import React, { Component } from 'react';

class TimesheetButtons extends Component {
    render() {
        return (
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
                            <span className="glyphicon glyphicon-remove"></span>&nbsp;<span>Request for rejection</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimesheetButtons
