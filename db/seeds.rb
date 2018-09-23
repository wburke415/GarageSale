require_relative 'video_games'
require_relative 'books'
require_relative 'pet_toys'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Seed users -----------------------------------------------------------------------------------------------------------------------------------

(1..30).each do |i|
  User.create(firstname: 'Guest', lastname: 'user', username: "guest#{i}", email: "guest#{i}@gmail.com", business: false, password: 'password')
end 

# Seed products -----------------------------------------------------------------------------------------------------------------------------------

# VIDEO GAME SEEDS 

[BOOK_SEEDS, VIDEO_GAME_SEEDS, PET_TOY_SEEDS].each_with_index do |seed_file, idx|
  seed_file.each do |seed|
    seller = User.find_by(id: rand(1..30))

    seed_location = seed[:location].split(", ")
    location = Location.create!(user_id: seller.id, state: seed_location[1], city: seed_location[0])
    shipping_policy = ShippingPolicy.create!(user_id: seller.id, location_id: location.id)

    auction = [true, false].sample
    starting_price = auction ? ((seed[:bin_price] * 0.5) * 100).ceil / 100.00 : nil

    product = Product.create!(seller_id: seller.id, category_id: idx + 1, payment_policy_id: 1, shipping_policy_id: shipping_policy.id, return_policy_id: 1, 
      title: seed[:title],
      condition: seed[:condition],
      condition_description: seed[:condition_description],
      bin_price: seed[:bin_price],
      starting_price: starting_price,
      auction: auction,
      duration: rand(1..7),
      quantity: 1,
      description: "This is a fantasic product that I promise you will enjoy. We only sell the best of the best here at GarageSale, the one stop shop for everything you could ever need."
    )
    
    if product.auction
      rand(0..7).times do |i|
        break if product.starting_price + i >= product.bin_price
        while true
          buyer_id = rand(1..30)
          break if buyer_id != seller.id
        end
        Bid.create!(product_id: product.id, buyer_id: buyer_id, bid: starting_price + i)
      end 
    end

    images = seed[:images].split(";")
    uploaded_images = []
    (5).downto(0) do |i|
      next if !images[i]

      img_tag = images[i].split('/')[-2..-1].join("/")
      next if (uploaded_images.include?(img_tag) || img_tag.include?('_35.JPG'))

      ProductImage.create!(product_id: product.id, image_url: images[i])
      uploaded_images.push(img_tag)
    end 
  end 
end

# # BOOK SEEDS

# BOOK_SEEDS.each do |book|
#   seller_id = rand(1..30);

#   book_location = book[:location].split(", ")
#   location = Location.create(user_id: seller_id, country: book_location[2], state: book_location[1], city: book_location[0])
#   shipping_policy = ShippingPolicy.create(user_id: seller_id, location_id: location.id)

#   auction = [true, false].sample
#   starting_price = auction ? ((book[:bin_price] * 0.5) * 100).ceil / 100.00 : nil

#   product = Product.create(seller_id: seller_id, category_id: 2, payment_policy_id: 1, shipping_policy_id: shipping_policy.id, return_policy_id: 1, 
#     title: book[:title],
#     condition: book[:condition],
#     condition_description: book[:condition_description],
#     bin_price: book[:bin_price],
#     starting_price: starting_price,
#     auction: auction,
#     duration: rand(1..7),
#     quantity: 1,
#     description: "Lorem ipsum dolor sit amet, in has assentior intellegat maiestatis, animal vituperata conclusionemque et eam. Nibh novum vix ex, cum id dolores invenire sensibus, integre urbanitas honestatis pro ad. Mel utroque fuisset adversarium id. Alia viris epicuri at mea, sed dico labitur ea. Ne vix convenire ocurreret. Pro prima similique reprimique ei, ea oblique incorrupte quaerendum mea, stet dolor ad cum.

# Ex magna maluisset sit, cu elitr corpora officiis qui. Ius etiam putent aperiam an, cibo timeam ut est, eros etiam singulis pri in. Per oblique labores scribentur at, appareat omittantur et nec, ea noster voluptatum eam. Pro ei vide lobortis reprimique, sea sale epicuri vituperata ne. Pericula sadipscing eam an.

# In has vocibus feugait, id mea munere dolorum. Movet interesset vis in, mea ex lobortis ocurreret moderatius. Pro ad tamquam prompta, eum ad nonumy quidam repudiare, eam magna aliquip invenire ea. Eum probo liberavisse et. Mea molestie convenire definitiones ne, te congue recusabo vituperatoribus est.

