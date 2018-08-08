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