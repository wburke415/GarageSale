import { connect } from 'react-redux';

import { fetchProducts } from '../../../actions/product_actions';
import ProductIndex from './product_index';

const mapStateToProps = (state, ownProps) => {
    let products;
    const {search} = ownProps.location;

    if (search.includes('dailydeals')) {
      products = Object.values(state.entities.products);
    } else if (search.includes('category=')) {

      let category = search.split('=')[-1];
      products = Object.values(state.entities.products).filter(product => product.category === category);
    } else {

      let parsedSearch = search.split('%20')
        .join(' ')
        .replace('?', '')
        .toLowerCase();

      products = Object.values(state.entities.products).filter(product => product.searchString.includes(parsedSearch));
    }

    let bids = Object.values(state.entities.bids);
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