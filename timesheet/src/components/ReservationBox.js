import React, { Component, PropTypes } from 'react';
import AvailableProjectsListBox from './AvailableProjectsListBox'

class ReservationBox extends Component {
    static propTypes = {
        reservation: PropTypes.object
    };

    constructor() {
        super(...arguments);
        this.state = {
            hours: this.props.reservation.hours,
            projectName: this.props.reservation.project.projectName
        }
    }

    hoursChanged = (e) => {
        this.setState({hours: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="btn-group timesheet-project-column">
                    <button type="button"
                            className="btn btn-primary">{this.state.projectName}</button>
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        <span className="caret"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <AvailableProjectsListBox reservation={this.props.reservation}/>
                </div>
                <div className="timesheet-column">
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="timesheet-column">
                    <input type="text" className="form-control timesheet-hour"
                           value={this.state.hours} onChange={this.hoursChanged}/>
                </div>
                <div className="timesheet-column">
                    <button type="button" className="btn btn-danger">
                        <span className="glyphicon  glyphicon-trash img-circle text-danger"></span>
                    </button>
                </div>
            </div>
        );
    }
}
export default ReservationBox
