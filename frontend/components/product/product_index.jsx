import React from 'react';

import ProductListItem from './product_list_item';

export default class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetchProducts();
        }
    }

    listItems() {
        const products = Object.values(this.props.products);
        const { productImages } = this.props;
        let indexItems = [];

        for(let i = 0; i < products.length; i++) {
            let product = products[i];
            let image = productImages[product.productImageIds[0]];
            indexItems.push(<ProductListItem key={i} image={image} product={product} />);
        }

        return indexItems;
    }

    render() {
        if (!this.props.products) { return null; }
        let listItems = this.listItems();
        return (
            <div className="product-index-container">
                <ul>
                    {listItems.map(li => li)}
                </ul>
            </div>
        );
    }
}


