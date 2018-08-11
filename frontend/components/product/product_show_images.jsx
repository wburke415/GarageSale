import React from 'react';

export default class ProductShowImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMainImage: 0,
            selected: false
        };

        this.switchCurrentMainImage = this.switchCurrentMainImage.bind(this);
    }

    switchCurrentMainImage(e) {
        this.setState({currentMainImage: e.target.id});
        this.setState({selected: true});
    }


    render() {
        const {currentMainImage} = this.state;
        const {selected} = this.state;
        const {productImages} = this.props;

        let mainImage = <img className="main-image" />;
        let childImages = [];
        let childClass = 'child-image';

        if (productImages.length !== 0) {
            mainImage = <img className="main-image" src={productImages[currentMainImage].imageUrl} />;
    
            childImages = productImages.map((image, idx) => {
               (idx == currentMainImage && selected) ? childClass = "child-image selected" :  childClass = "child-image";
    
               return (
                   <li key={idx}>
                       <img id={idx} onClick={this.switchCurrentMainImage} className={childClass} src={image.imageUrl} />
                   </li>
               );
           });
        }


        return (
            <div className="product-images-wrapper">
                <div className="main-image-container">
                    {mainImage}
                </div>
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