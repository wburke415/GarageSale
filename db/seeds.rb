# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(firstname: 'Whitman', lastname: 'Burke', username: 'wburke415', email: 'whitmanburke@gmail.com', business: true, password: 'password')
User.create(firstname: 'Brianna', lastname: 'Burke', username: 'briiito', email: 'briannaeatscake@gmail.com', business: false, password: 'password')
User.create(firstname: 'Jim', lastname: 'Burke', username: 'EnglishCompanion', email: 'jimburke@englishcompanion.com', business: true, password: 'password')
User.create(firstname: 'Susan', lastname: 'Burke', username: 'SuperSusan', email: 'susan-burke@comcast.net', business: false, password: 'password')


Product.create(seller_id: 1, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, location_id: 1, title: "Banjo-Kazooie", subtitle: "Classic N64 game", sku: "22700001", condition: "Very Good", condition_description: "Game is in great condition. Case and manual included.", auction: true, duration: 7, starting_price: 9.99, bin_price: 14.99, quantity: 1)
ProductImage.create(product_id: 1, image_url: "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_7/SI_N64_BanjoKazooie_image1600w.jpg")
ProductImage.create(product_id: 1, image_url: "https://vignette.wikia.nocookie.net/deathbattlefanon/images/0/01/BanjoKazooieTooie7.png/revision/latest?cb=20160508182152")
ProductImage.create(product_id: 1, image_url: "https://vignette.wikia.nocookie.net/allstar-royale/images/1/1d/Banjo-Kazooie.png/revision/latest?cb=20160101110450")
ProductImage.create(product_id: 1, image_url: "https://static.giantbomb.com/uploads/square_small/2/25329/1784022-gnawty.png")
Bid.create(product_id: 1, buyer_id: 2, bid: 9.99)
Bid.create(product_id: 1, buyer_id: 2, bid: 10.00)