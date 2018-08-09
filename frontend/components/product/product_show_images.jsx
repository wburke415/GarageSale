import React from 'react';

export default class ProductShowImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainImage: props.productImages[0],
            childImages: Object.values(props.productImages).slice(1)
        };

        this.switchMainImage = this.switchMainImage.bind(this);
    }

    switchMainImage(e) {
        let newChildren = this.state.childImages.slice(0);
        newChildren[parseInt(e.target.id)] = this.state.mainImage;

        let newMain = this.state.childImages[e.target.id];

        this.setState({mainImage: newMain});
        this.setState({childImages: newChildren});
    }


    render() {
        const mainImage = <img className="main-image" src={this.state.mainImage.imageUrl} />;
        const childImages = this.state.childImages.map((childImage, idx) => <li key={idx}><img onClick={this.switchMainImage} id={idx} className="child-image" src={childImage.imageUrl} /></li>);

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