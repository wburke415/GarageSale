import { connect } from 'react-redux';

import { fetchProducts } from '../../actions/product_actions';
import ProductIndex from './product_index';

const mapStateToProps = (state, ownProps) => {
    let products = state.entities.products;
    let bids = state.entities.bids;
    let productImages =  state.entities.productImages;
    let currentUser = state.session.id;

    return {
        products,
        productImages,
        bids,
        currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex);