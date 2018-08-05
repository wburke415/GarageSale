# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(firstname: 'Whitman', lastname: 'Burke', username: 'wburke415', email: 'whitmanburke@gmail.com', business: true, password: 'password')
User.create(firstname: 'Brianna', lastname: 'Burke', username: 'briiito', email: 'briannaeatscake@gmail.com', business: false, password: 'password')
