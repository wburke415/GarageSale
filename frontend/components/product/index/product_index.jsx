import React from 'react';

import ProductListItem from './product_list_item';

export default class ProductIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      resultsPerPage: 20
    }

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchProducts(this.props.location.search);
  }
    
  componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0);
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({currentPage: 1});
      this.props.fetchProducts(nextProps.location.search);
    }
  }

  listItems() {
    const { products } = this.props;
    const { productImages } = this.props;
    const { bids } = this.props;
    const { shippingPolicies } = this.props;

    let indexItems = [];

    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let image = productImages[product.productImageIds[0]];

      let productBids = [];

      for (let j = 0; j < product.bidIds.length; j++) {
        let bidId = product.bidIds[i];
        productBids.push(bids[bidId]);
      }

      let shippingPolicy = shippingPolicies[product.shippingPolicyId];

      indexItems.push(<ProductListItem key={i} shippingPolicy={shippingPolicy} image={image} bids={productBids} product={product} />);
    }

    return indexItems;
  }

  pagination() {
    let {currentPage} = this.state;
    let numPages = Math.floor(this.props.products.length / this.state.resultsPerPage);
    let pageNumbers = [];
    let arrows = ["<", ">"];

    if (numPages < 2) return;

    let startingPoint;

    if (numPages <= 10 || currentPage < 7) {
      startingPoint = 1;
    } else if (currentPage + 4 > numPages) {
      startingPoint = numPages - 9;
    } else {
      startingPoint = currentPage - 6;
    }

    let endPoint;
    startingPoint + 9 > numPages ? endPoint = numPages : endPoint = startingPoint + 9

    pageNumbers.push(
      <li key="left-arrow" className="pagination-item arrow" onClick={this.changePage}>
        {arrows[0]}
      </li>
    );
    
    for (let i = startingPoint; i <= endPoint; i++) {
      let className;
      i === currentPage ? className = "pagination-item active" : className="pagination-item"

      pageNumbers.push(
        <li key={i} className={className} onClick={this.changePage}>
          {i}
        </li>
      );
    }

    pageNumbers.push(
      <li key="right-arrow" className="pagination-item arrow" onClick={this.changePage}>
        {arrows[1]}
      </li>
    );

    return (
      <ul className="pagination">
        {pageNumbers.map(item => item)}
      </ul>
    )
  }

  changePage(e) {
    e.preventDefault();

    let {currentPage} = this.state;
    let numPages = Math.floor(this.props.products.length / this.state.resultsPerPage);

    if (e.target.innerText !== "<" && e.target.innerText !== ">") {
      this.setState({ currentPage: parseInt(e.target.innerText) });
      window.scrollTo(0,0);
    } else if (e.target.innerText === "<" && currentPage > 1) {
      this.setState({currentPage: currentPage - 1})
      window.scrollTo(0,0);
    } else if (e.target.innerText === ">" && currentPage < numPages) {
      this.setState({currentPage: currentPage + 1})
      window.scrollTo(0,0);
    }
  }

  render() {
    if (!this.props.products) { return null; }

    let { currentPage, resultsPerPage } = this.state;
    currentPage -= 1;

    let pageStart = 0 + (resultsPerPage * currentPage);
    let pageEnd = pageStart + resultsPerPage

    let listItems = this.listItems();

    return (
      <div className="product-index-container">
        <ul>
          {listItems.slice(pageStart, pageEnd).map(li => li)}
        </ul>
        {this.pagination()}
      </div>
    );
  }
}


