import React from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      showResults: false,
      sendQuery: true,
      showCategories: false,
      showCategories: false
    };

    this.searchCategory = this.searchCategory.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.toggleCategories = this.toggleCategories.bind(this);
  }

  handleInput(e) {
    this.setState({ search: e.target.value }, () => {
      if (this.state.sendQuery) {
        this.setState({ sendQuery: false }, () => this.props.fetchProductTitles(this.state.search));
      }
      if (this.state.search === "") this.setState({ sendQuery: true });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchBar = document.getElementsByClassName('searchbar')[0];
    searchBar.blur();
    this.setState({ search: '' });
    this.props.history.push({
      pathname: '/products',
      search: `?${this.state.search}`
    })
  }

  setSearch(e) {
    e.preventDefault();
    this.setState({ search: e.target.innerText });
    this.props.history.push({
      pathname: '/products',
      search: `?${e.target.innerText}`
    });
  }

  toggleCategories(e) {
    if (this.state.showCategories === false) this.setState({ showCategories: true });
    if (this.state.showCategories === true) this.setState({ showCategories: false });
  }

  searchCategory(event) {
    this.setState({ showCategories: false });
    this.props.history.push({
      pathname: '/products',
      search: `?category=${event.target.value}`
    });
  }

  searchResults() {
    let searchResults = this.props.searchResults
      .filter(product => product.title.toLowerCase().includes(this.state.search.toLowerCase()))
      .map(product => product.title)
      .slice(0, 10);

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
      if (action === "show") this.setState({ showResults: true });
      if (action === "hide") this.setState({ showResults: false });
    };
  }

  categories() {
    if (this.state.showCategories) {

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
              placeholder="Search for anything" />

            {this.searchResults()}
          </ReactCSSTransitionGroup>
        </div>

        <input type="submit" className="search-button" />
      </form>
    );
  }
}