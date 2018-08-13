import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.user;

        this.handleLogout = this.handleLogout.bind(this);
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

//    this is a temporary sign out button. make sure to improve on it later -----------------------------

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.history.push("/login"));
    }

    signOutButton() {
        if(this.state) {
            return (
            <li>
                <button onClick={this.handleLogout}>Sign out</button> 
            </li>
            );
        }
    }

//  ------------------------------------------------------------------------------------------------------

    render() {
        return (
            <div className="navbar">
                <ul>
                    {this.greeting()}
                    <li>|<a>Daily Deals</a>|</li>
                    <li><a>Gift Cards</a>|</li>
                    <li><a>Help & Contact</a></li>
                </ul>

                <ul>
                    <li><a>Sell</a>|</li>
                    <li><a>My Garage</a></li>
                    <li><i className="fas fa-bell"></i></li>
                    <li><i className="fas fa-shopping-cart"></i></li>
                </ul>
            </div>

                // {this.signOutButton()}

        );
    }
}