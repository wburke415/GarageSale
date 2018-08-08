import React from 'react';

const ProductShowImages = (props) => {
    const mainImage = <img className="main-image" src={props.productImages[0].imageUrl} />;

    return mainImage;
};

export default ProductShowImages;