# GarageSale

[Live Site](http://thegaragesale.co/#/)

GarageSale is an eCommerce website, inspired by eBay, where users can list, bid on, purchase products, as well as watch any products that the are interested in. All of this can be easily tracked through the MyGarage page which allows users to easily check on any products that they have listed, bid on, purchased, or watched. It was build using Rails & PostgreSQL for the backend, React.js & Redux for the frontend, and has been been integrated with AWS S3 for uploading and storing product images.

The project was designed and built during a 10 day timeframe, and I plan to make additional improvements to it over time.

# Features

* Secure user authentication from frontend to backend using BCrypt
* Users can bid on, purchase, list, and watch products
* Users can search for products by title or category
* Search dynamically populates with possible titles
* Products can have up to 6 images which can be previewed and uploaded during creation
* All user actions related to products can be tracked through MyGarage page

# Image preview & upload

![preview_snippet](/app/assets/images/preview_snippet.jpg)

```javascript
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
```

In the above code snippet, I utilize the FileReader method in order to read data from images that the user uploads, and then put them into my components state. In order to avoid setting state directly, I use Object.assign from the components old state, and then concat it with the image data uploaded before using setState.

# Technologies

Rails was used for this project on the backend due to its built in support for relational databases and simple routing. Since this was a small scale portfolio project, convenience and simplicity were chosen over scalability. 

Frontend Redux state is split into various segments for users, products, bids, shipping policies, locations, search results, product watches, session, and errors. This keeps the state normalized, with everything easily accessible and without duplication of data.

# Possible future features

Product feedback and user messaging