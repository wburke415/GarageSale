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
      return (
        <a>
          {endingSoon.length} products you bid on are ending soon.
        </a>
      );
    }
  }

  outbidItems() {
    let outBid = [];

    for (let i = 0; i < this.props.biddedProducts.length; i++) {
      let product = this.props.biddedProducts[i];
      if (product.bidIds.slice(-1)[0].buyerId !== parseInt(this.props.currentUserId)) outBid.push(product);
      // make sure this is working correctly
    }

    if (outBid.length > 0) {
      return <a>
          I've been outbid on {outBid.length} products.
        </a>;
    }
  }

  buyingReminders() {
    

    return (
      <div className="mygarage-section">
        <h1 className="section-header">Buying Reminders</h1>
        <div className="section-content">
          <div>(Last 31 days)</div>
          <span>
            {this.bidsEndingSoon()}
          </span>
          <span>
            {this.outbidItems()}
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>My Garage</h1>
        {this.buyingReminders()}
      </div>
    );
  }
}