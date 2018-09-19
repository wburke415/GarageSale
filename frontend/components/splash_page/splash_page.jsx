import React from 'react';

export default class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.directToDailyDeals = this.directToDailyDeals.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts("splash");
  }

  directToDailyDeals(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/products',
      search: `dailydeals`
    });
  }

  render() {
    if (Object.values(this.props.products).length === 0) { return null; }
    return (
      <div className="splash-page-container">
        <div className="daily-deals-banner">
          <a onClick={this.directToDailyDeals}><img src={window.headphoneBackground} /></a>
          <button onClick={this.directToDailyDeals}>Shop GarageSale Deals</button>
        </div>

        <div className="daily-deals-products">
          <h1>Daily Deals</h1>
          <ul>
            {Object.values(this.props.products)
              .filter(product => (product.startingPrice < 20 && product.startingPrice > 5))
              .slice(0, 5)
              .map(product => {
                let price = product.startingPrice || product.binPrice;
                return (
                  <li className="splash-page-item" key={product.id}>
                    <a className="splash-img-container" href={`/#/products/${product.id}`}>
                      <img src={product.productImages[0]}></img>
                    </a>
                    <span>${price.toFixed(2)}</span>
                  </li>
                );
              })
            }
          </ul>
        </div>

        <div className="daily-deals-products">
          <h1>Video Games you may be interested in</h1>
          <ul>
            {Object.values(this.props.products)
              .filter(product => product.categoryId === 1)
              .slice(0, 5)
              .map(product => {
                let price = product.startingPrice || product.binPrice;
                return <li className="splash-page-item" key={product.id}>
                    <a className="splash-img-container" href={`/#/products/${product.id}`}>
                      <img src={product.productImages[0]} />
                    </a>
                    <span>${price.toFixed(2)}</span>
                  </li>;
              })
            }
          </ul>
        </div>

        <div className="daily-deals-products">
          <h1>Books you may be interested in</h1>
          <ul>
            {Object.values(this.props.products)
              .filter(product => product.categoryId === 2)
              .slice(0, 5)
              .map(product => {
                let price = product.startingPrice || product.binPrice;
                return <li className="splash-page-item" key={product.id}>
                    <a className="splash-img-container" href={`/#/products/${product.id}`}>
                      <img src={product.productImages[0]} />
                    </a>
                    <span>${price.toFixed(2)}</span>
                  </li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}