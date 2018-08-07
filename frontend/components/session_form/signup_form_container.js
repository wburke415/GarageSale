import { connect } from 'react-redux';

import { createUser } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user))
});

export default connect(null, mapDispatchToProps)(SignupForm);
