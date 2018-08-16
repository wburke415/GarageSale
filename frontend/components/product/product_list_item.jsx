import React from 'react';
import * as timeUtils from '../../utils/time_util';

export default class ProductListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class: ""
        };

        this.myImg = React.createRef();
    }

    componentDidMount() {
        const width = this.myImg.current.offsetWidth;
        const height = this.myImg.current.offsetHeight;

        if (width > height) {
            this.setState({class: "landscape"})
        }
        else {
            this.setState({class: "portrait"})
        }
    }

    auctionPrice() {
        const { product } = this.props;
        const { bids } = this.props;

        if (product.startingPrice) {
            return (
                <div className="list-item-auction-price">
                    <span>${product.startingPrice}</span>
                    <div>{bids.length} bids</div>
                </div>
            );
        }
    }

    binPrice() {
        const { product } = this.props;
        if (product.binPrice) {
            return (
                <div className="list-item-bin-price">
                    <span>${product.binPrice}</span>
                    <div>Buy It Now</div>
                </div>
            );
        }
    }

    shipping () {
        const { shippingPolicy } = this.props;

        return (
            <div className="list-item-shipping">
                <span>+ ${shippingPolicy.shippingCost.toFixed(2)} shipping</span>
            </div>
        );
    }

    subtitle() {
        let {product} = this.props;
        if (product.subtitle) return <h2>{product.subtitle}</h2>;
    }

    render() {
        const { product } = this.props;
        const { image } = this.props;

        const timeStrings = timeUtils.timeStrings(product);
    
        return (
            <li className="product-list-item">
                <div className="image-container">
                    <a ref={this.myImg} href={`/#/products/${product.id}`}><img className={this.state.class} src={image.imageUrl} /></a>
                </div>

                <div className="list-item-content">
                    <a href={`/#/products/${product.id}`}><h1>{product.title}</h1></a>
                    {this.subtitle()}
                    <h2>{product.condition}</h2>

                    <div className="list-item-details">
                        <div className="list-item-price">
                            {this.auctionPrice()}
                            {this.binPrice()}
                            {this.shipping()}
                        </div>
                        <div className="list-item-end">
                            {timeUtils.timeLeft(timeStrings)}
                            {timeUtils.endTime(product)}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}