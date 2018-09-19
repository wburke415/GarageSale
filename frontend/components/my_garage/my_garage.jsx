import React from 'react';

import * as TimeUtil from '../../utils/time_util';
import ProductListItem from '../product/index/product_list_item';
import MyGarageNav from './my_garage_nav';

export default class MyGarage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Summary'
    };
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

  bidsEndingSoon() {
    let endingSoon = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let endTime = TimeUtil.endTime(this.props.biddedProducts[i]);
      if (endTime.props.children.includes('Today') && TimeUtil.timeStrings(this.props.biddedProducts[i]) !== 'Ended') endingSoon.push(this.props.biddedProducts[i]);
    }

    if (endingSoon.length > 0) {
      if (endingSoon.length === 1) {
        return <span>
            <a href="">{endingSoon.length} item</a> I bid on is ending soon.
          </span>;
      } else {
        return <span>
            <a href="">{endingSoon.length} items</a> I bid on are ending soon.
          </span>;
      }
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
        return <span>
            <a href="">{endingSoon.length} item</a> I'm watching is ending soon.
          </span>;
      } else {
        return <span>
            <a href="">{endingSoon.length} items</a> I'm watching are ending soon.
          </span>;
      }
    }
  }

  outbidItems() {
    let {biddedProducts, bids, currentUserId} = this.props;

    let outBid = [];

    for (let i = 0; i < biddedProducts.length; i++) {
      let product = biddedProducts[i];
      if (new Date() > new Date(product.endsAt)) continue;
      
      let highestBid = bids.filter(bid => bid.productId == product.id).sort(bid => bid.bid)[0];
      if (highestBid.buyerId != currentUserId) outBid.push(product);
    }

    if (outBid.length > 0) {
      if (outBid.length === 1) {
        return <span>
            I've been outbid on <a href="">{outBid.length} item</a>.
          </span>;
      } else {
        return <span>
            I've been outbid on <a href="">{outBid.length} items</a>.
          </span>;
      }
    }
  }

  wonAuctions() {
    let wonAuctions = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let timeString = TimeUtil.timeStrings(this.props.biddedProducts[i]);
      if (timeString === 'Ended') wonAuctions.push(this.props.biddedProducts[i]);
    } 

    if (wonAuctions.length !== 0) {
      if (wonAuctions.length === 1) {
        return <span>
            You have won <a href="">{wonAuctions.length} auction</a>.
          </span>;
      } else {
        return <span>
            You have won <a href="">{wonAuctions.length} auctions</a>.
          </span>;
      }
    }
  }

  purchasedItems() {
    let wonAuctions = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let timeString = TimeUtil.timeStrings(this.props.biddedProducts[i]);
      if (timeString === 'Ended') wonAuctions.push(this.props.biddedProducts[i]);
    }

    let purchasedProducts = wonAuctions.concat(this.props.purchasedProducts)

    if (purchasedProducts.length !== 0) {
      if (purchasedProducts.length === 1) {
        return <span>
            <a href="">{purchasedProducts.length} item</a> I purchased is awaiting shipment.
          </span>;
      } else {
        return <span>
            <a href="">{purchasedProducts.length} items</a> I purchased are awaiting shipment.
          </span>;
      }
    }
  }

  buyingReminders() {
    if (this.state.currentPage === 'Summary') {
      let bidsEndingSoon = this.bidsEndingSoon()
      let outbidItems = this.outbidItems();
      let wonAuctions = this.wonAuctions();
      let purchasedItems = this.purchasedItems();
      let watchesEndingSoon = this.watchesEndingSoon();

      let noReminders;

      !bidsEndingSoon && !outbidItems && !wonAuctions && !purchasedItems ? noReminders = 'There are currently no buying reminders to display.' : noReminders = null;

      return (
        <div className="mygarage-section">
          <h1 className="section-header">Buying Reminders</h1>
          <div className="section-content">
            <div className="last-31">(Last 31 days)</div>
            <ul>
              <div className="section-item">{bidsEndingSoon}</div>
              <div className="section-item">{outbidItems}</div>
              <div className="section-item">{wonAuctions}</div>
              <div className="section-item">{purchasedItems}</div>
              <div className="section-item">{watchesEndingSoon}</div>
              <div className="section-item">{noReminders}</div>
            </ul>
          </div>
        </div>
      );
    }

  }

  listingsEndingSoon() {
    let endingSoon = [];

    for (let i = 0; i < this.props.listedProducts.length; i++) {
      if (this.props.listedProducts[i].buyerId) continue;
      let endTime = TimeUtil.endTime(this.props.listedProducts[i]);
      if (endTime.props.children.includes("Today")) endingSoon.push(this.props.listedProducts[i]);
    }

    if (endingSoon.length > 0) {
      if (endingSoon.length === 1) {
        return <span>
          <a href="">{endingSoon.length} item</a> I'm selling is ending soon.
          </span>;
      } else {
        return <span>
          <a href="">{endingSoon.length} items</a> I'm selling are ending soon.
          </span>;
      }
    }
  }

  soldListings() {
    let {listedProducts, bids} = this.props;
    let soldListings = [];

    for (let i = 0; i < listedProducts.length; i++) {
      let product = listedProducts[i];
      if (product.buyerId || (new Date() > new Date(product.endsAt) && bids.filter(bid => bid.productId === product.id).length > 0)) {
        soldListings.push(product);
      }
    }

    if (soldListings.length > 0) {
      if (soldListings.length === 1) {
        return <span>
            <a href="">{soldListings.length} item</a> has sold and must be shipped.
          </span>;
      } else {
        return <span>
            <a href="">{soldListings.length} items</a> have sold and must be shipped.
          </span>;
      }
    }
  }

  watchedListings() {
    let {listedProducts, productWatches} = this.props;
    let watchedListings = [];

    for (let i = 0; i < listedProducts.length; i++) {
      let product = listedProducts[i];
      if (productWatches.filter(watch => watch.productId == product.id).length > 0) {
        watchedListings.push(product);
      }
    }

    if (watchedListings.length > 0) {
      if (watchedListings.length === 1) {
        return <span>
            <a href="">{watchedListings.length} item</a> I'm selling is being watched.
          </span>;
      } else {
        return <span>
            <a href="">{watchedListings.length} items</a> I'm selling are being watched.
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
      !listingsEndingSoon ? (noReminders = "There are currently no selling reminders to display.") : (noReminders = null);
  
      return (
        <div className="mygarage-section">
          <h1 className="section-header">Selling Reminders</h1>
          <div className="section-content">
            <div className="last-31">(Last 31 days)</div>
            <ul>
              <div className="section-item">{listingsEndingSoon}</div>
              <div className="section-item">{soldListings}</div>
              <div className="section-item">{watchedListings}</div>
              <div className="section-item">{noReminders}</div>
            </ul>
          </div>
        </div>
      );
    }
  }

  watchedItemIndex() {
    const { watchedProducts } = this.props;
    const { bids } = this.props;
    const { shippingPolicies } = this.props;

    let indexItems = [];

    for (let i = 0; i < watchedProducts.length; i++) {
      let product = watchedProducts[i];

      let productBids = bids
        .filter(bid => bid.productId === product.id)
        .map(bid => bid.bid);
      let shippingPolicy = shippingPolicies[product.shippingPolicyId];

      indexItems.push(<ProductListItem key={i} shippingPolicy={shippingPolicy} bids={productBids} product={product} />);
    }

    let noWatches;

    indexItems.length == 0 ? noWatches = "You aren't currently watching any items." : noWatches = null;

    return (
      <div className="mygarage-section">
        <h1 className="section-header">Watching ( {indexItems.length} )</h1>
        <div className="product-index-container">
          <ul>
            {indexItems.map(product => product)}
          </ul>
          <div className="section-item">{noWatches}</div>
        </div>
      </div>
    );
  }

  buy() {
    return (
      <div className="nav-section buy-section">
        <h1>Buy</h1>
        <ul>
          <li>All Buying</li>
          <li>Watch</li>
          <li>Active</li>
          <li>Won</li>
          <li>Didn't Win</li>
        </ul>
      </div>
    );
  }

  sell() {
    return (
      <div className="nav-section sell-section">
        <h1>Sell</h1>
        <ul>
          <li>All Selling</li>
          <li>Active</li>
          <li>Sold</li>
          <li>Unsold</li>
        </ul>
      </div>
    );
  }

  nav() {
    return (
      <div className="mygarage-nav">
        <h1>Summary</h1>
        <ul>
          {this.buy()}
          {this.sell()}
        </ul>
      </div>
    );
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
          </section>
        </main>
      </div>
    );
  }
}