# Sed iudico ullamcorper in, vel noster voluptua disputationi an, no quem sumo nibh his. Ea alii timeam placerat mei, pro at timeam latine. Utroque insolens id per, ius in quod sententiae. Movet nostro epicuri sit cu, ei maiorum tacimates pertinax eos, splendide forensibus intellegebat nec eu. No vix perfecto adolescens. Alterum probatus mediocritatem vel no, probatus vulputate liberavisse qui ut, primis semper option id quo.

# Utroque ullamcorper ea nam, laoreet accusata contentiones quo no. Eos summo officiis cu. Vel odio stet fastidii et, offendit praesent assueverit duo eu. Sit summo iusto fuisset ad, ne quot regione explicari nam."
#   )
  
#   if product.auction
#     rand(0..7).times do |i|
#       break if product.starting_price + i >= product.bin_price
#       Bid.create(product_id: product.id, buyer_id: rand(1..30), bid: starting_price + i)
#     end 
#   end

#   images = book[:images].split(";")
#   uploaded_images = []
#   (5).downto(0) do |i|
#     next if !images[i]

#     img_tag = images[i].split('/')[-2..-1].join("/")
#     next if uploaded_images.include?(img_tag)

#     ProductImage.create(product_id: product.id, image_url: images[i])
#     uploaded_images.push(img_tag)
#   end 
# end 

# # PET TOY SEEDS

# PET_TOY_SEEDS.each do |toy|
#   seller_id = rand(1..30)

#   toy_location = toy[:location].split(", ")
#   location = Location.create(user_id: seller_id, country: toy_location[2], state: toy_location[1], city: toy_location[0])
#   shipping_policy = ShippingPolicy.create(user_id: seller_id, location_id: location.id)

#   auction = [true, false].sample
#   starting_price = auction ? ((toy[:bin_price] * 0.5) * 100).ceil / 100.00 : nil

#   product = Product.create(seller_id: seller_id, category_id: 3, payment_policy_id: 1, shipping_policy_id: shipping_policy.id, return_policy_id: 1, 
#     title: toy[:title],
#     condition: toy[:condition],
#     condition_description: toy[:condition_description],
#     bin_price: toy[:bin_price],
#     starting_price: starting_price,
#     auction: auction,
#     duration: rand(1..7),
#     quantity: 1,
#     description: "Lorem ipsum dolor sit amet, in has assentior intellegat maiestatis, animal vituperata conclusionemque et eam. Nibh novum vix ex, cum id dolores invenire sensibus, integre urbanitas honestatis pro ad. Mel utroque fuisset adversarium id. Alia viris epicuri at mea, sed dico labitur ea. Ne vix convenire ocurreret. Pro prima similique reprimique ei, ea oblique incorrupte quaerendum mea, stet dolor ad cum.

# Ex magna maluisset sit, cu elitr corpora officiis qui. Ius etiam putent aperiam an, cibo timeam ut est, eros etiam singulis pri in. Per oblique labores scribentur at, appareat omittantur et nec, ea noster voluptatum eam. Pro ei vide lobortis reprimique, sea sale epicuri vituperata ne. Pericula sadipscing eam an.

# In has vocibus feugait, id mea munere dolorum. Movet interesset vis in, mea ex lobortis ocurreret moderatius. Pro ad tamquam prompta, eum ad nonumy quidam repudiare, eam magna aliquip invenire ea. Eum probo liberavisse et. Mea molestie convenire definitiones ne, te congue recusabo vituperatoribus est.

# Sed iudico ullamcorper in, vel noster voluptua disputationi an, no quem sumo nibh his. Ea alii timeam placerat mei, pro at timeam latine. Utroque insolens id per, ius in quod sententiae. Movet nostro epicuri sit cu, ei maiorum tacimates pertinax eos, splendide forensibus intellegebat nec eu. No vix perfecto adolescens. Alterum probatus mediocritatem vel no, probatus vulputate liberavisse qui ut, primis semper option id quo.

# Utroque ullamcorper ea nam, laoreet accusata contentiones quo no. Eos summo officiis cu. Vel odio stet fastidii et, offendit praesent assueverit duo eu. Sit summo iusto fuisset ad, ne quot regione explicari nam."
#   )
  
#   if product.auction
#     rand(0..7).times do |i|
#       break if product.starting_price + i >= product.bin_price
#       Bid.create(product_id: product.id, buyer_id: rand(1..30), bid: starting_price + i)
#     end 
#   end

#   images = toy[:images].split(";")
#   uploaded_images = []
#   (5).downto(0) do |i|
#     next if !images[i]

#     img_tag = images[i].split('/')[-2..-1].join("/")
#     next if uploaded_images.include?(img_tag)

#     ProductImage.create(product_id: product.id, image_url: images[i])
#     uploaded_images.push(img_tag)
#   end 
# end 