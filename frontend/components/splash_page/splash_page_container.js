import {connect} from 'react-redux';

import SplashPage from './splash_page';
import { fetchProducts, clearProducts } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => ({
    products: state.entities.products,
    bids: Object.values(state.entities.bids),
    sellers: Object.values(state.entities.users).filter(user => user.business)
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: search => dispatch(fetchProducts(search)),
    clearProducts: () => dispatch(clearProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);