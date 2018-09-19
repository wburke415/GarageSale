import { connect } from 'react-redux';

import ProductShow from './product_show';
import { fetchProduct, createBid, updateProduct, createProductWatch, deleteProductWatch } from '../../../actions/product_actions';

const mapStateToProps = (state, ownProps) => {
  const _nullProduct = null;
  const _nullSeller = null;

  let product;
  let seller;
  let bids;
  let shippingPolicy;
  let location;
  let ended;
  let productWatches;

  if (state.entities.products) {
    product = state.entities.products[ownProps.match.params.id] || _nullProduct;

    if (product) {
      seller = state.entities.users[product.sellerId] || _nullSeller;
      bids = Object.values(state.entities.bids).filter(bid => bid.productId === product.id).map(bid => bid.bid);
      shippingPolicy = state.entities.shippingPolicies[product.shippingPolicyId];
      location = state.entities.locations[shippingPolicy.locationId];
      productWatches = Object.values(state.entities.productWatches).filter(watch => watch.productId === product.id)

      if (new Date() >= new Date(product.endsAt) || product.buyerId) ended = true;
    }
  }

  let currentUser = state.session.id;

  return { product, seller, bids, currentUser, shippingPolicy, location, productWatches, ended };
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id)),
    buyProduct: product => dispatch(updateProduct(product)),
    createBid: bid => dispatch(createBid(bid)),
    createProductWatch: productWatch => dispatch(createProductWatch(productWatch)),
    deleteProductWatch: id => dispatch(deleteProductWatch(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);