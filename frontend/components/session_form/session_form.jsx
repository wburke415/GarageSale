import React from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.userInfo;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
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
    this.props.action(this.state).then(() => this.props.history.push('/'));
  }

  businessButtons() {
    if(this.props.formType === "Register") {
      return (
        <div className="business-buttons">

          <label htmlFor="personal-button">
            <input
              id="personal-button"
              type="radio"
              value={false}
              checked={this.state.business === false}
              onChange={this.handleOptionChange()} />
          Personal Account</label>

          <label htmlFor="business-button">
            <input
              id="business-button"
              type="radio"
              value={true}
              checked={this.state.business === true}
              onChange={this.handleOptionChange()} />
          Business Account</label>

        </div>
      );
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
              required
              value={this.state.firstname}
              onChange={this.handleInput('firstname')} />

            <input
              id="lastname"
              type="text"
              required
              value={this.state.lastname}
              onChange={this.handleInput('lastname')} />
          </div>
        </div>
      );
    }
  }

  emailOrUsernameInput() {
    if(this.props.formType === "Register") {
      return (
        <div>
          <label htmlFor="email">Email address</label><br />
          <input
            id="email"
            type="text"
            required
            // the below regex code is attributed to Sara Cope in her article at https://css-tricks.com/almanac/selectors/r/required/
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            value={this.state.email}
            onChange={this.handleInput('email')} />
        </div>
      );
    }
    else {
      return (
        <input
          id="email"
          type="text"
          placeholder="Email or username"
          value={this.state.email}
          onChange={this.handleInput('emailOrUsername')} />
      );
    }
  }

  passwordInput() {
    if (this.props.formType === "Register") {
      return (
        <div>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            type="password"
            required
            pattern="^[a-zA-Z]\w{5,14}$"
            value={this.state.password}
            onChange={this.handleInput('password')} />
        </div>
      );
    }
    else {
      return (
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleInput('password')} />
      );
    }
  }

  demoLogin() {
    if (this.props.formType === "Sign in") {
      return (
        <div className="demo-login">
          <button
            id="demo-login-button"
            onClick={this.handleDemoLogin}>Demo Login</button>
        </div>
      );
    }
  }

  handleDemoLogin(event) {
    event.preventDefault();
    let randNum = Math.floor(Math.random() * 30) + 1;
    this.props.action({emailOrUsername: `guest${randNum}`, password: 'password'})
    .then(() => this.props.history.push('/'));
  }

  errors() {
    const { errors } = this.props;

    if (errors && errors.status === 401) {
      return (
        <span className="signin-error">
          <i className="fas fa-exclamation-circle"></i>
          <p>{this.props.errors.responseJSON[0]}</p>
        </span>
      );
    }
  }

  validateForm() {
    const userInfo = this.state;
    if(this.props.formType === "Register") {
      if(userInfo.firstname === "" && userInfo.lastname === "" && userInfo.email === "" && userInfo.password === "") {
        return true;
      }
      else {
        return false;
      }
    }

    return false;
  }

  render() {
    return (
      <div className="session-form-wrapper">
        <Link to="/">
          <img src={window.logo}/>
        </Link>

        <div className="session-form">

          <div className="link-tabs">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </ div>

          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit}>

              {this.businessButtons()}

              {this.nameInputs()}

              {this.errors()}

              {this.emailOrUsernameInput()}

              {this.passwordInput()}

              <input
                id="submit"
                type="submit"
                value={this.props.formType} />

            </form>

          </div>
        </div>
        
          {this.demoLogin()}
      </div>
    );
  }
}
