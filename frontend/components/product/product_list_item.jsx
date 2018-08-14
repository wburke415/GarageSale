import React from 'react';

export default class ProductListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { product } = this.props;
        const { image } = this.props;

        return (
            <li className="product-list-item">
                <div className="image-container">
                    <img src={image.imageUrl} />
                </div>

                <div className="list-item-content">
                    <a href={`/#/products/${product.id}`}><h1>{product.title}</h1></a>
                    <h2>{product.subtitle}</h2>
                    <h3>{product.condition}</h3>
                    <h3>{product.startingPrice}</h3>
                    <h3>{product.binPrice}</h3>    
                </div>
            </li>
        );
    }
}