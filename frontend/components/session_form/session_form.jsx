import React from 'react';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.user;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state); // use .then to push onto history
  }

  render() {
    return (
      <div className="session-form">
        <h1>Sign In</h1>

        <form className="signin-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInput('email')} />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInput('password')} />

          <input
            type="submit"
            value="Sign In" />

        </form>
      </div>
    );
  }
}

export default SessionForm;
