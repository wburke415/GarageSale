import React from 'react';
import * as timeUtils from '../../../utils/time_util';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  auctionPrice() {
    const { product } = this.props;
    const { bids } = this.props;

    if (product.startingPrice) {
      return (
        <div className="list-item-auction-price">
          <span>${product.startingPrice.toFixed(2)}</span>
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
          <span>${product.binPrice.toFixed(2)}</span>
          <div>Buy It Now</div>
        </div>
      );
    }
  }

  shipping() {
    const { shippingPolicy } = this.props;

    return (
      <div className="list-item-shipping">
        <span>+ ${shippingPolicy.shippingCost.toFixed(2)} shipping</span>
      </div>
    );
  }

  subtitle() {
    let { product } = this.props;
    if (product.subtitle) return <h2>{product.subtitle}</h2>;
  }

  render() {
    const { product } = this.props;
    const { image } = this.props;

    const timeStrings = timeUtils.timeStrings(product);

    return (
      <li className="product-list-item">
        <div className="image-container">
          <a href={`/#/products/${product.id}`}><img className="list-item-image" src={image.imageUrl} /></a>
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