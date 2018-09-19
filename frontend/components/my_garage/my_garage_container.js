import {connect} from 'react-redux';

import {fetchProducts} from '../../actions/product_actions';
import {fetchUser} from '../../actions/user_actions';
import MyGarage from './my_garage';

const mapStateToProps = (state, ownProps) => {
  let biddedProducts = [];

  for (let i = 0; i < state.entities.users[state.session.id].biddedProducts.length; i++) {
    let productId = state.entities.users[state.session.id].biddedProducts[i];
    if (state.entities.products[productId]) biddedProducts.push(state.entities.products[productId]);
  }

  let watchedProducts = [];

  for (let i = 0; i < state.entities.users[state.session.id].watchedProducts.length; i++) {
    let productId = state.entities.users[state.session.id].watchedProducts[i];
    if (state.entities.products[productId]) watchedProducts.push(state.entities.products[productId]);
  }

  let bids = Object.values(state.entities.bids);
  let shippingPolicies = state.entities.shippingPolicies;
  let productWatches = Object.values(state.entities.productWatches);

  return ({
    listedProducts: Object.values(state.entities.products).filter(product => product.sellerId == state.session.id),
    purchasedProducts: Object.values(state.entities.products).filter(product => product.buyerId == state.session.id),
    watchedProducts,
    biddedProducts,
    bids,
    productWatches,
    shippingPolicies,
    currentUserId: state.session.id,
    currentUser: state.entities.users[state.session.id]
  });
};

const mapDispatchToProps = dispatch => ({
  fetchProducts: search => dispatch(fetchProducts(search)),
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGarage);