import { connect } from 'react-redux';

import { createUser } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
  userInfo: {
    firstname: "", 
    lastname: "",
    email: "",
    business: false,
    password: "" 
  },
  formType: "Register"
});

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(createUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
