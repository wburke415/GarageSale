import * as APIUtil from '../utils/product_api_util';

export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

export const receiveProduct = product => ({
    type: RECEIVE_PRODUCT,
    product
});

export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});

export const fetchProduct = id => dispatch => (
    APIUtil.fetchProduct(id)
        .then(product => dispatch(receiveProduct(product)))
);

export const fetchProducts = search => dispatch => (
    APIUtil.fetchProducts(search)
        .then(products => dispatch(receiveProducts(products)))
);