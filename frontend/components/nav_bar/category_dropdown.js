import React from 'react';

export default class CategoryDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategories: false,
    }

    this.searchCategory = this.searchCategory.bind(this);
    this.toggleCategories = this.toggleCategories.bind(this);
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
      <div className="category-search" onClick={this.toggleCategories}>
        <span>Shop by category</span>
        {this.categories()}
        <i className="fas fa-sort-down"></i>
      </div>
    )
  }
}