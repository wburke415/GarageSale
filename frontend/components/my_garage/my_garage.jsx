import React from 'react';

import * as TimeUtil from '../../utils/time_util';
import ProductListItem from '../product/index/product_list_item';

export default class MyGarage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Summary'
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUserId);
  }

  header() {
    let soldProducts = this.props.listedProducts.filter(product => product.buyerId).length;

    return (
      <span className="mygarage-header">
        <h1>My Garage</h1>
        <span>{this.props.currentUser.username}</span>
        <span className="feedback">( {soldProducts} <i className="fas fa-star"></i> )</span>
      </span>
    )
  }

  bidsEndingSoonList() {
    let endingSoon = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let endTime = TimeUtil.endTime(this.props.biddedProducts[i]);
      if (endTime.props.children.includes("Today") && TimeUtil.timeStrings(this.props.biddedProducts[i]) !== "Ended") endingSoon.push(this.props.biddedProducts[i]);
    }

    return endingSoon;
  }

  bidsEndingSoon() {
    let endingSoon = this.bidsEndingSoonList();

    if (endingSoon.length > 0) {
      if (endingSoon.length === 1) {
        return <span><i className="far fa-clock"></i>
          <a id="Bids Ending Soon">{endingSoon.length} item</a> I bid on is ending soon.
          </span>;
      } else {
        return <span><i className="far fa-clock"></i>
          <a id="Bids Ending Soon">{endingSoon.length} items</a> I bid on are ending soon.
          </span>;
      }
    }
  }

  bidsEndingSoonIndex() {
    if (this.state.currentPage === "Bids Ending Soon") {
      return this.itemIndex(this.bidsEndingSoonList(), "Bids Ending Soon");
    }
  }

  watchesEndingSoon() {
    let endingSoon = [];

    for (let i = 0; i < this.props.watchedProducts.length; i++) {
      let endTime = TimeUtil.endTime(this.props.watchedProducts[i]);
      if (endTime.props.children.includes('Today') && TimeUtil.timeStrings(this.props.watchedProducts[i]) !== 'Ended') endingSoon.push(this.props.biddedProducts[i]);
    }

    if (endingSoon.length > 0) {
      if (endingSoon.length === 1) {
        return <span><i className="far fa-clock"></i>
          <a id="Watched Items Ending Soon">{endingSoon.length} item</a> I'm watching is ending soon.
          </span>;
      } else {
        return <span><i className="far fa-clock"></i>
          <a id="Watched Items Ending Soon">{endingSoon.length} items</a> I'm watching are ending soon.
          </span>;
      }
    }
  }

  outbidItemsList() {
    let { biddedProducts, bids, currentUserId } = this.props;

    let outBid = [];

    for (let i = 0; i < biddedProducts.length; i++) {
      let product = biddedProducts[i];
      if (new Date() > new Date(product.endsAt)) continue;

      let highestBid = bids.filter(bid => bid.productId == product.id).sort(bid => bid.bid)[0];
      if (highestBid && highestBid.buyerId != currentUserId) outBid.push(product);
    }

    return outBid;
  }

  outbidItemsIndex() {
    if (this.state.currentPage === "Outbid Items") {
      return this.itemIndex(this.outbidItemsList(), "Outbid Items");
    }
  }

  outbidItems() {
    let outBid = this.outbidItemsList();

    if (outBid.length > 0) {
      if (outBid.length === 1) {
        return <span><i className="fas fa-times"></i>
            I've been outbid on <a id="Outbid Items">{outBid.length} item</a>.
          </span>;
      } else {
        return <span><i className="fas fa-times"></i>
          I've been outbid on <a id="Outbid Items">{outBid.length} items</a>.
          </span>;
      }
    }
  }

  purchasedItems() {
    let purchasedProducts = this.purchasedProductsList();

    if (purchasedProducts.length !== 0) {
      if (purchasedProducts.length === 1) {
        return <span><i className="fas fa-box"></i>
            <a id="Won">{purchasedProducts.length} item</a> I purchased is awaiting shipment.
          </span>;
      } else {
        return <span><i className="fas fa-box"></i>
          <a id="Won">{purchasedProducts.length} items</a> I purchased are awaiting shipment.
          </span>;
      }
    }
  }

  purchasedProductsList() {
    let wonAuctions = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let product = this.props.biddedProducts[i];
      let timeString = TimeUtil.timeStrings(product);
      if (timeString !== 'Ended') continue;

      let bids = this.props.bids.filter(bid => bid.productId == product.id).sort(bid => bid.bid);
      if (bids[0].buyerId == this.props.currentUserId) wonAuctions.push(product);
    }

    return wonAuctions.concat(this.props.purchasedProducts);
  }

  buyingReminders() {
    if (this.state.currentPage === 'Summary') {
      let bidsEndingSoon = this.bidsEndingSoon()
      let outbidItems = this.outbidItems();
      let purchasedItems = this.purchasedItems();
      let watchesEndingSoon = this.watchesEndingSoon();

      let noReminders;

      !bidsEndingSoon && !outbidItems && !purchasedItems && !watchesEndingSoon ? noReminders = 'There are currently no buying reminders to display.' : noReminders = null;

      return (
        <div className="mygarage-section">
          <h1 className="section-header">Buying Reminders</h1>
          <div className="section-content">
            <div className="last-31">(Last 31 days)</div>
            <ul>
              <div className="section-item" onClick={this.setCurrentPage}>{bidsEndingSoon}</div>
              <div className="section-item" onClick={this.setCurrentPage}>{outbidItems}</div>
              <div className="section-item" onClick={this.setCurrentPage}>{purchasedItems}</div>
              <div className="section-item" onClick={this.setCurrentPage}>{watchesEndingSoon}</div>
              <div className="section-item" onClick={this.setCurrentPage}>{noReminders}</div>
            </ul>
          </div>
        </div>
      );
    }

  }

  listingsEndingSoonList() {
    let endingSoon = [];

    for (let i = 0; i < this.props.listedProducts.length; i++) {
      if (this.props.listedProducts[i].buyerId) continue;
      let endTime = TimeUtil.endTime(this.props.listedProducts[i]);
      if (endTime.props.children.includes("Today")) endingSoon.push(this.props.listedProducts[i]);
    }

    return endingSoon;
  }

  listingsEndingSoonIndex() {
    if (this.state.currentPage === "Listings Ending Soon") {
      return this.itemIndex(this.listingsEndingSoonList(), "Listings Ending Soon");
    }
  }

  listingsEndingSoon() {
    let endingSoon = this.listingsEndingSoonList();

    if (endingSoon.length > 0) {
      if (endingSoon.length === 1) {
        return <span><i className="far fa-clock"></i>
          <a id="Listings Ending Soon">{endingSoon.length} item</a> I'm selling is ending soon.
          </span>;
      } else {
        return <span><i className="far fa-clock"></i>
          <a id="Listings Ending Soon">{endingSoon.length} items</a> I'm selling are ending soon.
          </span>;
      }
    }
  }

  soldListingItems() {
    let { listedProducts, bids } = this.props;
    let soldItems = [];

    for (let i = 0; i < listedProducts.length; i++) {
      let product = listedProducts[i];
      if (product.buyerId || (new Date() > new Date(product.endsAt) && bids.filter(bid => bid.productId === product.id).length > 0)) {
        soldItems.push(product);
      }
    }

    return soldItems;
  }

  soldListings() {
    let {listedProducts, bids} = this.props;
    let soldItems = this.soldListingItems();

    if (soldItems.length > 0) {
      if (soldItems.length === 1) {
        return <span><i className="fas fa-dollar-sign"></i>
            <a id="Sold">{soldItems.length} item</a> has sold and must be shipped.
          </span>;
      } else {
        return <span><i className="fas fa-dollar-sign"></i>
            <a id="Sold">{soldItems.length} items</a> have sold and must be shipped.
          </span>;
      }
    }
  }

  watchedListingsList() {
    let { listedProducts, productWatches } = this.props;
    let watchedListings = [];

    for (let i = 0; i < listedProducts.length; i++) {
      let product = listedProducts[i];
      if (productWatches.filter(watch => watch.productId == product.id).length > 0) {
        watchedListings.push(product);
      }
    }

    return watchedListings;
  }

  watchedListingsIndex() {
    if (this.state.currentPage === "Watched Listings") {
      return this.itemIndex(this.watchedListingsList(), "Watched Listings");
    }
  }

  watchedListings() {
    let watchedListings = this.watchedListingsList();

    if (watchedListings.length > 0) {
      if (watchedListings.length === 1) {
        return <span><i className="far fa-eye"></i>
            <a id="Watched Listings">{watchedListings.length} item</a> I'm selling is being watched.
          </span>;
      } else {
        return <span><i className="far fa-eye"></i>
            <a id="Watched Listings">{watchedListings.length} items</a> I'm selling are being watched.
          </span>;
      }
    }
  }

  sellingReminders() {
    if (this.state.currentPage === 'Summary') {
      let listingsEndingSoon = this.listingsEndingSoon();
      let soldListings = this.soldListings();
      let watchedListings = this.watchedListings();
  
      let noReminders;
      !listingsEndingSoon && !soldListings && !watchedListings ? (noReminders = "There are currently no selling reminders to display.") : (noReminders = null);
  
      return (
        <div className="mygarage-section">
          <h1 className="section-header">Selling Reminders</h1>
          <div className="section-content">
            <div className="last-31">(Last 31 days)</div>
            <ul>
              <div className="section-item" onClick={this.setCurrentPage}>{listingsEndingSoon}</div>
              <div className="section-item" onClick={this.setCurrentPage}>{soldListings}</div>
              <div className="section-item" onClick={this.setCurrentPage}>{watchedListings}</div>
              <div className="section-item" onClick={this.setCurrentPage}>{noReminders}</div>
            </ul>
          </div>
        </div>
      );
    }
  }

  watchedItemIndex() {
    if (this.state.currentPage === 'Summary' || this.state.currentPage === 'Watch') {
      return this.itemIndex(this.props.watchedProducts, 'Watching');
    }
  }

  allBuyingList() {
    let products = this.props.biddedProducts;
    for (let i = 0; i < this.props.purchasedProducts.length; i++) {
      if (!products.includes(this.props.purchasedProducts[i])) products.push(this.props.purchasedProducts[i]);
    }

    return products;
  }

  allBuying() {
    if (this.state.currentPage === 'All Buying') {
      return this.itemIndex(this.allBuyingList(), 'All Buying');
    }
  }

  allSelling() {
    if (this.state.currentPage === 'All Selling') {
      return this.itemIndex(this.props.listedProducts, 'All Selling');
    }
  }

  activeBuying() {
    if (this.state.currentPage === 'Active Buying') {
      return this.itemIndex(this.activeBuyingItems(), 'Active Buying');
    }
  }

  activeSelling() {
    if (this.state.currentPage === "Active Selling") {
      return this.itemIndex(this.activeSellingItems(), "Active Selling");
    }
  }

  won() {
    if (this.state.currentPage === "Won") {
      return this.itemIndex(this.purchasedProductsList(), "Won");
    }
  }

  sold() {
    if (this.state.currentPage === "Sold") {
      return this.itemIndex(this.soldListingItems(), "Sold");
    }
  }

  unsold() {
    if (this.state.currentPage === "Unsold") {
      return this.itemIndex(this.didntSellList(), "Unsold");
    }
  }

  didntWin() {
    if (this.state.currentPage === "Didn't Win") {
      return this.itemIndex(this.lostAuctionList(), "Didn't Win");
    }
  }

  lostAuctionList() {
    let lostAuctions = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let product = this.props.biddedProducts[i];
      let timeString = TimeUtil.timeStrings(product);
      if (timeString !== "Ended") continue;

      let bids = this.props.bids
        .filter(bid => bid.productId == product.id)
        .sort(bid => bid.bid);

      if (bids[0].buyerId != this.props.currentUserId) lostAuctions.push(product);
    }

    return lostAuctions;
  }

  didntSellList() {
    let didntSell = [];

    for (let i = 0; i < this.props.listedProducts.length; i++) {
      let product = this.props.listedProducts[i];
      let timeString = TimeUtil.timeStrings(product);
      if (timeString !== "Ended") continue;

      let bids = this.props.bids.filter(bid => bid.productId == product.id)

      if (bids.length === 0 && !product.buyerId) didntSell.push(product);
    }

    return didntSell;
  }

  itemIndex(products, title) {
    const { bids } = this.props;
    const { shippingPolicies } = this.props;

    let indexItems = [];

    for (let i = 0; i < products.length; i++) {
      let product = products[i];

      let productBids = bids
        .filter(bid => bid.productId === product.id)
        .map(bid => bid.bid);
      let shippingPolicy = shippingPolicies[product.shippingPolicyId];

      indexItems.push(<ProductListItem key={i} shippingPolicy={shippingPolicy} bids={productBids} product={product} />);
    }

    let noWatches;

    indexItems.length == 0 ? noWatches = "There are currently no items in this list." : noWatches = null;

    return (
      <div className="mygarage-section">
        <h1 className="section-header">{title} ( {indexItems.length} )</h1>
        <div className="product-index-container">
          <ul>
            {indexItems.map(product => product)}
          </ul>
          <div className="section-item">{noWatches}</div>
        </div>
      </div>
    );
  }

  activeBuyingItems() {
    let {biddedProducts} = this.props;
    return biddedProducts.filter(product => (new Date() < new Date(product.endsAt) && !product.buyerId));
  }

  activeSellingItems() {
    let {listedProducts} = this.props;
    return listedProducts.filter(product => (new Date() < new Date(product.endsAt) && !product.buyerId));
  }

  buy() {
    return (
      <div className="nav-section buy-section">
        <h1>Buy</h1>
        <ul>
          <li id="All Buying" onClick={this.setCurrentPage}>All Buying ( {this.allBuyingList().length} )</li>
          <li id="Watch" onClick={this.setCurrentPage}>Watch ( {this.props.watchedProducts.length} )</li>
          <li id="Active Buying" onClick={this.setCurrentPage}>Active ( {this.activeBuyingItems().length} )</li>
          <li id="Won" onClick={this.setCurrentPage}>Won ( {this.purchasedProductsList().length} )</li>
          <li id="Didn't Win" onClick={this.setCurrentPage}>Didn't Win ( {this.lostAuctionList().length} )</li>
        </ul>
      </div>
    );
  }

  sell() {
    return (
      <div className="nav-section sell-section">
        <h1>Sell</h1>
        <ul>
          <li id="All Selling" onClick={this.setCurrentPage}>All Selling ( {this.props.listedProducts.length} )</li>
          <li id="Active Selling" onClick={this.setCurrentPage}>Active ( {this.activeSellingItems().length} )</li>
          <li id="Sold" onClick={this.setCurrentPage}>Sold ( {this.soldListingItems().length} )</li>
          <li id="Unsold" onClick={this.setCurrentPage}>Unsold ( {this.didntSellList().length} )</li>
        </ul>
      </div>
    );
  }

  nav() {
    return (
      <div className="mygarage-nav">
        <h1 id="Summary" onClick={this.setCurrentPage}>Summary</h1>
        <ul>
          {this.buy()}
          {this.sell()}
        </ul>
      </div>
    );
  }

  setCurrentPage(event) {
    event.preventDefault();
    this.setState({currentPage: event.target.id});
  }

  render() {
    return (
      <div className="mygarage-container">
        {this.header()}
        <main>
          {this.nav()}
          <section>
            {this.buyingReminders()}
            {this.sellingReminders()}
            {this.watchedItemIndex()}
            {this.allBuying()}
            {this.activeBuying()}
            {this.won()}
            {this.didntWin()}
            {this.allSelling()}
            {this.activeSelling()}
            {this.sold()}
            {this.unsold()}
            {this.bidsEndingSoonIndex()}
            {this.outbidItemsIndex()}
            {this.watchedListingsIndex()}
            {this.listingsEndingSoonIndex()}
          </section>
        </main>
      </div>
    );
  }
}