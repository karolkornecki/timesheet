import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
    weekDateRangeLabel: state.weekDateRangeLabel
})

class DateBox extends Component {
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

DateBox = connect(mapStateToProps)(DateBox);

export default DateBox
