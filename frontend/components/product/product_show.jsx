import React from 'react';
import { Link } from 'react-router-dom';

import ProductShowImages from './product_show_images';

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
    
    sellerInfo() {
        return (
            <div className="seller-info-wrapper">
                <div className="seller-info-box">
                    <div>Seller information</div>
                    <div className="username-container">
                        <div className="product-show-seller-username">{this.props.seller.username}</div>
                        <div className="product-show-seller-feedback"><span>(</span><a>placeholder</a><span>)</span></div>
                    </div>
                    <div className="product-show-feedback-percentage">100% placeholder feedback</div>

                    <a href="/placeholder" className="save-this-seller">
                        <i className="far fa-heart"></i>
                        <div>Save this Seller</div>
                    </a>

                    <a href="/placeholder" className="contact-seller">Contact seller</a>

                    <a href="/placeholder" className="see-other-items">See other items</a>
                </div>
            </div>
        );
    }
    
    timeStrings() {
        let createdAt = new Date(this.props.product.createdAt);
        let currentDate = new Date();
        let endDate = new Date(createdAt.setDate(createdAt.getDate() + this.props.product.duration));

        let timeLeft = new Date(endDate - currentDate);

        let days;
        let hours;
        let minutes;
        let seconds;

        timeLeft.toUTCString().slice(5, 7)[0] === "0" ? days = timeLeft.toUTCString().slice(6, 7) : days = timeLeft.toUTCString().slice(5, 7);
        timeLeft.toUTCString().slice(17, 19)[0] === "0" ? hours = timeLeft.toUTCString().slice(18, 19) : hours = timeLeft.toUTCString().slice(17, 19);
        timeLeft.toUTCString().slice(20, 22)[0] === "0" ? minutes = timeLeft.toUTCString().slice(21, 22) : minutes = timeLeft.toUTCString().slice(20, 22);
        timeLeft.toUTCString().slice(23, 25)[0] === "0" ? seconds = timeLeft.toUTCString().slice(24, 25) : seconds = timeLeft.toUTCString().slice(23, 25);

        return {days, hours, minutes, seconds};
    }

    timeLeft(timeStrings) {
        let keys = Object.keys(timeStrings);
        let timeLeft = [];
        let listItem;

        for (let i = 0; i < keys.length; i++) {
            if (timeStrings[keys[i]] === "0") continue;
            if (timeLeft.length === 2) continue;
            listItem = timeStrings[keys[i]] + keys[i].slice(0,1);
            timeLeft.push(listItem);
        }

        return (
            <ul className="product-show-time-string">
                <li className="product-show-time-left">Time left:</li>
                <li>{timeLeft.join(" ")}</li>
            </ul>
        );
    }

    endTime() {
        let createdAt = new Date(this.props.product.createdAt);
        let currentDate = new Date();
        let endDate = new Date(createdAt.setDate(createdAt.getDate() + this.props.product.duration));

        // Make sure to come back and finish this

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
                    <span>Placeholder does not accept returns | <a href='/placeholder'>See details</a></span>
                </div>
            </div>
        );
    }

    switchTabs(event) {
        debugger;
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
        let timeStrings = this.timeStrings();

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
                            {this.timeLeft(timeStrings)}
                            {this.endTime()}
                        </div>

                        <div className="product-bid-container"> 
                            {this.auctionPrice()}
                            {/* <h1>{this.props.product.startingPrice}</h1> */}
                            {this.binPrice()}
                            <h1>{this.props.product.reservePrice}</h1>
                        </div>

                        {this.policies()}

                        {/* <h1>{this.props.product.quantity}</h1> */}
                    </div>
                    {this.sellerInfo()}
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