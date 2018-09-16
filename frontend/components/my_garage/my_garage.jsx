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
      <div>
        <h1>Buying Reminders</h1>
        <span>
          <a></a>
        </span>
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