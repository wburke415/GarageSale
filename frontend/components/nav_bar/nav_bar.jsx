import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    greeting() {
        if (this.props.user) {
            return (
                <li className="greeting">
                    Hi <span className="greeting-firstname">{this.props.user.firstname}!</span>
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

    handleInput(e) {
        this.setState({search: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/products',
            search: `?${this.state.search}`
        });
    }

//    this is a temporary sign out button. make sure to improve on it later -----------------------------

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.history.push("/login"));
    }

    signOutButton() {
        if(this.props.user) {
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
            <div className="navbar-container">
                <header className="navbar-header">
                    <ul>
                        {this.greeting()}
                        <li>|<a>Daily Deals</a>|</li>
                        <li><a>Gift Cards</a>|</li>
                        <li><a>Help & Contact</a></li>
                    </ul>

                    <ul>
                        <li><a href="/#/products/new">Sell</a>|</li>
                        <li><a>My Garage</a></li>
                        <li><i className="fas fa-bell"></i></li>
                        <li><i className="fas fa-shopping-cart"></i></li>
                    </ul>
                    {this.signOutButton()}
                </header>

                <div className="lower-navbar">
                    <Link to="/">
                        <img src={window.logo} />
                    </Link>
                    <form onSubmit={this.handleSubmit} className="search-form">
                        <input className="searchbar" onChange={this.handleInput} value={this.state.search} placeholder="Search for anything"/>
                        <input type="submit" className="search-button" />
                    </form>
                </div>

            </div>
        );
    }
}