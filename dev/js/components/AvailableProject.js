import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectProject } from '../actions'


const mapStateToProps = (state, ownProps) => ({
    project: state.projectsMap[ownProps.projectId]
})

class AvailableProject extends Component {

    render() {
        return (
            <li><a href="#" onClick={()=> this.props.dispatch(selectProject(this.props.reservationId, this.props.projectId))}>
                {this.props.project.projectName}</a>
            </li>
        );
    }
}
AvailableProject = connect(mapStateToProps)(AvailableProject);
export default AvailableProject
