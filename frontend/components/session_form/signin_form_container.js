import { connect } from 'react-redux';

import { login, removeSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
  userInfo: {emailOrUsername: "", password: ""},
  formType: "Sign in",
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(login(user)),
  removeSessionErrors: () => dispatch(removeSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
