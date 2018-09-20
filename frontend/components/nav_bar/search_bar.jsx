import React from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import CategoryDropdown from './category_dropdown';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      showResults: false,
      sendQuery: true,
    };

    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSearch = this.setSearch.bind(this);
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
    if (this.state.search !== '') {
      let searchBar = document.getElementsByClassName('searchbar')[0];
      searchBar.blur();
      this.setState({ search: '' });
      this.props.history.push({
        pathname: '/products',
        search: `?${this.state.search}`
      });
    }
  }

  setSearch(e) {
    e.preventDefault();
    this.setState({ search: e.target.innerText });
    this.props.history.push({
      pathname: '/products',
      search: `?${e.target.innerText}`
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

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">

        <CategoryDropdown history={this.props.history}/>

        <div className="navbar-search">
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <input
              className="searchbar"
              onChange={this.handleInput}
              onFocus={this.toggleResults("show")}
              onBlur={this.toggleResults("hide")}
              value={this.state.search}
              placeholder="Search for anything" 
            />
            {this.searchResults()}
          </ReactCSSTransitionGroup>
        </div>

        <input type="submit" className="search-button" />
      </form>
    );
  }
}