import {connect} from 'react-redux';

import SplashPage from './splash_page';
import { fetchProducts } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => ({
    products: state.entities.products,
    productImages: state.entities.productImages
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: search => dispatch(fetchProducts(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);