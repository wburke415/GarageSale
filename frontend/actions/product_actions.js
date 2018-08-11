import * as APIUtil from '../utils/product_api_util';

export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

export const receiveProduct = payload => ({
    type: RECEIVE_PRODUCT,
    product: payload.product,
    productImages: payload.productImages,
    bids: payload.bids,
    seller: payload.seller,
    shippingPolicy: payload.shippingPolicy,
    location: payload.location
});

export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});

export const fetchProduct = id => dispatch => (
    APIUtil.fetchProduct(id)
        .then(product => dispatch(receiveProduct(product)))
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