import { connect } from 'react-redux';

import ProductShow from './product_show';
import { fetchProduct } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => {
    const _nullProduct = null;
    const _nullSeller = null;
    let product;
    let seller;
    if (state.entities.products) {
        product = state.entities.products[ownProps.match.params.id] || _nullProduct;

        if (product) {
            seller = state.entities.users[product.sellerId] || _nullSeller;
        }
    }

    const _nullProductImage = null;
    let productImages;
    if (product && state.entities.productImages) {
        productImages = product.productImageIds.map(id => state.entities.productImages[id]) || _nullProductImage;
    }

    let bids = state.entities.bids;

    return { product, seller, productImages, bids };
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);