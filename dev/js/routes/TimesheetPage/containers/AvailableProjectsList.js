import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectProject } from '../actions'


const mapStateToProps = (state, ownProps) => ({
    availableProjects: state.availableProjects
        .filter(a => a.weekdayId === ownProps.weekdayId)
        .map(a => state.projectById[a.projectId])
})


class AvailableProjectsList extends Component {

    render() {
        let availableProjects = this.props.availableProjects.map((project) => {
            return (
                <li key={project.id}><
                    a href="#" onClick={()=> this.props.onSelectProject(this.props.reservationId, project.id)}>
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


AvailableProjectsList = connect(
    mapStateToProps,
    {
        onSelectProject: selectProject
    } // same as -> onSelectProject(resId,projId) {dispatch(selectProject(resId, projId)) }
)(AvailableProjectsList);

export default AvailableProjectsList
