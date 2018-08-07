import React from 'react';

export default class SigninForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state); // use .then to push onto history
  }

  render() {
    return (
      <div className="signin-form">
        <h1>Sign in</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Email or username"
            value={this.state.email}
            onChange={this.handleInput('emailOrUsername')} />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInput('password')} />

          <input
            type="submit"
            value="Sign in" />

        </form>
      </div>
    );
  }
}
