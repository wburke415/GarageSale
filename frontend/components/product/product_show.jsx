import React from 'react';
import { Link } from 'react-router-dom';

import ProductShowImages from './product_show_components/images';
import sellerInfo from './product_show_components/seller_info';
import * as timeUtils from '../../utils/time_util';

export default class ProductShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bid: "",
            selectedTab: "Description",
            errors: ""
        };

        this.submitBid = this.submitBid.bind(this);
        this.switchTabs = this.switchTabs.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
    }
    
    componentDidMount() {
        if (!this.props.product) {
            this.props.fetchProduct(this.props.match.params.id);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetchProduct(nextProps.match.params.id);
        }
    }

    handlePurchase(event) {
        event.preventDefault();
        if (!this.props.currentUser) {
            this.props.history.push('/login');
        } 
        else if (this.props.currentUser === this.props.product.sellerId) {
            this.setState({errors: "You can't purchase your own product."});
        }
        else {
            let { product } = this.props;
            product.sold = true;
            product.buyerId = this.props.currentUser;
    
            this.props.buyProduct(product);
        }
    }
    
    binPrice() {
        let error;

        if (this.state.errors === "You can't purchase your own product.") error = <div className="bin-error">{this.state.errors}</div>;

        if (this.props.product.binPrice) {
            return (
                <div className="product-price">
                    <p>Price:</p>
                    <span>US ${this.props.product.binPrice}</span>
                    <div className="auction-buttons">
                        <button onClick={this.handlePurchase} className="price-button">Buy It Now</button>
                        {error}
                        <div></div>
                        <button className="price-button">Add to cart</button>
                        <div></div>
                        <button className="watch-list-button">Add to watch list</button>
                        <div></div>
                    </div>
                </div>
            );
        }
    }
    
    changeBid() {
        return e => this.setState({bid: e.target.value});
    }

    submitBid(event) {
        event.preventDefault();
        if (!this.props.currentUser) {
            this.props.history.push('/login');
        }
        else if (this.props.currentUser === this.props.product.sellerId) {
            this.setState({errors: "You can't bid on your own product."});
        }
        else {
            const bid = { product_id: this.props.product.id, buyer_id: this.props.currentUser, bid: this.state.bid };
            this.props.createBid(bid);
            this.setState({bid: ""});
        }
    } 
    
    auctionPrice() {
        let bid = this.props.product.startingPrice;
        if (Object.keys(this.props.bids).length !== 0 && this.props.bids[this.props.product.bidIds.slice(-1)[0]]) {
            bid = this.props.bids[this.props.product.bidIds.slice(-1)[0]].bid || this.props.product.startingPrice;
        }
        const highestBid = bid.toFixed(2);

        let error;

        if (this.state.errors === "You can't bid on your own product.") error = this.state.errors;

        
        
        if (this.props.product.auction) {
            return (
                <div className="product-price auction-field">
                    <div className="auction-bid-container">
                        <div className="current-bid">
                            <p>Starting bid:</p>
                            <span>US ${highestBid}</span>
                        </div>
                        <input onChange={this.changeBid()} value={this.state.bid}/>
                        <p className="highest-bid">Enter US ${highestBid} or more</p>
                    </div>

                    <div className="auction-buttons">
                        <div className="bid-count"><p>[</p><a href="/placeholder">{this.props.product.bidIds.length} bids</a><p>]</p></div>
                        <button onClick={this.submitBid} className="price-button">Place bid</button>
                        <div></div>
                        <div className="bid-error">{error}</div>
                    </div>
                </div>
            );
        }
    }

    auctionBinDivider() {
        if (this.props.product.binPrice) return <div className="auction-bin-divider"></div>
    }

    policies() {
        const {shippingPolicy, location} = this.props;
        let currentDate = new Date();
        let deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 5)).toUTCString();
        let deliveryString = deliveryDate.slice(0, 3) + ". " + deliveryDate.slice(8, 11) + ". " + deliveryDate.slice(5, 7);

        return (
            <div className="product-show-policies">
                <span className="product-show-shipping-policy">
                    <div className="shipping-service">
                        <p className="product-show-policy-label">Shipping:</p> 
                        <span>${shippingPolicy.shippingCost.toFixed(2)}</span> 
                        <div>{shippingPolicy.service} | <a href='/placeholder'>See details</a></div>
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
                    <span>Seller does not accept returns | <a href='/placeholder'>See details</a></span>
                </div>
            </div>
        );
    }

    switchTabs(event) {
        this.setState({selectedTab: event.target.textContent});
    }

    lowerPageTabs() {
        let descriptionClass;
        let shippingClass;

        this.state.selectedTab === "Description" ? descriptionClass = "lower-show-tab selected" : descriptionClass = "lower-show-tab";
        this.state.selectedTab !== "Description" ? shippingClass = "lower-show-tab selected" : shippingClass = "lower-show-tab";
        return (
            <div className="lower-show-tabs-container">
                <div onClick={this.switchTabs} className={descriptionClass}>Description</div>
                <div onClick={this.switchTabs} className={shippingClass}>Shipping and payments</div>
                <div className="tab-spacer"></div>
            </div>
        );
    }

    itemSoldBanner() {
        let soldMessage;

        this.props.product.sold ? soldMessage = 'This listing has ended.' : '';

        if (this.props.product.sold) {
            return (
                <div className="item-sold-banner-active">{soldMessage}</div>
            );
        }

        return <div className="item-sold-banner">{soldMessage}</div>;
    }
    
    render() {
        if (!this.props.product) {return null;}
        let timeStrings = timeUtils.timeStrings(this.props.product);

        return (
            <div className="product-show-page">
                {this.itemSoldBanner()}
                <div className="upper-show-page">
                    <ProductShowImages productImages={this.props.productImages}/>
                    <div className="show-page-content">
                        <h1 className="product-show-title">{this.props.product.title}</h1>
                        <h2 className="product-show-subtitle">{this.props.product.subtitle}</h2>
                        <div className="product-condition"><p>Condition:</p> <span>{this.props.product.condition}</span></div>
                        <div className="condition-description"><p>“</p><span>{this.props.product.conditionDescription}</span><p>”</p></div>
                        
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