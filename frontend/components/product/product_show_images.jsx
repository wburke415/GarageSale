import React from 'react';

export default class ProductShowImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMain: 0,
            currentChildren: Object.keys(props.productImages).slice(1)
        };

        this.switchMainImage = this.switchMainImage.bind(this);

    }

    switchMainImage(e) {
        let tempMain = this.state.currentMain;
        let newChildren = this.state.currentChildren;
        newChildren[e.target.id] = tempMain;

        this.setState({currentMain: e.target.id});
        this.setState({currentChildren: newChildren});
    }


    render() {
        const {productImages} = this.props;
        const {currentMain} = this.state;
        const mainImage = <img className="main-image" src={productImages[currentMain].imageUrl} />;
        let childImages = [];
        
        for (let i = 0; i < productImages.length; i++) {
            if (i === currentMain) continue;
            childImages.push(
            <li key={i}>
                    <img id={i} onClick={this.switchMainImage} className="child-image" src={productImages[i].imageUrl} />
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
                    <i className="fas fa-dollar-sign"></i>
                    <p>Have one to sell?</p>
                    <button>Sell now</button>
                </span>
            </div>
        );
    }
}