import { connect } from 'react-redux';

import ProductShow from './product_show';
import { fetchProduct } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => {
    const _nullProduct = null;
    let product;
    if (state.entities.products) {
        product = state.entities.products[ownProps.match.params.id] || _nullProduct;
    }

    const _nullProductImage = null;
    let productImages;
    if (product && state.entities.productImages) {
        productImages = product.productImageIds.map(id => state.entities.productImages[id]) || _nullProductImage;
    }
    return { product, productImages };
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);