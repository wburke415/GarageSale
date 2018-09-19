import React from 'react';
import { Link } from 'react-router-dom';

import ProductShowImages from './images';
import sellerInfo from './seller_info';
import * as timeUtils from '../../../utils/time_util';

export default class ProductShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: "",
      selectedTab: "Description",
      errors: "",
    };

    this.submitBid = this.submitBid.bind(this);
    this.watchProduct = this.watchProduct.bind(this);
    this.unwatchProduct = this.unwatchProduct.bind(this);
    this.switchTabs = this.switchTabs.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }
    
  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.product || !this.props.product[this.props.match.params.id]) {
      this.props.fetchProduct(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0);
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.fetchProduct(nextProps.match.params.id);
    }
  }

  handlePurchase(event) {
    event.preventDefault();
    if (!this.props.currentUser) {
      this.props.history.push('/login');
    }
    else if (this.props.currentUser == this.props.product.sellerId) {
      this.setState({ errors: "You can't purchase your own product." });
    }
    else {
      let { product } = this.props;
      product.buyerId = this.props.currentUser;

      this.props.buyProduct(product);
    }
  }
    
  binPrice() {
    let error;
    if (!this.props.ended) {
      if (this.state.errors === "You can't purchase your own product.") error = <div className="bin-error">{this.state.errors}</div>;

      if (this.props.product.binPrice) {
        return (
          <div className="product-price">
            <p>Price:</p>
            <span>US ${this.props.product.binPrice.toFixed(2)}</span>
            <div className="auction-buttons">
              <button onClick={this.handlePurchase} className="price-button">Buy It Now</button>
              {error}
              {/* <div></div>
                <button className="price-button">Add to cart</button> */}
              <div></div>
              {this.watchButton()}
              <div></div>
            </div>
          </div>
        );
      }
    }
  }

  watchButton() {
    let productWatch = this.props.productWatches.filter(watch => watch.watcherId == this.props.currentUser);
    if (productWatch.length === 0) {
      return <button className="watch-list-button" onClick={this.watchProduct}>Add to watch list</button>;
    } else {
      return <button id={productWatch[0].id} className="watch-list-button" onClick={this.unwatchProduct}>Remove from watch list</button>;
    }
  } 

  watchProduct(event) {
    event.preventDefault();
    let productWatch = {productId: this.props.product.id, watcherId: this.props.currentUser}
    this.props.createProductWatch(productWatch);
  }

  unwatchProduct(event) {
    event.preventDefault();
    this.props.deleteProductWatch(event.target.id);
  }
    
  changeBid() {
    return e => this.setState({ bid: e.target.value });
  }

  submitBid(event) {
    event.preventDefault();

    let prevBid = this.props.product.startingPrice;

    if (prevBid && this.props.bids.length !== 0) {
      prevBid = Math.max(...this.props.bids) || this.props.product.startingPrice;
    }

    const highestBid = prevBid.toFixed(2);

    if (!this.props.currentUser) {
      this.props.history.push('/login');
    }
    else if (this.props.currentUser == this.props.product.sellerId) {
      this.setState({ errors: "You can't bid on your own product." });
    }
    else if (parseFloat(this.state.bid) < parseFloat(highestBid)) {
      this.setState({ errors: 'Your bid must be greater than the previous bid.' });
    }
    else {
      const bid = { product_id: this.props.product.id, buyer_id: this.props.currentUser, bid: this.state.bid };
      this.props.createBid(bid);
      this.setState({ bid: "", errors: "" });
    }
  } 
    
  auctionPrice() {

    if (!this.props.ended) {
      if (this.props.product.auction) {
        let bid = this.props.product.startingPrice;

        if (this.props.bids.length !== 0) {
          bid = Math.max(...this.props.bids) || this.props.product.startingPrice;
        }
        const highestBid = bid.toFixed(2);

        let error;

        if (this.state.errors === "You can't bid on your own product." || this.state.errors === 'Your bid must be greater than the previous bid.') error = this.state.errors;

        return (
          <div className="product-price auction-field">
            <div className="auction-bid-container">
              <div className="current-bid">
                <p>Current bid:</p>
                <span>US ${highestBid}</span>
              </div>
              <input onChange={this.changeBid()} value={this.state.bid} />
              <p className="highest-bid">Enter US ${highestBid} or more</p>
            </div>

            <div className="auction-buttons">
              <div className="bid-count"><p>[</p><a>{this.props.bids.length} bids</a><p>]</p></div>
              <button onClick={this.submitBid} className="price-button">Place bid</button>
              <div></div>
              <div className="bid-error">{error}</div>
            </div>
          </div>
        );
      }
    }
  }

  auctionBinDivider() {
    if (this.props.product.binPrice) return <div className="auction-bin-divider"></div>;
  }

  policies() {
    const { shippingPolicy, location } = this.props;
    let currentDate = new Date();
    let deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 5)).toUTCString();
    let deliveryString = deliveryDate.slice(0, 3) + ". " + deliveryDate.slice(8, 11) + ". " + deliveryDate.slice(5, 7);

    return (
      <div className="product-show-policies">
        <span className="product-show-shipping-policy">
          <div className="shipping-service">
            <p className="product-show-policy-label">Shipping:</p>
            <span>${shippingPolicy.shippingCost.toFixed(2)}</span>
            <div>{shippingPolicy.service} | <a>See details</a></div>
          </div>
          <div className="item-location">Item location: {location.city}, {location.state}, {location.country}</div>
          <div className="ships-to">Ships to: United States</div>
        </span>

        <div className="delivery-estimate">
          <p className="product-show-policy-label">Delivery:</p>
          <span>Estimated on or before <p className="delivery-string">{deliveryString}</p></span>
        </div>

        <div className="return-policy">
          <p className="product-show-policy-label">Returns:</p>
          <span>Seller does not accept returns | <a>See details</a></span>
        </div>
      </div>
    );
  }

  switchTabs(event) {
    this.setState({ selectedTab: event.target.textContent });
  }

  lowerPageTabs() {
    let descriptionClass;
    let shippingClass;

    this.state.selectedTab === "Description" ? descriptionClass = "lower-show-tab selected" : descriptionClass = "lower-show-tab";
    this.state.selectedTab !== "Description" ? shippingClass = "lower-show-tab selected" : shippingClass = "lower-show-tab";
    return (
      <div className="lower-show-tabs-container">
        <div onClick={this.switchTabs} className={descriptionClass}>Description</div>
        {/* <div onClick={this.switchTabs} className={shippingClass}>Shipping and payments</div> */}
        <div className="tab-spacer"></div>
      </div>
    );
  }

  itemSoldBanner() {
    let soldMessage;
    this.props.ended ? soldMessage = 'This listing has ended.' : '';
    if (this.props.ended) return <div className="item-sold-banner-active">{soldMessage}</div>;
    return <div className="item-sold-banner">{soldMessage}</div>;
  }

  conditionDescription() {
    if (this.props.product.conditionDescription) return <div className="condition-description"><p>“</p><span>{this.props.product.conditionDescription}</span><p>”</p></div>;
  }
    
  render() {
    if (!this.props.product) { return null; }
    let timeStrings = timeUtils.timeStrings(this.props.product);

    return (
      <div className="product-show-page">
        {this.itemSoldBanner()}
        <div className="upper-show-page">
          <ProductShowImages history={this.props.history} productImages={this.props.product.productImages} />
          <div className="show-page-content-container">
            <h1 className="product-show-title">{this.props.product.title}</h1>
            <h2 className="product-show-subtitle">{this.props.product.subtitle}</h2>
            <div className="content-seller-info-container">
              <div className="show-page-content">
                <div className="product-condition"><p>Condition:</p> <span>{this.props.product.condition}</span></div>
                {this.conditionDescription()}

                <div className="time-left">
                  {timeUtils.timeLeft(timeStrings)}
                  {timeUtils.endTime(this.props.product)}
                </div>

                <div className="product-bid-container">
                  {this.auctionPrice()}
                  {this.auctionBinDivider()}
                  {this.binPrice()}
                </div>

                {this.policies()}

              </div>
              {sellerInfo(this.props.seller)}
            </div>
          </div>
        </div>

        <div className="lower-show-page-container">

          {this.lowerPageTabs()}

          <div className="lower-show-content">
            <div className="lower-show-description">
              {this.props.product.description}
            </div>
          </div>

        </div>
      </div>
    );
  }
}