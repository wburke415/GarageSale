import React from 'react';

import * as TimeUtil from '../../utils/time_util';

export default class MyGarage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUserId);
  }

  header() {

  }

  bidsEndingSoon() {
    let endingSoon = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let endTime = TimeUtil.endTime(this.props.biddedProducts[i]);
      if (endTime.props.children.includes('Today')) endingSoon.push(this.props.biddedProducts[i]);
    }

    if (endingSoon.length > 0) {
      if (endingSoon.length === 1) {
        return (
          <a>
            {endingSoon.length} product I bid on is ending soon.
          </a>
        );
      } else {
        return (
          <a>
            {endingSoon.length} products I bid on are ending soon.
          </a>
        );
      }
    }
  }

  outbidItems() {
    let outBid = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let product = this.props.biddedProducts[i];
      if (this.props.bids[product.bidIds[0]].buyerId !== parseInt(this.props.currentUserId)) outBid.push(product);
    }

    if (outBid.length > 0) {
      if (outBid.length === 1) {
        return (
          <a>
            I've been outbid on {outBid.length} product.
          </a>
        );
      } else {
        return (
          <a>
            I've been outbid on {outBid.length} products.
          </a>
        );
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
        return (
          <a>
            You have won {wonAuctions.length} auction.
          </a>
        );
      } else {
        return (
          <a>
            You have won {wonAuctions.length} auctions.
          </a>
        );
      }
    }
  }

  purchasedItems() {
    if (this.props.purchasedProducts.length !== 0) {
      if (this.props.purchasedProducts.length === 1) {
        return (
          <a>
            {this.props.purchasedProducts.length} item I purchased is awaiting shipment.
          </a>
        );
      } else {
        return (
          <a>
            {this.props.purchasedProducts.length} items I purchased are awaiting shipment.
          </a>
        );
      }
    }
  }

  buyingReminders() {
    return (
      <div className="mygarage-section">
        <h1 className="section-header">Buying Reminders</h1>
        <div className="section-content">
          <div>(Last 31 days)</div>
          <ul>
            <div>
              {this.bidsEndingSoon()}
            </div>
            <div>
              {this.outbidItems()}
            </div>
            <div>
              {this.wonAuctions()}
            </div>
            <div>
              {this.purchasedItems()}
            </div>
          </ul>
        </div>
      </div>
    );
  }

  sellingReminders() {
    
  }

  render() {
    return (
      <div>
        <h1>My Garage</h1>
        {this.buyingReminders()}
        {this.sellingReminders()}
      </div>
    );
  }
}