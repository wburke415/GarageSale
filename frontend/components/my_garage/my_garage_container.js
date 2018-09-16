import {connect} from 'react-redux';

import {fetchProducts} from '../../actions/product_actions';
import {fetchUser} from '../../actions/user_actions';
import MyGarage from './my_garage';

const mapStateToProps = (state, ownProps) => ({
  // listedProducts: Object.values(state.entities.products).filter(product => product.sellerId === state.session.id),
  // purchasedProducts: Object.values(state.entities.products).filter(product => product.buyerId === state.session.id),
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: search => dispatch(fetchProducts(search)),
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGarage);