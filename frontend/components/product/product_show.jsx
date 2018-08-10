import React from 'react';
import { Link } from 'react-router-dom';

import ProductShowImages from './product_show_images';

export default class ProductShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bid: ""
        };

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
    
    binPrice() {
        if (this.props.product.binPrice) {
            return (
                <div className="product-price">
                    <p>Price:</p>
                    <span>US ${this.props.product.binPrice}</span>
                    <div className="auction-buttons">
                        <button className="price-button">Buy It Now</button>
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
    
    auctionPrice() {
        const highestBid = this.props.bids[this.props.product.bidIds.slice(-1)[0]].bid || this.props.product.startingPrice;
        // debugger;
        
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
                        <button className="price-button">Place bid</button>
                        <div></div>
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
                        <i class="far fa-heart"></i>
                        <div>Save this Seller</div>
                    </a>
                </div>
            </div>
        );
    }
    
    timeLeft() {
        const timeLeft = new Date() - new Date(this.props.product.createdAt);
    }
    
    render() {
        if (!this.props.product) {return null;}
        return (
            <div className="product-show-page">
                <ProductShowImages productImages={this.props.productImages}/>
                <div className="show-page-content">
                    <h1 className="product-show-title">{this.props.product.title}</h1>
                    <h2 className="product-show-subtitle">{this.props.product.subtitle}</h2>
                    {/* <h1>{this.props.product.sku}</h1> */}
                    <div className="product-condition"><p>Condition:</p> <span>{this.props.product.condition}</span></div>
                    <div className="condition-description"><p>“</p><span>{this.props.product.conditionDescription}</span><p>”</p></div>
                    {this.timeLeft()}

                    <div className="product-bid-container"> 
                        {this.auctionPrice()}
                        {/* <h1>{this.props.product.startingPrice}</h1> */}
                        {this.binPrice()}
                        <h1>{this.props.product.reservePrice}</h1>
                    </div>

                    {/* <h1>{this.props.product.quantity}</h1> */}
                </div>
                    {this.sellerInfo()}
            </div>
        );
    }
}