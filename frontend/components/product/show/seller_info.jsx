import React from 'react';

function sellerInfo(seller) {
    return (
        <div className="seller-info-wrapper">
            <div className="seller-info-box">
                <div>Seller information</div>
                <div className="username-container">
                    <div className="product-show-seller-username">{seller.username}</div>
                    <div className="product-show-seller-feedback"><span>(</span><a>162</a><span>)</span></div>
                </div>
                <div className="product-show-feedback-percentage">100% positive feedback</div>

                <a  className="save-this-seller">
                    <i className="far fa-heart"></i>
                    <div>Save this Seller</div>
                </a>

                <a  className="contact-seller">Contact seller</a>

                <a className="see-other-items">See other items</a>
            </div>
        </div>
    );
}

export default sellerInfo;