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

  let bids = state.entities.bids;
  let productImages = state.entities.productImages;
  let shippingPolicies = state.entities.shippingPolicies;

  return ({
    listedProducts: Object.values(state.entities.products).filter(product => product.sellerId === state.session.id),
    purchasedProducts: Object.values(state.entities.products).filter(product => product.buyerId === state.session.id),
    biddedProducts,
    bids,
    productImages,
    shippingPolicies,
    currentUserId: state.session.id
  });
};

const mapDispatchToProps = dispatch => ({
  fetchProducts: search => dispatch(fetchProducts(search)),
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGarage);