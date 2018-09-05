import { connect } from 'react-redux';

import NavBar from './nav_bar';
import { logout } from '../../actions/session_actions';
import { fetchProductTitles } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => {
  let searchResults;
  if (state.entities.searchResults) {
    searchResults = Object.values(state.entities.searchResults)
  } else {
    searchResults = []
  }
  
  return ({
    user: state.entities.users[state.session.id],
    searchResults
  });
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchProductTitles: search => dispatch(fetchProductTitles(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);