import React from 'react';

import ProductListItem from './product_list_item';

export default class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts(this.props.location.search);
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetchProducts(this.props.location.search);
        }
    }

    listItems() {
        const products = Object.values(this.props.products);
        const { productImages } = this.props;
        const { bids } = this.props;
        const { shippingPolicies } = this.props;

        let indexItems = [];

        for(let i = 0; i < products.length; i++) {
            let product = products[i];
            let image = productImages[product.productImageIds[0]];

            let productBids = [];

            for(let j = 0; j < product.bidIds.length; j++) {
                let bidId = product.bidIds[i];
                productBids.push(bids[bidId]);
            }

            let shippingPolicy = shippingPolicies[product.shippingPolicyId];

            indexItems.push(<ProductListItem key={i} shippingPolicy={shippingPolicy} image={image} bids={productBids} product={product} />);
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


