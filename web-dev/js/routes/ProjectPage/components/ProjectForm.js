import React, { Component } from 'react';


class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.onSelectProject = this.onSelectProject.bind(this)
    }

    onSelectProject(id){

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h2>Project management</h2>
                        <div className="table-responsive">
                            <div className="form-group">
                                <label className="control-label">Available projects</label>
                            </div>
                            <ul className="dropdown-menu">
                                <li><a href="#" onClick={()=> this.onSelectProject(1)}>
                                    Project 1</a>
                                </li>
                                <li><a href="#" onClick={()=> this.onSelectProject(2)}>
                                    Project 2</a>
                                </li>
                                <li><a href="#" onClick={()=> this.onSelectProject(3)}>
                                    Project 3</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProjectForm
