import React, { Component } from 'react';

class WeekNavigationBox extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <nav>
                        <ul className="pager">
                            <li><a href="#" className="width-100">Previous</a></li>
                            <li><a href="#" className="width-100">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default WeekNavigationBox
