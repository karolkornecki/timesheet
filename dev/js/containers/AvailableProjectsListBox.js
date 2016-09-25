import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectProject } from '../actions'


const mapStateToProps = (state, ownProps) => ({
    availableProjects: state.availableProjects
        .filter(a => a.weekdayId === ownProps.weekdayId)
        .map(a => a.projectId)
        .map(id => state.projectsMap[id])
})


class AvailableProjectsListBox extends Component {

    render() {
        let availableProjects = this.props.availableProjects.map((project) => {
            return (
                <li key={project.id}><a href="#"
                                        onClick={()=> this.props.onSelectProject(this.props.reservationId, project.id)}>
                    {project.projectName}</a>
                </li>
            );
        });
        return (
            <ul className="dropdown-menu">
                {availableProjects}
            </ul>
        );
    }
}

AvailableProjectsListBox = connect(
    mapStateToProps,
    {
        onSelectProject: selectProject
    } // same as -> onSelectProject(resId,projId) {dispatch(selectProject(resId, projId)) }
)(AvailableProjectsListBox);

export default AvailableProjectsListBox
