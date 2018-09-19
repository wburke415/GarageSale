import * as APIUtil from '../utils/product_api_util';

export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const RECEIVE_PRODUCT_TITLES = "RECEIVE_PRODUCT_TITLES";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";

export const receiveProduct = payload => ({
  type: RECEIVE_PRODUCT,
  products: payload.products,
  bids: payload.bids,
  sellers: payload.sellers,
  productWatches: payload.productWatches,
  shippingPolicies: payload.shippingPolicies,
  locations: payload.locations
});

export const receiveProducts = payload => ({
  type: RECEIVE_PRODUCTS,
  products: payload.products,
  bids: payload.bids,
  sellers: payload.sellers,
  productWatches: payload.productWatches,
  shippingPolicies: payload.shippingPolicies,
  locations: payload.locations
});

export const receiveProductTitles = titles => ({
  type: RECEIVE_PRODUCT_TITLES,
  titles
});


export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
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

export const fetchProductTitles = search => dispatch => (
  APIUtil.fetchProductTitles(search)
    .then(titles => dispatch(receiveProductTitles(titles)))
);

export const createBid = bid => dispatch => (
  APIUtil.createBid(bid)
    .then(product => dispatch(receiveProduct(product)))
);

export const deleteBid = id => dispatch => (
  APIUtil.deleteBid(id)
    .then(product => dispatch(receiveProduct(product)))
);

export const createProductWatch = productWatch => dispatch => (
  APIUtil.createProductWatch(productWatch)
    .then(product => dispatch(receiveProduct(product)))
);

export const deleteProductWatch = id => dispatch => (
  APIUtil.deleteProductWatch(id)
    .then(product => dispatch(receiveProduct(product)))
);