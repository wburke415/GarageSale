# GarageSale

GarageSale is an ecommerce website where you can buy and sell products of all kinds, inspired by eBay. It was build using Rails & PostgreSQL for the backend, and React.js & Redux for the frontend. 

The project was designed and built during a 10 day timeframe, and I plan to make additional improvements to it over time.

# Features

* Secure user authentication from frontend to backend using BCrypt
* Users can bid on, purchase, and list products
* Users can search for products by title or category
* Search dynamically populates with possible titles
* Products can have up to 6 images which can be previewed and uploaded during creation

# Technologies

Rails was used for this project on the backend due to its built in support for relational databases and simple routing. Since this was a small scale portfolio project, convenience and simplicity were chosen over scalability. 

Frontend Redux state is split into various segments for users, products, bids, images, session, and errors. This keeps the state normalized, with everything easily accessible and without duplication of data.

# Possible future features

User pages with listings of all created or purchased products
Product feedback

![preview_snippet](/app/assets/images/preview_snippet)
