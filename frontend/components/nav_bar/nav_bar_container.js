import { connect } from 'react-redux';

import NavBar from './nav_bar';

const mapStateToProps = state => ({
    user: state.entities.users[state.session.id]
});

export default connect(mapStateToProps, null)(NavBar);