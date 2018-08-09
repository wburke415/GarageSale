import React from 'react';

const ProductShowImages = (props) => {
    const mainImage = <img className="main-image" src={props.productImages[0].imageUrl} />;
    let childImages = [];
    
    for (let i = 1; i < props.productImages.length; i++) {
        childImages.push(
        <li>
            <img className="child-image" src={props.productImages[i].imageUrl} />
        </li>
        );
    }
    
    return (
        <div className="product-images-wrapper">
            {mainImage}
            <ul className="child-images-list">
                {childImages.map(image => image)}
            </ul>

            <span className="product-sell-button">
                <i class="fas fa-dollar-sign"></i>
                <p>Have one to sell?</p>
                <button>Sell now</button>
            </span>
        </div>
    );
};

export default ProductShowImages;