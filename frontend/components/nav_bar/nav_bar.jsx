import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            showResults: false,
            sendQuery: true,
            signoutActive: false,
            showCategories: false
        };

        this.searchCategory = this.searchCategory.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.directToDailyDeals = this.directToDailyDeals.bind(this);
        this.toggleSignoutButton = this.toggleSignoutButton.bind(this);
        this.toggleCategories = this.toggleCategories.bind(this);
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

    handleInput(e) {
        this.setState({search: e.target.value}, () => {
            if(this.state.sendQuery) {
                this.setState({sendQuery: false}, () => this.props.fetchProducts(this.state.search));
            } 
            if(this.state.search === "") this.setState({sendQuery: true});
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({showResults: false});
        this.props.fetchProducts(this.state.search)
        .then(
            this.props.history.push({
                pathname: '/products',
                search: `?${this.state.search}`
            })
        );
    }

    setSearch(e) {
        e.preventDefault();
        this.setState({search: e.target.innerText});
        this.props.history.push({
            pathname: '/products',
            search: `?${e.target.innerText}`
        });
    }

    directToDailyDeals(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/products',
            search: `dailydeals`
        });
    }

    searchResults() {
        let searchResults = Object.values(this.props.products)
            .filter(product => product.searchString.includes(this.state.search.toLowerCase()))
            .map(product => product.title)
            .slice(0,10);

        if (this.state.search && this.state.showResults) {
            return (
                <ul className="search-results">
                    {searchResults.map((title, idx) => <li onClick={this.setSearch} key={idx}>{title}</li>)}
                </ul>
            );
        }
    }

    toggleResults(action) {
        return e => {
            if (action === "show") this.setState({showResults: true});
            if (action === "hide") this.setState({showResults: false});
        };
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.history.push("/login"));
    }

    signOutButton() {
        if(this.props.user && this.state.signoutActive) {
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

    toggleCategories(e) {
        if(this.state.showCategories === false) this.setState({showCategories: true});
        if(this.state.showCategories === true) this.setState({showCategories: false});
    }

    searchCategory(event) {
        this.setState({ showCategories: false });
        this.props.fetchProducts(`?category=${event.target.value}`)
            .then(
                this.props.history.push({
                    pathname: '/products',
                    search: `?category=${event.target.value}`
                })
            );
    }

    categories() {
        if(this.state.showCategories) {
            return (
                <div>
                    <ul className="category-dropdown">
                        <li value={2} onClick={this.searchCategory}>Books</li>
                        <li value={1} onClick={this.searchCategory}>Video Games</li>
                        <li value={3} onClick={this.searchCategory}>Pet Toys</li>
                    </ul>
                    <div className="rest-of-page" onClick={this.toggleCategories}></div>
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
                    <form onSubmit={this.handleSubmit} className="search-form">
                        <div className="category-search" onClick={this.toggleCategories}>
                            <span>Shop by category</span>
                            {this.categories()}
                            <i className="fas fa-sort-down"></i>
                        </div>
                        <div className="navbar-search">
                            <ReactCSSTransitionGroup
                                transitionName="example"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}>
                                <input 
                                    className="searchbar" 
                                    onChange={this.handleInput} 
                                    onFocus={this.toggleResults("show")}
                                    onBlur={this.toggleResults("hide")}
                                    value={this.state.search} 
                                    placeholder="Search for anything"/>
                                {this.searchResults()}
                            </ReactCSSTransitionGroup>
                        </div>
                        <input type="submit" className="search-button" />
                    </form>
                </div>

            </div>
        );
    }
}