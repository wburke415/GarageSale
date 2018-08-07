import { connect } from 'react-redux';

import { login } from '../../actions/session_actions';
import SigninForm from './signin_form';

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(null, mapDispatchToProps)(SigninForm);
