import * as APIUtil from '../utils/product_api_util';

export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

export const receiveProduct = payload => ({
    type: RECEIVE_PRODUCT,
    products: payload.products,
    productImages: payload.productImages,
    bids: payload.bids,
    sellers: payload.sellers,
    shippingPolicies: payload.shippingPolicies,
    locations: payload.locations
});

export const receiveProducts = payload => ({
    type: RECEIVE_PRODUCTS,
    products: payload.products,
    productImages: payload.productImages,
    bids: payload.bids,
    sellers: payload.sellers,
    shippingPolicies: payload.shippingPolicies,
    locations: payload.locations
});

export const fetchProduct = id => dispatch => (
    APIUtil.fetchProduct(id)
        .then(product => dispatch(receiveProduct(product)))
);

export const createProduct = product => dispatch => (
    APIUtil.createProduct(product)
    .then(newProduct => dispatch(receiveProduct(newProduct)))
);

export const updateProduct = product => dispatch => (
    APIUtil.updateProduct(product)
    .then(updatedProduct => dispatch(receiveProduct(updatedProduct)))
);

export const fetchProducts = search => dispatch => (
    APIUtil.fetchProducts(search)
        .then(products => dispatch(receiveProducts(products)))
);

export const createBid = bid => dispatch => (
    APIUtil.createBid(bid)
        .then(product => dispatch(receiveProduct(product)))
);

export const deleteBid = id => dispatch => (
    APIUtil.deleteBid(id)
        .then(product => dispatch(receiveProduct(product)))
);