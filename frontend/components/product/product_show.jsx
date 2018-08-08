import React from 'react';

import ProductShowImages from './product_show_images';

export default class ProductShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.product) {
            this.props.fetchProduct(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetchProduct(nextProps.match.params.id);
        }
    }

    render() {
        // debugger;
        if (!this.props.product) {return null;}
        return (
            <div>
                <h1>{this.props.product.title}</h1>
                <h1>{this.props.product.subtitle}</h1>
                <h1>{this.props.product.sku}</h1>
                <h1>{this.props.product.condition}</h1>
                <h1>{this.props.product.condition_description}</h1>
                <h1>{this.props.product.auction}</h1>
                <h1>{this.props.product.duration}</h1>
                <h1>{this.props.product.starting_price}</h1>
                <h1>{this.props.product.bin_price}</h1>
                <h1>{this.props.product.reserve_price}</h1>
                <h1>{this.props.product.quantity}</h1>
                <ProductShowImages productImages={this.props.productImages}/>
            </div>
        );
    }
}