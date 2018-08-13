import { connect } from 'react-redux';

import CreateProductForm from './create_product_form';
import { createProduct } from '../../actions/product_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({
    createProduct: product => dispatch(createProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductForm);