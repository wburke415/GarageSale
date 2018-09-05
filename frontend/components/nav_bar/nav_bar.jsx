import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search_bar';

export default class NavBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        signoutActive: false,
      };

      
    this.handleLogout = this.handleLogout.bind(this);
    this.directToDailyDeals = this.directToDailyDeals.bind(this);
    this.toggleSignoutButton = this.toggleSignoutButton.bind(this);
  }

  greeting() {
    if (this.props.user) {
      return (
        <li className="greeting">
          Hi <span
            onClick={this.toggleSignoutButton}
            className="greeting-firstname">
            {this.props.user.firstname}!
              <i className="fas fa-sort-down"></i>
          </span>
          {this.signOutButton()}
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

    toggleSignoutButton(action) {
        if(this.state.signoutActive === false) this.setState({signoutActive: true});
        if (this.state.signoutActive === true) this.setState({signoutActive: false}); 
    }

    directToDailyDeals(e) {
      e.preventDefault();
      this.props.history.push({
        pathname: '/products',
        search: `dailydeals`
      });
    }

    handleLogout(e) {
      e.preventDefault();
      this.props.logout().then(() => this.props.history.push("/login"));
    }

  signOutButton() {
    if (this.props.user && this.state.signoutActive) {
      return (
        <div>
          <div onClick={this.toggleSignoutButton} className="rest-of-page"></div>
          <div className="sign-out-container">
            <div className="upper-container">
              <i className="fas fa-user"></i>
              <div className="user-info">
                <span>{this.props.user.firstname} {this.props.user.lastname}</span>
                <div>{this.props.user.username}</div>
              </div>
            </div>
            <a onClick={this.handleLogout} className="sign-out-button">Sign out</a>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <header className="navbar-header">
          <ul>
            {this.greeting()}
            <li>|<a onClick={this.directToDailyDeals}>Daily Deals</a></li>
          </ul>

          <ul>
            <li><a href="/#/products/new">Sell</a>|</li>
            <li><a>My Garage</a></li>
            <li><i className="fas fa-bell"></i></li>
            <li><i className="fas fa-shopping-cart"></i></li>
          </ul>
        </header>

        <div className="lower-navbar">
          <Link to="/">
            <img src={window.logo} />
          </Link>

          <SearchBar
            fetchProductTitles={this.props.fetchProductTitles}
            searchResults={this.props.searchResults}
            history={this.props.history} />
        </div>

      </div>
    );
  }
}