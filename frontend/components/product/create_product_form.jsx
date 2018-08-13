import React from 'react';
import { Link } from 'react-router-dom';

export default class CreateProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            subtitle: "",
            sku: "",
            condition: "",
            conditionDescription: "",
            description: "",
            auction: true,
            duration: "",
            startingPrice: "",
            quantity: 1,
            location: "",
            imageUrl: [],
            imageFile: "",
            paymentPolicyId: 1,
            shippingPolicyId: 1,
            returnPolicyId: 1,

        };

        this.imagePreview = this.imagePreview.bind(this);
        this.displayImage = this.displayImage.bind(this);
        this.productImages = this.productImages.bind(this);
    }

    imagePreview(e) {
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        let that = this;

        reader.onloadend = () => {
            let oldState = that.state.imageUrl.slice(0);
            let newState = oldState.concat(reader.result);
            that.setState({ imageUrl: newState, imageFile: file });
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ imageUrl: [], imageFile: null });
        }
    }

    handleChange(property) {
        return e => this.setState({[property]: e.target.value});
    }

    displayImage(idx) {
        if (this.state.imageUrl[idx]) {
            return <img src={this.state.imageUrl[idx]} />;
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
            if (e.target.value === "Auction-style") this.setState({auction: true});
            if (e.target.value === "Fixed price") this.setState({auction: false});
        };
    }

    changeDuration() {
        return e => {
            if (e.target.value === "1 day") this.setState({duration: 1});
            if (e.target.value === "3 days") this.setState({duration: 3});
            if (e.target.value === "5 days") this.setState({duration: 5});
            if (e.target.value === "7 days") this.setState({duration: 7});
            if (e.target.value === "10 days") this.setState({duration: 10});
        };
    }

    auctionType() {
        if (this.state.auction === true) return 'Auction-style';
        return 'Fixed price';
    }

    duration() {
        if (this.state.duration === 1) return '1 day';
        if (this.state.duration === 3) return '3 days';
        if (this.state.duration === 5) return '5 days';
        if (this.state.duration === 7) return '7 day';
        if (this.state.duration === 10) return '10 days';
    }

    render() {
        return (
            <div className="create-product-form-container">

                <header>
                    <Link to="/">
                        <img src={window.logo} />
                    </Link>
                    <Link to="/placeholder">Send us your feedback</Link>
                </header>

                <h1>Create your listing</h1>

                <main className="create-product-form">

                    <h2>Listing details</h2>

                    <div className="top-info-pane">

                        <div className="top-info-input">
                        
                            <div className="create-product-input">
                                <label>Title</label>
                                <input onChange={this.handleChange('title')} value={this.state.title}/>
                            </div>

                            <div className="create-product-input">
                                <label>Subtitle</label>
                                <input onChange={this.handleChange('subtitle')} value={this.state.subtitle}/>
                            </div>

                            <div className="create-product-sku">
                                <label>Custom Label</label>
                                <input onChange={this.handleChange('sku')} value={this.state.sku}/>
                            </div>
                            
                            <div className="create-product-condition">
                                <label>Condition</label>
                                <select onChange={this.handleChange('condition')} value={this.state.condition}> 
                                    <option value="New">New</option>
                                    <option value="New other (see details)">New other (see details)</option>
                                    <option value="Manufacturer refurbished">Manufacturer refurbished</option>
                                    <option value="Seller refurbished">Seller refurbished</option>
                                    <option value="Used">Used</option>
                                    <option value="For parts or not working">For parts or not working</option>
                                </select>
                            </div>

                            <div className="create-product-input">
                                <label>Condition description</label>
                                <textarea onChange={this.handleChange('conditionDescription')} value={this.state.conditionDescription}/>
                            </div>
                            
                            {this.productImages()}

                            <div className="create-product-item-description">
                                <label>Item description</label>
                                <textarea onChange={this.handleChange('description')} className="create-product-item-description" value={this.state.description}/>
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
                                    <option value={7}>7 days</option>
                                    <option value={10}>10 days</option>
                                </select>
                            </div>

                            <div className="create-product-prices">
                                <label>Price</label>
                                <div className="product-price-container">
                                    <span className="product-price-labels">
                                        <label>Starting price</label>
                                        <label className="bin-price">Buy It Now price</label>
                                        <label>Reserve price</label>
                                    </span>
                                    <span className="product-price-inputs">
                                        <span>$<input onChange={this.handleChange('startingPrice')} value={this.state.startingPrice} /></span>
                                        <span>$<input onChange={this.handleChange('startingPrice')} value={this.state.startingPrice} /></span>
                                        <span>$<input onChange={this.handleChange('startingPrice')} value={this.state.startingPrice} /></span>
                                    </span>
                                </div>
                            </div>

                            <div className="create-product-quantity">
                                <label>Quantity</label>
                                <input onChange={this.handleChange('quantity')} value={this.state.quantity} />
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

            </div>
        );    
    }
}