import React from 'react';

export default class SigninForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      business: false,
      password: ""
    };

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
    this.props.createUser(this.state); // use .then to push onto history
  }

  render() {
    return (
      <div className="signup-form">
        <h1>Register</h1>

        <span className="business-buttons">
          <label>Personal Account
            <input
              type="radio"
              value={false}
              checked={this.state.business === false}
              onChange={this.handleOptionChange()}/>
          </label>

          <label>Business Account
            <input
              type="radio"
              value={true}
              checked={this.state.business === true}
              onChange={this.handleOptionChange()}/>
          </label>
        </span>

        <form onSubmit={this.handleSubmit}>
          <label>First name
            <input
              type="text"
              value={this.state.firstname}
              onChange={this.handleInput('firstname')} />
          </label>

          <label>Last name
            <input
              type="text"
              value={this.state.lastname}
              onChange={this.handleInput('lastname')} />
          </label>

          <label>Email address
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInput('email')} />
          </label>

          <label>Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')} />
          </label>

          <input
            type="submit"
            value="Register" />

        </form>
      </div>
    );
  }
}
