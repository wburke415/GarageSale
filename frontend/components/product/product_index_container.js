import { connect } from 'react-redux';

import { fetchProducts } from '../../actions/product_actions';
import ProductIndex from './product_index';

const mapStateToProps = (state, ownProps) => {
    let products = state.entities.products;
    let bids = state.entities.bids;
    let productImages =  state.entities.productImages;
    let currentUser = state.session.id;
    let shippingPolicies = state.entities.shippingPolicies;

    return {
        products,
        productImages,
        bids,
        currentUser,
        shippingPolicies
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: search => dispatch(fetchProducts(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex);