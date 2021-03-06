import React from 'react';

export default class ProductShowImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMainImage: 0,
      selected: false
    };

    this.switchCurrentMainImage = this.switchCurrentMainImage.bind(this);
    this.pushToNew = this.pushToNew.bind(this);
  }

  pushToNew(e) {
    e.preventDefault();
    this.props.history.push("/products/new");
  }

  switchCurrentMainImage(e) {
    this.setState({ currentMainImage: e.target.id });
    this.setState({ selected: true });
  }

  render() {
    const { currentMainImage } = this.state;
    const { selected } = this.state;
    const { productImages } = this.props;

    let mainImage;
    let childImages = [];
    let childClass = 'child-image';

    if (productImages.length !== 0) {
      mainImage = <img ref={this.myImg} className="main-image" src={productImages[currentMainImage]} />;

      childImages = productImages.map((image, idx) => {
        (idx == currentMainImage && selected) ? childClass = "child-image selected" : childClass = "child-image";

        return (
          <li key={idx}>
            <img id={idx} 
              onClick={this.switchCurrentMainImage} 
              className={childClass} 
              src={image} />
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
          <button onClick={this.pushToNew}>Sell now</button>
        </span>
      </div>
    );
  }
}