import { connect } from 'react-redux';

import { createUser, removeSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
  userInfo: {
    firstname: "", 
    lastname: "",
    email: "",
    business: false,
    password: "" 
  },
  formType: "Register",
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(createUser(user)),
  removeSessionErrors: () => dispatch(removeSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
