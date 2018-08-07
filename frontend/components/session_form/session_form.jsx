import React from 'react';

export default class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.userInfo;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  handleOptionChange() {
    return e => {
      if(e.target.value === "true") {
        this.setState({business: true});
      }
      else {
        this.setState({business: false});
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state).then(this.props.history.push("/")); // use .then to push onto history
  }

  businessButtons() {
    if(this.props.formType === "Register") {
      return (
        <span className="business-buttons">

          <label>
            <input
              id="personal-button"
              type="radio"
              value={false}
              checked={this.state.business === false}
              onChange={this.handleOptionChange()} />
            Personal Account</label>

          <label>
            <input
              id="business-button"
              type="radio"
              value={true}
              checked={this.state.business === true}
              onChange={this.handleOptionChange()} />
            Business Account</label>

        </span>
      );
    }
    else {
      return null;
    }
  }

  nameInputs() {
    if(this.props.formType === "Register") {
      return (
        <div>
          <div className="name-labels">
            <label htmlFor="firstname">First name</label>
            <label htmlFor="lastname">Last name</label>
          </div>

          <div className="name-inputs">
            <input
              id="firstname"
              type="text"
              value={this.state.firstname}
              onChange={this.handleInput('firstname')} />

            <input
              id="lastname"
              type="text"
              value={this.state.lastname}
              onChange={this.handleInput('lastname')} />
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }

  emailOrUsernameInput() {
    if(this.props.formType === "Register") {
      return (
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="text"
            value={this.state.email}
            onChange={this.handleInput('email')} />
        </div>
      );
    }
    else {
      return (
        <input
          type="text"
          placeholder="Email or username"
          value={this.state.email}
          onChange={this.handleInput('emailOrUsername')} />
      );
    }
  }

  render() {
    return (
      <div>
        <form className="session-form" onSubmit={this.handleSubmit}>

          {this.businessButtons()}

          {this.nameInputs()}

          {this.emailOrUsernameInput()}

          <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')} />

          <input
            id="submit"
            type="submit"
            value={this.props.formType} />

        </form>
      </div>
    );
  }
}
