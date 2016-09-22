import React, { Component, PropTypes } from 'react'

class DateBox extends Component {
    static propTypes = {
        weekDateRangeLabel: PropTypes.string
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>{this.props.weekDateRangeLabel}</h3>
                </div>
            </div>
        );
    }
}

export default DateBox
