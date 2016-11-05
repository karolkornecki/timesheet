import React, { Component } from 'react'
import { Link } from 'react-router'

class MenuElement extends Component {

    render() {
        if (this.props.isAuthenticated) {
            return (
                <li>
                    <Link to={this.props.linkTo}>
                        <span className={this.props.cssClasses}></span>
                        &#xA0;<span>{this.props.menuText}</span>
                    </Link>
                </li>);
        } else {
            return (<li/>);
        }
    }

}

export default MenuElement
