import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.user;
    }

    greeting() {
        if (this.state) {
            return (
                <li className="greeting">
                    Hi {this.state.firstname}!
                </li>
            );
        }
        else {
            return (
                <li className="greeting">
                    <span>Hi! </span>
                    <Link to="/login">Sign in</Link>
                    <span> or </span>
                    <Link to="/register">register</Link>
                </li>
            );
        }
    }

    render() {
        return (

            <ul className="navbar">
                {this.greeting()}
            </ul>

        );
    }
}