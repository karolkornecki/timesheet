import React, { Component } from 'react'
import { connect } from 'react-redux'


const mapStateToProps = (state, ownProps) => ({
    project: state.projectsMap[ownProps.projectId]
})

class AvailableProject extends Component {

    render() {
        return (
            <li><a href="#">
                {this.props.project.projectName}</a>
            </li>
        );
    }
}
AvailableProject = connect(mapStateToProps)(AvailableProject);
export default AvailableProject
