export const fetchProduct = id => (
    $.ajax({
        method: 'GET',
        url: `api/products/${id}`
    })
);

export const fetchProducts = () => (
    $.ajax({
        method: 'GET',
        url: `api/products`
    })
);

export const createProduct = product => {
    debugger;
    return $.ajax({
        method: 'POST',
        url: 'api/products',
        data: product,
        contentType: false,
        processData: false
    });
};

export const updateProduct = product => (
    $.ajax({
        method: 'PATCH',
        url: `api/products/${product.id}`,
        data: { product }
    })
);

export const deleteProduct = id => (
    $.ajax({
        method: 'DELETE',
        url: `api/products/${id}`
    })
);

export const createBid = bid => (
    $.ajax({
        method: 'POST',
        url: 'api/bids',
        data: { bid }
    })
);

export const deleteBid = id => (
    $.ajax({
        method: 'POST',
        url: `api/bids/${id}`
    })
);