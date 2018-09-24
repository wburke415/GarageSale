import React from 'react';
import { Link } from 'react-router-dom';

export default class CreateProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        sellerId: this.props.currentUser,
        paymentPolicyId: 1,
        shippingPolicyId: 1,
        returnPolicyId: 1,
        categoryId: 1,
        title: "",
        subtitle: "",
        sku: "",
        condition: 'New',
        conditionDescription: "",
        description: "",
        auction: true,
        duration: 7,
        startingPrice: "",
        binPrice: "",
        quantity: 1
      },
      images: {
        imageUrl: [],
        imageFile: []
      },
      errors: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.imagePreview = this.imagePreview.bind(this);
    this.displayImage = this.displayImage.bind(this);
    this.productImages = this.productImages.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let errors = this.checkErrors();
    
    if (!errors) {
      debugger;
      const { product, images } = this.state;
      const formData = new FormData();
  
      for (let i = 0; i < Object.keys(product).length; i++) {
        let key = Object.keys(product)[i];
        formData.append(`product[${key}]`, product[key])
      }
  
      if (images.imageFile) {
        images.imageFile.forEach(file => formData.append('photos[]', file));
      }
  
      this.props.createProduct(formData)
        .then(payload => {
          this.props.history.push(`/products/${Object.values(payload.products)[0].id}`);
        });
    }
  }

  checkErrors() {
    let {images, product} = this.state;

    this.setState({errors: ''})

    if (images.imageFile.length === 0) {
      this.setState({ errors: 'Product must have at least one image.' });
      return 'ERROR';
    }
    if (product.title === "") {
      this.setState({ errors: 'Product must have a title.' });
      return 'ERROR';
    }
    if (product.description === "") {
      this.setState({ errors: 'Product must have a description.' });
      return 'ERROR';
    }
    if (!product.startingPrice && !product.binPrice) {
      this.setState({ errors: 'Product must have a price.' });
      return 'ERROR';
    }
  }

  imagePreview(e) {
    if (this.state.images.imageUrl.length <= 6) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      let that = this;
  
      if (file) reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        let newState = Object.assign(that.state.images);
        newState.imageUrl = newState.imageUrl.concat(reader.result);
        newState.imageFile = newState.imageFile.concat(file);
  
        that.setState({ images: newState });
      };
    }
  }

  handleChange(property) {
    return e => {
      let newState = Object.assign({}, this.state.product);
      newState[property] = e.target.value;
      this.setState({ product: newState });
    };
  }

  displayImage(idx) {
    if (this.state.images.imageUrl[idx]) {
      return <img src={this.state.images.imageUrl[idx]} />;
    }
    else {
      return <i className="far fa-image"></i>;
    }
  }

  productImages() {
    return (
      <div className="create-product-photos">
        <label>Photos</label>

        <div className="images-container">


          <div className="create-product-main-image">
            <div className="file-input-wrapper">
              <label htmlFor="fileInput">Add Photos</label>
              <input id="fileInput" type="file" onChange={this.imagePreview} />
            </div>
          </div>

          <div className="create-product-all-images">
            <div className="top-row">
              <div className="create-product-single-image">
                {this.displayImage(0)}
              </div>
              <div className="create-product-single-image">
                {this.displayImage(1)}
              </div>
              <div className="create-product-single-image">
                {this.displayImage(2)}
              </div>
            </div>

            <div className="bottom-row">
              <div className="create-product-single-image">
                {this.displayImage(3)}
              </div>
              <div className="create-product-single-image">
                {this.displayImage(4)}
              </div>
              <div className="create-product-single-image">
                {this.displayImage(5)}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  changeAuctionType() {
    return e => {
      let newState = Object.assign({}, this.state.product);
      if (e.target.value === "Auction-style") {
        newState.auction = true;
        this.setState({ product: newState });
      }
      else {
        newState.auction = false;
        this.setState({ product: newState });
      }
    };
  }

  changeDuration() {
    return e => {
      let newState = Object.assign({}, this.state.product);
      if (e.target.value === "1 day") newState.duration = 1;
      if (e.target.value === "3 days") newState.duration = 3;
      if (e.target.value === "5 days") newState.duration = 5;
      if (e.target.value === "7 days") newState.duration = 7;
      if (e.target.value === "10 days") newState.duration = 10;
      this.setState({ product: newState });
    };
  }

  auctionType() {
    if (this.state.product.auction === true) return 'Auction-style';
    return 'Fixed price';
  }

  duration() {
    if (this.state.product.duration === 1) return '1 day';
    if (this.state.product.duration === 3) return '3 days';
    if (this.state.product.duration === 5) return '5 days';
    if (this.state.product.duration === 7) return '7 day';
    if (this.state.product.duration === 10) return '10 days';
  }

  render() {
    return (
      <div className="create-product-form-container">

        <header>
          <Link to="/">
            <img src={window.logo} />
          </Link>
          <a>Send us your feedback</a>
        </header>

        <h1>Create your listing</h1>

        <main className="create-product-form">

          <h2>Listing details</h2>

          <div className="top-info-pane">

            <div className="top-info-input">

              <div className="create-product-input">
                <label>Title</label>
                <input onChange={this.handleChange('title')} value={this.state.product.title} />
              </div>

              <div className="create-product-input">
                <label>Subtitle</label>
                <input onChange={this.handleChange('subtitle')} value={this.state.product.subtitle} />
              </div>

              <div className="create-product-sku">
                <label>Custom Label</label>
                <input onChange={this.handleChange('sku')} value={this.state.product.sku} />
              </div>

              <div className="create-product-condition">
                <label>Condition</label>
                <select onChange={this.handleChange('condition')} value={this.state.product.condition}>
                  <option defaultValue value="New">New</option>
                  <option value="New other (see details)">New other (see details)</option>
                  <option value="Manufacturer refurbished">Manufacturer refurbished</option>
                  <option value="Seller refurbished">Seller refurbished</option>
                  <option value="Used">Used</option>
                  <option value="For parts or not working">For parts or not working</option>
                </select>
              </div>

              <div className="create-product-input">
                <label>Condition description</label>
                <textarea onChange={this.handleChange('conditionDescription')} value={this.state.product.conditionDescription} />
              </div>

              {this.productImages()}

              <div className="create-product-item-description">
                <label>Item description</label>
                <textarea onChange={this.handleChange('description')} className="create-product-item-description" value={this.state.product.description} />
              </div>

            </div>

          </div>

        </main>

        <section className="create-product-form">

          <h2>Selling details</h2>

          <div className="top-info-pane">

            <div className="top-info-input">

              <div className="create-product-auction">
                <label>Format</label>
                <select onChange={this.changeAuctionType()} value={this.auctionType()} >
                  <option value="Auction-style">Auction-style</option>
                  <option value="Fixed price">Fixed price</option>
                </select>
              </div>

              <div className="create-product-duration">
                <label>Duration</label>
                <select onChange={this.changeDuration()} value={this.duration()} >
                  <option value={1}>1 day</option>
                  <option value={3}>3 days</option>
                  <option value={5}>5 days</option>
                  <option defaultValue value={7}>7 days</option>
                  <option value={10}>10 days</option>
                </select>
              </div>

              <div className="create-product-prices">
                <label>Price</label>
                <div className="product-price-container">
                  <span className="product-price-labels">
                    <label>Starting price</label>
                    <label className="bin-price">Buy It Now price</label>
                  </span>
                  <span className="product-price-inputs">
                    <span>$<input onChange={this.handleChange('startingPrice')} value={this.state.product.startingPrice} /></span>
                    <span>$<input onChange={this.handleChange('binPrice')} value={this.state.product.binPrice} /></span>
                  </span>
                </div>
              </div>

              <div className="create-product-quantity">
                <label>Quantity</label>
                <input onChange={this.handleChange('quantity')} value={this.state.product.quantity} />
              </div>


            </div>

          </div>

        </section>

        <section className="create-product-form">

          <h2>Shipping details</h2>

          <div className="top-info-pane">

            <div className="top-info-input">

              <div className="create-product-policies">
                <label>Business Policies</label>
                <div className="business-policies">

                  <label>Payment policy</label>
                  <select className="payment-policy">
                    <option>PayBud - default</option>
                  </select>

                  <label>Shipping policy</label>
                  <select className="shipping-policy">
                    <option>Standard Shipping - default</option>
                  </select>

                  <label>Returns policy</label>
                  <select className="returns-policy">
                    <option>Returns Accepted,Buyer,30 Days,Money Back - default</option>
                  </select>
                </div>
              </div>

            </div>

          </div>

        </section>

        <button id="submit-button" onClick={this.handleSubmit}>List item</button>
        <span className="form-errors">{this.state.errors}</span>
      </div>
    );
  }
}