import React from 'react';

export default class MyGarage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUserId);
  }

  header() {

  }

  buyingReminders() {

    return (
      <div className="mygarage-section">
        <h1 className="section-header">Buying Reminders</h1>
        <div className="section-content">
          <div>(Last 31 days)</div>
          <span>
            <a>Placeholder</a>
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