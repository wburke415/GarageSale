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
                    Hi <span className="greeting-firstname">{this.state.firstname}!</span>
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

//    this is a temporary sign out button. make sure to improve on it later
    signOutButton() {
        if(this.state) {
            return (
            <li>
                <button onClick={this.props.logout}>Sign out</button> 
            </li>
            );
        }
    }

    render() {
        return (

            <ul className="navbar">
                {this.greeting()}
                {this.signOutButton()}
            </ul>

        );
    }
}