import { connect } from 'react-redux';

import NavBar from './nav_bar';
import { logout } from '../../actions/session_actions';
import { fetchProducts, clearProducts } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[state.session.id],
    products: state.entities.products
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchProducts: search => dispatch(fetchProducts(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);