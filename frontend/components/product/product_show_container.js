import { connect } from 'react-redux';

import ProductShow from './product_show';
import { fetchProduct, createBid } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => {
    const _nullProduct = null;
    const _nullSeller = null;
    let product;
    let seller;
    let bids;
    let shippingPolicy;
    let location;

    if (state.entities.products) {
        product = state.entities.products[ownProps.match.params.id] || _nullProduct;

        if (product) {
            seller = state.entities.users[product.sellerId] || _nullSeller;
            bids = state.entities.bids;
            shippingPolicy = state.entities.shippingPolicies[product.shippingPolicyId];
            location = state.entities.locations[shippingPolicy.locationId];
        }
    }

    const _nullProductImage = null;
    let productImages;
    if (product && state.entities.productImages) {
        productImages = product.productImageIds.map(id => state.entities.productImages[id]) || _nullProductImage;
    }

    let currentUser = state.session.id;

    return { product, seller, productImages, bids, currentUser, shippingPolicy, location };
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id)),
    createBid: bid => dispatch(createBid(bid))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);