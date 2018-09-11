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

User.create(firstname: 'Whitman', lastname: 'Burke', username: 'wburke415', email: 'whitmanburke@gmail.com', business: true, password: 'password')
User.create(firstname: 'Brianna', lastname: 'Burke', username: 'briiito', email: 'briannaeatscake@gmail.com', business: false, password: 'password')
User.create(firstname: 'Jim', lastname: 'Burke', username: 'EnglishCompanion', email: 'jimburke@englishcompanion.com', business: true, password: 'password')
User.create(firstname: 'Susan', lastname: 'Burke', username: 'SuperSusan', email: 'susan-burke@comcast.net', business: false, password: 'password')

(1..100).each do |i|
  User.create(firstname: 'Guest', lastname: 'user', username: "guest#{i}", email: "guest#{i}@gmail.com", business: false, password: 'password')
end 

# Seed one location and shipping policy -----------------------------------------------------------------------------------------------------------------------------------

Location.create(user_id: 1)
ShippingPolicy.create(user_id: 1, location_id: 1)


# Seed products -----------------------------------------------------------------------------------------------------------------------------------

# VIDEO GAME SEEDS 

seller = User.create(firstname: 'Gamer', lastname: 'Gamer', username: 'Gamer2Gamer', email: 'gamer2gamer@gmail.com', business: true, password: 'password')

VIDEO_GAME_SEEDS.each do |game|
  game_location = game[:location].split(", ")
  location = Location.create(user_id: seller.id, country: game_location[2], state: game_location[1], city: game_location[0])
  shipping_policy = ShippingPolicy.create(user_id: seller.id, location_id: location.id)

  auction = [true, false].sample
  starting_price = auction ? ((game[:bin_price] * 0.5) * 100).ceil / 100.00 : nil

  product = Product.create(seller_id: seller.id, category_id: 1, payment_policy_id: 1, shipping_policy_id: shipping_policy.id, return_policy_id: 1, 
    title: game[:title],
    condition: game[:condition],
    condition_description: game[:condition_description],
    bin_price: game[:bin_price],
    starting_price: starting_price,
    auction: auction,
    duration: rand(1..10),
    quantity: [1,1,1,1,1,1,2,3,4,5].sample,
    description: "Lorem ipsum dolor sit amet, in has assentior intellegat maiestatis, animal vituperata conclusionemque et eam. Nibh novum vix ex, cum id dolores invenire sensibus, integre urbanitas honestatis pro ad. Mel utroque fuisset adversarium id. Alia viris epicuri at mea, sed dico labitur ea. Ne vix convenire ocurreret. Pro prima similique reprimique ei, ea oblique incorrupte quaerendum mea, stet dolor ad cum.

Ex magna maluisset sit, cu elitr corpora officiis qui. Ius etiam putent aperiam an, cibo timeam ut est, eros etiam singulis pri in. Per oblique labores scribentur at, appareat omittantur et nec, ea noster voluptatum eam. Pro ei vide lobortis reprimique, sea sale epicuri vituperata ne. Pericula sadipscing eam an.

In has vocibus feugait, id mea munere dolorum. Movet interesset vis in, mea ex lobortis ocurreret moderatius. Pro ad tamquam prompta, eum ad nonumy quidam repudiare, eam magna aliquip invenire ea. Eum probo liberavisse et. Mea molestie convenire definitiones ne, te congue recusabo vituperatoribus est.

Sed iudico ullamcorper in, vel noster voluptua disputationi an, no quem sumo nibh his. Ea alii timeam placerat mei, pro at timeam latine. Utroque insolens id per, ius in quod sententiae. Movet nostro epicuri sit cu, ei maiorum tacimates pertinax eos, splendide forensibus intellegebat nec eu. No vix perfecto adolescens. Alterum probatus mediocritatem vel no, probatus vulputate liberavisse qui ut, primis semper option id quo.

Utroque ullamcorper ea nam, laoreet accusata contentiones quo no. Eos summo officiis cu. Vel odio stet fastidii et, offendit praesent assueverit duo eu. Sit summo iusto fuisset ad, ne quot regione explicari nam."
  )
  
  if product.auction
    rand(0..7).times do |i|
      break if product.starting_price + i >= product.bin_price
      Bid.create(product_id: product.id, buyer_id: rand(5..104), bid: starting_price + i)
    end 
  end

  images = game[:images].split(";")
  uploaded_images = []
  (5).downto(0) do |i|
    next if !images[i]

    img_tag = images[i].split('/')[-2..-1].join("/")
    next if uploaded_images.include?(img_tag)

    ProductImage.create(product_id: product.id, image_url: images[i])
    uploaded_images.push(img_tag)
  end 
end 

# BOOK SEEDS

seller = User.create(firstname: "Book", lastname: "Seller", username: "TheBookSeller", email: 'thebookseller@gmail.com', business: true, password: 'password')

BOOK_SEEDS.each do |book|
  book_location = book[:location].split(", ")
  location = Location.create(user_id: seller.id, country: book_location[2], state: book_location[1], city: book_location[0])
  shipping_policy = ShippingPolicy.create(user_id: seller.id, location_id: location.id)

  auction = [true, false].sample
  starting_price = auction ? ((book[:bin_price] * 0.5) * 100).ceil / 100.00 : nil

  product = Product.create(seller_id: seller.id, category_id: 2, payment_policy_id: 1, shipping_policy_id: shipping_policy.id, return_policy_id: 1, 
    title: book[:title],
    condition: book[:condition],
    condition_description: book[:condition_description],
    bin_price: book[:bin_price],
    starting_price: starting_price,
    auction: auction,
    duration: rand(1..10),
    quantity: [1,1,1,1,1,1,2,3,4,5].sample,
    description: "Lorem ipsum dolor sit amet, in has assentior intellegat maiestatis, animal vituperata conclusionemque et eam. Nibh novum vix ex, cum id dolores invenire sensibus, integre urbanitas honestatis pro ad. Mel utroque fuisset adversarium id. Alia viris epicuri at mea, sed dico labitur ea. Ne vix convenire ocurreret. Pro prima similique reprimique ei, ea oblique incorrupte quaerendum mea, stet dolor ad cum.

Ex magna maluisset sit, cu elitr corpora officiis qui. Ius etiam putent aperiam an, cibo timeam ut est, eros etiam singulis pri in. Per oblique labores scribentur at, appareat omittantur et nec, ea noster voluptatum eam. Pro ei vide lobortis reprimique, sea sale epicuri vituperata ne. Pericula sadipscing eam an.

In has vocibus feugait, id mea munere dolorum. Movet interesset vis in, mea ex lobortis ocurreret moderatius. Pro ad tamquam prompta, eum ad nonumy quidam repudiare, eam magna aliquip invenire ea. Eum probo liberavisse et. Mea molestie convenire definitiones ne, te congue recusabo vituperatoribus est.

Sed iudico ullamcorper in, vel noster voluptua disputationi an, no quem sumo nibh his. Ea alii timeam placerat mei, pro at timeam latine. Utroque insolens id per, ius in quod sententiae. Movet nostro epicuri sit cu, ei maiorum tacimates pertinax eos, splendide forensibus intellegebat nec eu. No vix perfecto adolescens. Alterum probatus mediocritatem vel no, probatus vulputate liberavisse qui ut, primis semper option id quo.

Utroque ullamcorper ea nam, laoreet accusata contentiones quo no. Eos summo officiis cu. Vel odio stet fastidii et, offendit praesent assueverit duo eu. Sit summo iusto fuisset ad, ne quot regione explicari nam."
  )
  
  if product.auction
    rand(0..7).times do |i|
      break if product.starting_price + i >= product.bin_price
      Bid.create(product_id: product.id, buyer_id: rand(5..104), bid: starting_price + i)
    end 
  end

  images = book[:images].split(";")
  uploaded_images = []
  (5).downto(0) do |i|
    next if !images[i]

    img_tag = images[i].split('/')[-2..-1].join("/")
    next if uploaded_images.include?(img_tag)

    ProductImage.create(product_id: product.id, image_url: images[i])
    uploaded_images.push(img_tag)
  end 
end 

# PET TOY SEEDS

seller = User.create(firstname: "Pet Toy", lastname: "Seller", username: "DoggoToysDeluxe", email: 'doggotoysdeluxe@gmail.com', business: true, password: 'password')

PET_TOY_SEEDS.each do |toy|
  toy_location = toy[:location].split(", ")
  location = Location.create(user_id: seller.id, country: toy_location[2], state: toy_location[1], city: toy_location[0])
  shipping_policy = ShippingPolicy.create(user_id: seller.id, location_id: location.id)

  auction = [true, false].sample
  starting_price = auction ? ((toy[:bin_price] * 0.5) * 100).ceil / 100.00 : nil

  product = Product.create(seller_id: seller.id, category_id: 3, payment_policy_id: 1, shipping_policy_id: shipping_policy.id, return_policy_id: 1, 
    title: toy[:title],
    condition: toy[:condition],
    condition_description: toy[:condition_description],
    bin_price: toy[:bin_price],
    starting_price: starting_price,
    auction: auction,
    duration: rand(1..10),
    quantity: [1,1,1,1,1,1,2,3,4,5].sample,
    description: "Lorem ipsum dolor sit amet, in has assentior intellegat maiestatis, animal vituperata conclusionemque et eam. Nibh novum vix ex, cum id dolores invenire sensibus, integre urbanitas honestatis pro ad. Mel utroque fuisset adversarium id. Alia viris epicuri at mea, sed dico labitur ea. Ne vix convenire ocurreret. Pro prima similique reprimique ei, ea oblique incorrupte quaerendum mea, stet dolor ad cum.

Ex magna maluisset sit, cu elitr corpora officiis qui. Ius etiam putent aperiam an, cibo timeam ut est, eros etiam singulis pri in. Per oblique labores scribentur at, appareat omittantur et nec, ea noster voluptatum eam. Pro ei vide lobortis reprimique, sea sale epicuri vituperata ne. Pericula sadipscing eam an.

In has vocibus feugait, id mea munere dolorum. Movet interesset vis in, mea ex lobortis ocurreret moderatius. Pro ad tamquam prompta, eum ad nonumy quidam repudiare, eam magna aliquip invenire ea. Eum probo liberavisse et. Mea molestie convenire definitiones ne, te congue recusabo vituperatoribus est.

Sed iudico ullamcorper in, vel noster voluptua disputationi an, no quem sumo nibh his. Ea alii timeam placerat mei, pro at timeam latine. Utroque insolens id per, ius in quod sententiae. Movet nostro epicuri sit cu, ei maiorum tacimates pertinax eos, splendide forensibus intellegebat nec eu. No vix perfecto adolescens. Alterum probatus mediocritatem vel no, probatus vulputate liberavisse qui ut, primis semper option id quo.

Utroque ullamcorper ea nam, laoreet accusata contentiones quo no. Eos summo officiis cu. Vel odio stet fastidii et, offendit praesent assueverit duo eu. Sit summo iusto fuisset ad, ne quot regione explicari nam."
  )
  
  if product.auction
    rand(0..7).times do |i|
      break if product.starting_price + i >= product.bin_price
      Bid.create(product_id: product.id, buyer_id: rand(5..104), bid: starting_price + i)
    end 
  end

  images = toy[:images].split(";")
  uploaded_images = []
  (5).downto(0) do |i|
    next if !images[i]

    img_tag = images[i].split('/')[-2..-1].join("/")
    next if uploaded_images.include?(img_tag)

    ProductImage.create(product_id: product.id, image_url: images[i])
    uploaded_images.push(img_tag)
  end 
end 

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Call of Duty 4 Modern Warfare (Xbox 360 2008)", 
#     subtitle: "The best of all the call of duty games", 
#     sku: "22700001", 
#     condition: "Used", 
#     condition_description: "Game is in great condition. Case and manual included.", 
#     auction: true, 
#     duration: 7, 
#     starting_price: 19.99, 
#     bin_price: 24.99, 
#     quantity: 1, 
#     description: "Product Information Developer Infinity Ward returns with its third full installment in the Call of Duty series (Treyarch having developed Call of Duty 3) with Call of Duty 4: Modern Warfare. Eschewing the traditional WWII setting that has been the hallmark of the series, Call of Duty 4 takes on the more nebulous world of modern warfare. Nazi storm troopers and kamikaze pilots have been replaced by a patchwork group of terrorists and insurgents, and traditional WWII weapons have been jettisoned in favor of more than 70 modern armaments. Though the story is a departure from the previous games, Call of Duty 4 still features intense mission-based first-person shooter gameplay that should be familiar to fans. The plot centers on two megalomaniacal madmen who are fomenting unrest around the world in an attempt to cement their own power. Imran Zakhaev is a one-armed Russia nationalist who longs to return his country to a Soviet Union style of government by seizing a stockpile of nuclear weapons. Zakhaev has support from several divisions of the Russian army, but, knowing that the United States would quickly come to the aid of the Russian government, he funds a coup in the Middle East to divert attention. Led by Zakhaev ally Khaled Al-Asad, the Middle Eastern coup results in intense fighting which eventually leads to the launch of a Russian nuclear missile toward American soil. Players fight through this chaos as both Sergeant John MacTavish, a British SAS operative doing battle in Russia, and Sergeant Paul Jackson, a U.S. Marine fighting in the Middle East. Call of Duty 4 aims to capture the challenges of modern war by pitting the superior technology of the U.S Marines and British SAS against the cunning guerilla tactics of a terrorist group. In addition to close quarters combat, players will be called upon to perform fast-rope helicopter drops, provide air support from an AH-1 Super Cobra helicopter, call in precision air strikes, and man the turret of an AC-130 Spectre Gunship to engage enemy fighters from the sky. Gamers also join a two man sniper team on a flashback mission in which players head to the Chernobyl Zone of Alienation on a mission to assassinate a younger Zakhaev. Modern Warfare features an expansive set of online multiplayer modes. Players will be able to choose from Assault, Special Ops, Light Machine Gunner, Demolitions, and Sniper classes, or create up to five special classes with customizable weapons and perks. Gamers can then take their fighters through a dozen different multiplayer modes like Free-for-All, Team Deathmatch, Search and Destroy, Headquarters, Domination, and Sabotage. Players who frequently battle online will be able to accrue experience points, unlock special weapons and gear, and eventually unlock Prestige Mode in which gamers can trade in their rank for special insignias.")

# file = File.open("app/assets/images/cod4image1.jpg")
# product.photos.attach(io: file, filename: "cod4image1.jpg")

# file = File.open("app/assets/images/cod4image2.jpg")
# product.photos.attach(io: file, filename: "cod4image2.jpg")

# file = File.open("app/assets/images/cod4image3.jpg")
# product.photos.attach(io: file, filename: "cod4image3.jpg")

# file = File.open("app/assets/images/cod4image4.jpg")
# product.photos.attach(io: file, filename: "cod4image4.jpg")

# # ---------------------

# # product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
# #     title: ,
# #     condition: 'New',
# #     auction: true,
# #     starting_price: ,
# #     bin_price: ,
# #     quantity: 1,
# #     description: 'The best pet toy ever made!'
# # )

# # file = File.open("app/assets/images/.jpg")
# # product.photos.attach(io: file, filename: ".jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "The Great Gatsby",
#     condition: "New",
#     auction: false,
#     bin_price: 9.99,
#     quantity: 1,
#     description: 'he Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The Great Gatsby, F. Scott Fitzgeralds third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink and sex the national obsession,” it is an exquisitely crafted tale of America in the 1920s.'
# )

# file = File.open("app/assets/images/gatsby.jpg")
# product.photos.attach(io: file, filename: "gatsby.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Of Mice and Men",
#     condition: "Used",
#     auction: true,
#     starting_price: 14.99,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "While the powerlessness of the laboring class is a recurring theme in Steinbeck's work of the late 1930s, he narrowed his focus when composing Of Mice and Men (1937), creating an intimate portrait of two men facing a world marked by petty tyranny, misunderstanding, jealousy, and callousness. But though the scope is narrow, the theme is universal; a friendship and a shared dream that makes an individual's existence meaningful."
# )

# file = File.open("app/assets/images/miceandmen.jpg")
# product.photos.attach(io: file, filename: "miceandmen.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "The Hate U Give",
#     condition: "New",
#     auction: false,
#     bin_price: 12.95,
#     quantity: 1,
#     description: 'Eight Starred Reviews! "Absolutely riveting!" —Jason Reynolds "Stunning." —John Green "This story is necessary. This story is important." —Kirkus Reviews (starred review) "Heartbreakingly topical." —Publishers Weekly (starred review)'
# )

# file = File.open("app/assets/images/thehateyougive.jpg")
# product.photos.attach(io: file, filename: "thehateyougive.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Lord of the Flies",
#     condition: "Used",
#     auction: false,
#     bin_price: 9.99,
#     quantity: 1,
#     description: "Lord of the Flies remains as provocative today as when it was first published in 1954, igniting passionate debate with its startling, brutal portrait of human nature. Though critically acclaimed, it was largely ignored upon its initial publication. Yet soon it became a cult favorite among both students and literary critics who compared it to J.D. Salinger's The Catcher in the Rye in its influence on modern thought and literature."
# )

# file = File.open("app/assets/images/lordoftheflies.jpg")
# product.photos.attach(io: file, filename: "lordoftheflies.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "1984",
#     condition: "Used",
#     auction: true,
#     starting_price: 4.99,
#     bin_price: 9.99,
#     quantity: 1,
#     description: "View our feature on George Orwell’s 1984.Written in 1948, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, Orwell’s narrative is timelier than ever. 1984 presents a startling and haunting vision of the world, so powerful that it is completely convincing from start to finish. No one can deny the power of this novel, its hold on the imaginations of multiple generations of readers, or the resiliency of its admonitions—a legacy that seems only to grow with the passage of time."
# )

# file = File.open("app/assets/images/1984.jpg")
# product.photos.attach(io: file, filename: "1984.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Gold Is A Better Way: And Other Wealth Building Secrets Wall Street Doesn't Want You To Know",
#     condition: "New",
#     auction: false,
#     bin_price: 24.99,
#     quantity: 1,
#     description: "Gold Is A Better Way is a financially enlightening guide that reveals the shocking truth about where the markets are headed and why owning physical gold is a far better strategy to building real wealth as opposed to the inflated paper assets Wall Street recommends. There is a massive environmental shift happening in financial markets. Interest rates are rising and what has been very easy for investors in the past is about to become very hard. Everything people think they know about investing is being turned on its head. It's time to change investing behavior."
# )

# file = File.open("app/assets/images/goldisbetter.jpg")
# product.photos.attach(io: file, filename: "goldisbetter.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "To Kill a Mockingbird",
#     condition: "Used",
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "Lawyer Atticus Finch defends the real mockingbird of Harper Lee's classic, Puliter Prize-winning novel—a black man charged with the rape of a white woman. Through the eyes of Atticus's children, Scout and Jem Finch, Harper Lee explores with rich humor and unanswering honesty the irrationality of adult attitudes toward race and class in the Deep South of the 1930's."
# )

# file = File.open("app/assets/images/mockingbird.jpg")
# product.photos.attach(io: file, filename: "mockingbird.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "The Russia Hoax: The Illicit Scheme to Clear Hillary Clinton and Frame Donald Trump",
#     condition: "New",
#     auction: true,
#     starting_price: 16.95,
#     quantity: 1,
#     description: "Fox News legal analyst Gregg Jarrett reveals the real story behind Hillary Clinton’s deep state collaborators in government and exposes their nefarious actions during and after the 2016 election. The Russia Hoax reveals how persons within the FBI and Barack Obama’s Justice Department worked improperly to help elect Hillary Clinton and defeat Donald Trump in the 2016 presidential election. When this suspected effort failed, those same people appear to have pursued a contrived investigation of President Trump in an attempt to undo the election results and remove him as president." 
# )

# file = File.open("app/assets/images/russiahoax.jpg")
# product.photos.attach(io: file, filename: "russiahoax.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Texas Ranger",
#     condition: 'Used',
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 14.99,
#     quantity: 1,
#     description: "Across the ranchlands and cities of his home state, Rory Yates's discipline and law-enforcement skills have carried him far: from local highway patrolman to the honorable rank of Texas Ranger. He arrives in his hometown to find a horrifying crime scene and a scathing accusation: he is named a suspect in the murder of his ex-wife, Anne, a devoted teacher whose only controversial act was ending her marriage to a Ranger."
# )

# file = File.open("app/assets/images/texasranger.jpg")
# product.photos.attach(io: file, filename: "texasranger.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Crazy Rich Asians",
#     condition: "New",
#     auction: false,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "When New Yorker Rachel Chu agrees to spend the summer in Singapore with her boyfriend, Nicholas Young, she envisions a humble family home and quality time with the man she hopes to marry. But Nick has failed to give his girlfriend a few key details. One, that his childhood home looks like a palace; two, that he grew up riding in more private planes than cars; and three, that he just happens to be the country’s most eligible bachelor."
# )

# file = File.open("app/assets/images/crazyrichasians.jpg")
# product.photos.attach(io: file, filename: "crazyrichasians.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Blood Communion: A Tale of Prince Lestat (Signed Book)",
#     condition: 'Used',
#     auction: true,
#     starting_price: 14.95,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "The Vampire Chronicles continue with a riveting, rich saga--part adventure, part fairy-tale--of Prince Lestat and the story of the Blood Communion as he tells the tale of his coming to rule the vampire world and the eternal struggle to find belonging, a place in the universe for the undead, and how, against his will, he must battle the menacing, seemingly unstoppable force determined to thwart his vision and destroy the entire vampire netherworld."
# )

# file = File.open("app/assets/images/bloodcommunion1.jpg")
# product.photos.attach(io: file, filename: "bloodcommunion1.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Unhinged: An Insider's Account of the Trump White House",
#     condition: 'Used',
#     auction: false,
#     bin_price: 15.99,
#     quantity: 1,
#     description: "Few have been a member of Donald Trump’s inner orbit longer than Omarosa Manigault Newman. Their relationship has spanned fifteen years—through four television shows, a presidential campaign, and a year by his side in the most chaotic, outrageous White House in history. But that relationship has come to a decisive and definitive end, and Omarosa is finally ready to share her side of the story in this explosive, jaw-dropping account."
# )

# file = File.open("app/assets/images/unhinged1.jpg")
# product.photos.attach(io: file, filename: "unhinged1.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "When Darkness Falls, He Doesn't Catch It",
#     condition: 'New',
#     auction: true,
#     starting_price: 14.99,
#     quantity: 1,
#     description: "You’re goddamn right I’m still sitting at the same weathered wooden table in the back of Manhattan’s oldest bar where I just finished my first masterpiece At Night She Cries, While He Rides His Steed. The second I finished it, I started writing this one. I’m now 14 beers deep, and I’ve polished off an entire eight ball of yay. The phrase “everything in moderation” applies to everything except cocaine, booze, and prostitutes. If you haven’t read my last book then you probably won’t fucking understand anything in this book, so you should probably go buy that first and stop being poor. It’s fucking gross." 
# )

# file = File.open("app/assets/images/whendarknessfalls1.jpg")
# product.photos.attach(io: file, filename: "whendarknessfalls1.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Girl, Wash Your Face: Stop Believing the Lies About Who You Are So You Can Become Who You Were Meant to Be",
#     condition: 'New',
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 14.99,
#     quantity: 1,
#     description: "Girl, Wash Your Face: Stop Believing the Lies About Who You Are So You Can Become Who You Were Meant to Be by Rachel Hollis #1 NEW YORK TIMES BESTSELLER Do you ever suspect that everyone else has life figured out and you don’t have a clue? If so, Rachel Hollis has something to tell you: that’s a lie. As the founder of the lifestyle website TheChicSite.com and CEO of her own media company, Rachel Hollis developed an immense online community by sharing tips for better living while fearlessly revealing the messiness of her own life. Now, in this challenging and inspiring new book, Rachel exposes the twenty lies and misconceptions that"
# )

# file = File.open("app/assets/images/girlwashyourface1.jpg")
# product.photos.attach(io: file, filename: "girlwashyourface1.jpg")

# product = Product.create(seller_id: 6, category_id: 2, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Stretched Too Thin: How Working Moms Can Lose the Guilt, Work Smarter, and Thrive",
#     condition: 'Used',
#     auction: false,
#     bin_price: 13.95,
#     quantity: 1,
#     description: "Stretched Too Thin: How Working Moms Can Lose the Guilt, Work Smarter, and Thrive by Jessica N. Turner. Working mothers constantly battle the pull to do all the things well. From managing work and home responsibilities to being impacted by a lack of self-care and time for deep friendships, the struggle is real. At the end of each day, many working moms are exhausted and stretched too thin. But this does not have to be the norm. In her latest practical and inspiring book, Jessica Turner shows the working mom how to - work and parent guilt-free - establish clear work boundaries"
# )

# file = File.open("app/assets/images/stretchedtoothin1.jpg")
# product.photos.attach(io: file, filename: "stretchedtoothin1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: '2014 FIFA World Cup Brazil',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 6.99,
#     bin_price: 9.99,
#     quantity: 1,
#     description: "Experience all the Fun, Excitement, and Drama of Football's Greatest Event. Multiple improvements and innovations to the award-winning gameplay of FIFA 14, plus 100 new animations, make EA SPORTS 2014 FIFA World Cup Brazil the most accessible, fun, and exciting EA SPORTS FIFA title on Xbox 360 and PlayStation 3. Bring to life the world's greatest tournament by choosing from 203 National Teams in the deepest set of modes ever in a tournament title from EA SPORTS. Immerse yourself in the FIFA World Cup as you play in authentic Brazilian stadiums, and recognize the support of newly rendered crowds created to replicate the passion and pageantry of the 2014 FIFA World Cup Brazil."
# )

# file = File.open("app/assets/images/2014fifa1.jpg")
# product.photos.attach(io: file, filename: "2014fifa1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Far Cry 4',
#     condition: 'New',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: false,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "Hidden in the towering Himalayas lies Kyrat, a country steeped in tradition and violence. You are Ajay Ghale. Traveling to Kyrat to fulfill your mother's dying wish, you find yourself caught up in a civil war to overthrow the oppressive regime of dictator Pagan Min. Explore and navigate this vast open world, where danger and unpredictability lurk around every corner. Here, every decision counts, and every second is a story. Welcome to Kyrat. SEQUEL TO THE #1 RATED SHOOTER OF 2012*"
# )

# file = File.open("app/assets/images/farcry41.jpg")
# product.photos.attach(io: file, filename: "farcry41.jpg")
# file = File.open("app/assets/images/farcry42.jpg")
# product.photos.attach(io: file, filename: "farcry42.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Valiant Heart: The Great War',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 14.99,
#     quantity: 1,
#     description: "This is the story of crossed destinies and a broken love in a world torn apart. In Valiant Hearts: The Great War, the lives of all the characters are inextricably drawn together over the course of the game. All of them will try to survive the horror of the trenches, following their faithful canine companion. Friendship, love, sacrifice, and tragedy befall each one as they help each other to retain their humanity against the horrors of war."
# )

# file = File.open("app/assets/images/valiantheart1.jpg")
# product.photos.attach(io: file, filename: "valiantheart1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'XCOM: Enemy Within',
#     condition: 'For parts of not working',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: false,
#     bin_price: 4.99,
#     quantity: 1,
#     description: "XCOM®: Enemy Within is a standalone expansion to the 2012 Game of the Year award-winning strategy game XCOM: Enemy Unknown. Enemy Within features the core experience of Enemy Unknown plus even more content including all-new soldiers and abilities, enemy threats, maps and missions and multiplayer content providing a fresh new gameplay experience. Also included is the Elite Soldier Pack, plus the Slingshot and Second Wave add-on content."
# )

# file = File.open("app/assets/images/xcom1.jpg")
# product.photos.attach(io: file, filename: "xcom1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Battlefield Bad Company 2',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 14.99,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "Get ready for the most spectacular FPS multiplayer experience ever! Battlefield Bad Company 2 brings the spectacular Battlefield gameplay to the forefront of next-gen consoles and PC - featuring best-in-class vehicular combat set across 8 huge sandbox maps each with a different tactical focus. New vehicles like the All Terrain Vehicle (ATV) and the UH-60 transport helicopter allow for all-new multiplayer tactics in the warzone, extensive tuning ensures that this will be the most satisfying vehicle combat experience to date."
# )

# file = File.open("app/assets/images/badcompany21.jpg")
# product.photos.attach(io: file, filename: "badcompany21.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Lara Croft and the Guardian of Light',
#     condition: 'New',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 14.99,
#     quantity: 1,
#     description: "Experience the first ever co-op action-adventure game featuring Lara Croft. Team up with a friend or go at it alone as you traverse and solve deadly traps, fight hordes of undead enemies, and collect over 60 artifacts and relics. Lara Croft and the Guardian of Light offers fast-paced action and breathtaking visuals shown through an isometric view."
# )

# file = File.open("app/assets/images/laracroftguardian1.jpg")
# product.photos.attach(io: file, filename: "laracroftguardian1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'SpongeBob HeroPants',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: false,
#     bin_price: 24.99,
#     quantity: 1,
#     description: "Only a hero would dare to enter the world of SpongeBob's candy and rainbow filled mind! Play as SpongeBob as Invincibubble and all of his friends! Dive into SpongeBob's crazy imagination with enemies like Burger Spatulas, the terrifying Lollipop Creatures and even Squidasaurus! Weave your way through obstacles and puzzles in environments like Dream Land and Prehistoric Bikini Bottom! Collect pirate coins to upgrade your characters with special hero abilities! Play with up to 4 people in multi-player mode on the Xbox 360 gaming system!"
# )

# file = File.open("app/assets/images/spongebob1.jpg")
# product.photos.attach(io: file, filename: "spongebob1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Call of Duty: Advanced Warfare Havoc ',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 14.99,
#     quantity: 1,
#     description: "Get ready for Havoc, the first downloadable content pack for Call of Duty®: Advanced Warfare, featuring the all-new Exo Zombies co-op experience, the all-new versatile AE4 directed energy assault rifle, the AE4 Widowmaker custom variant, and four new Multiplayer maps, tailor-made to unleash your exoskeleton's power."
# )

# file = File.open("app/assets/images/codhavok1.jpg")
# product.photos.attach(io: file, filename: "codhavok1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Toy Soldiers: Cold War',
#     condition: 'New',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: false,
#     bin_price: 14.99,
#     quantity: 1,
#     description: "Toy Soldiers: Cold War is an action strategy video game, developed by Signal Studios. It is the sequel to Toy Soldiers. Toy Soldiers: Cold War features 1980s-era military technology, and is based around the idea of military aggression escalating between the United States and the USSR. Toy Soldiers: Cold War features a blend of third-person action and strategy, similar to the original Toy Soldiers, but with added features and gameplay mechanics."
# )

# file = File.open("app/assets/images/toysoldiers1.jpg")
# product.photos.attach(io: file, filename: "toysoldiers1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Battlefield 4 Premium',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 49.99,
#     bin_price: 59.99,
#     quantity: 1,
#     description: "Own more, be more with a Battlefield 4 Premium membership. Get the competitive edge with two-week early access to all five expansions, and keep the action going all year long with weekly content and 12 additional Battlepacks. Get into the battle faster with priority position in server queues and participate in Premium events. Dominate in style by personalizing your Battlefield 4 experience with exclusive camos, paints, emblems, dog tags and more. You can even transfer your Battlefield 4 Premium membership across platforms to seamlessly usher in the next generation of consoles. From the Xbox 360 to Xbox One and from the PlayStation 3 to PlayStation 4, take your Premium membership and all its incredible perks with you as you upgrade."
# )

# file = File.open("app/assets/images/battlefield41.jpg")
# product.photos.attach(io: file, filename: "battlefield41.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Dark Souls II Crown of the Old Iron King',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 9.99,
#     quantity: 1,
#     description: '"DARK SOULS II Crown of the Old Iron King" is the second of 3 large-scale DLC additions to DARK SOULS II, and includes all-new stages, maps, boss characters, weapons & armor! In this second DLC, players will find themselves in a world shrouded in ash. Can you find and recover the lost crown?'
# )

# file = File.open("app/assets/images/darksoulsii1.jpg")
# product.photos.attach(io: file, filename: "darksoulsii1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'State of Decay',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: false,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "State of Decay is an ambitious zombie-survival-fantasy game, currently available for Xbox 360 and PC. We’ve all sat around with friends, debating the best ways to survive the zombie apocalypse. Well, the time for speculation is over; State of Decay will let you put your personal survival plan to the test."
# )

# file = File.open("app/assets/images/stateofdecay1.jpg")
# product.photos.attach(io: file, filename: "stateofdecay1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: "Madden NFL 16",
#     condition: 'New',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 12.99,
#     quantity: 1,
#     description: "Be the playmaker in Madden NFL 16 with all-new controls that allow you to dominate in the battle for air supremacy. New QB mechanics including body-relative throws and touch passes provide unprecedented depth and control while under center."
# )

# file = File.open("app/assets/images/madden161.jpg")
# product.photos.attach(io: file, filename: "madden161.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'South Park: The Stick of Truth',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 14.99,
#     quantity: 1,
#     description: "From the perilous battlefields of the fourth-grade playground, a young hero will rise, destined to be South Park's savior."
# )

# file = File.open("app/assets/images/southpark1.jpg")
# product.photos.attach(io: file, filename: "southpark1.jpg")
# file = File.open("app/assets/images/southpark2.jpg")
# product.photos.attach(io: file, filename: "southpark2.jpg")
# file = File.open("app/assets/images/southpark3.jpg")
# product.photos.attach(io: file, filename: "southpark3.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Alien: Isolation',
#     condition: 'For parts or not working',
#     condition_description: "Game is broken.",
#     auction: false,
#     bin_price: 1.99,
#     quantity: 1,
#     description: "The game is set in 2137, 15 years after the events of Alien and 42 years before the events of Aliens. It focuses on Ellen Ripley's daughter Amanda who, while investigating her mother's disappearance, is ordered to go to the space station Sevastopol to recover data that could help locate her mother, unaware that an Alien has already infested the station."
# )

# file = File.open("app/assets/images/alientisolation1.jpg")
# product.photos.attach(io: file, filename: "alientisolation1.jpg")
# file = File.open("app/assets/images/alienisolation2.jpg")
# product.photos.attach(io: file, filename: "alienisolation2.jpg")
# file = File.open("app/assets/images/alienisolation3.jpg")
# product.photos.attach(io: file, filename: "alienisolation3.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Grand Theft Auto V',
#     condition: 'New',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 19.99,
#     quantity: 1,
#     description: "A young street hustler, a retired bank robber and a terrifying psychopath must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other. Los Santos: a sprawling sun-soaked metropolis full of self-help gurus, starlets, and fading celebrities, once the envy of the Western world, now struggling to stay afloat in an era of economic uncertainty and cheap reality TV. Amidst the turmoil, three very different criminals plot their own chances of survival and success: Franklin, a former street gangster, now looking for real opportunities and serious money; Michael, a professional ex-con whose retirement is a lot less rosy than he hoped it would be; and Trevor, a violent maniac driven by the next big score. Running out of options, the crew risks everything in a series of daring and dangerous heists that could set them up for life. The biggest, most dynamic and most diverse open world ever created, Grand Theft Auto V blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game's three lead characters, playing all sides of the game's interwoven story. All the classic hallmarks of the groundbreaking series return, including incredible attention to detail and Grand Theft Auto's darkly humorous take on modern culture, alongside a brand new and ambitious approach to open world multiplayer."
# )

# file = File.open("app/assets/images/grandtheftautov1.jpg")
# product.photos.attach(io: file, filename: "grandtheftautov1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'BioShock Infinite',
#     condition: 'New',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 2.99,
#     bin_price: 29.99,
#     quantity: 1,
#     description: "Indebted to the wrong people, and with his life on the line, hired gun Booker DeWitt has only one opportunity to wipe his slate clean. He must rescue Elizabeth, a mysterious girl imprisoned since childhood and locked up in the flying city of Columbia. Forced to trust one another, Booker and Elizabeth form a powerful bond during their daring escape. Together, they learn to harness an expanding arsenal of weapons and abilities, as they fight on zeppelins in the clouds, along high-speed Sky-Lines, and down in the streets of Columbia, all while surviving the threats of the air-city and uncovering its dark secret."
# )

# file = File.open("app/assets/images/bioshockinfinite1.jpg")
# product.photos.attach(io: file, filename: "bioshockinfinite1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Grand Theft Auto IV',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 4.99,
#     bin_price: 19.99,
#     quantity: 1,
#     description: "What does the American Dream mean today? For Niko Bellic, fresh off the boat from Europe, it is the hope he can escape his past. For his cousin, Roman, it is the vision that together they can find fortune in Liberty City, gateway to the land of opportunity. As they slip into debt and are dragged into a criminal underworld by a series of shysters, thieves and sociopaths, they discover that the reality is very different from the dream in a city that worships money and status, and is heaven for those who have them and a living nightmare for those who don't."
# )

# file = File.open("app/assets/images/grandtheftautoiv1.jpg")
# product.photos.attach(io: file, filename: "grandtheftautoiv1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Gears of War 2',
#     condition: 'New',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: false,
#     bin_price: 0.99,
#     quantity: 1,
#     description: 'Gears of War 2 is the highly anticipated sequel to the 5 million-selling blockbuster action game and one of the most popular Xbox games in history. Players continue as Marcus Fenix, a reluctant war hero and leader of Delta Squad, six months after the events of Gears of War. The last cities on Sera are sinking, swallowed by a new Locust threat from below. A massive counterattack is humanitys last hope for survival.'
# )

# file = File.open("app/assets/images/gearsofwar1.jpg")
# product.photos.attach(io: file, filename: "gearsofwar1.jpg")

# product = Product.create(seller_id: 5, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Red Dead Redemption',
#     condition: 'Used',
#     condition_description: "Game is in great condition. Case and manual included.",
#     auction: true,
#     starting_price: 9.89,
#     quantity: 1,
#     description: 'Winner of over 100 Game of the Year awards including Spike Video Game Awards, Machinima Inside Gaming Awards, GameSpot, Games Radar, Spin, CNET, Associated Press and NY Post. America, 1911. The Wild West is dying. When federal agents threaten his family, former outlaw John Marston is forced to pick up his guns again and hunt down the gang of criminals he once called friends. Experience an epic fight for survival across the sprawling expanses of the American West and Mexico, as John Marston struggles to bury his bloodstained past, one man at a time.'
# )

# file = File.open("app/assets/images/reddeadredemption1.jpg")
# product.photos.attach(io: file, filename: "reddeadredemption1.jpg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Tennis Ball Squeaker Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 0.99,
#     bin_price: 1.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/tennisballdogtoy.jpeg")
# product.photos.attach(io: file, filename: "tennisballdogtoy.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Plus Ring Chew Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 4.99,
#     bin_price: 7.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/plusringchew.jpeg")
# product.photos.attach(io: file, filename: "plusringchew.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Crackle Squeeze Bone Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 4.99,
#     bin_price: 7.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/squeezebonedogtoy.jpeg")
# product.photos.attach(io: file, filename: "squeezebonedogtoy.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Spike Ball Dog Toy - Squeaker',
#     condition: 'New',
#     auction: true,
#     starting_price: 1.99,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/spikeball.jpeg")
# product.photos.attach(io: file, filename: "spikeball.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Treat Dispensing Puppy Toy (Color Varies)',
#     condition: 'New',
#     auction: true,
#     starting_price: 6.95,
#     bin_price: 9.95,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/colortoys.jpeg")
# product.photos.attach(io: file, filename: "colortoys.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Baltimore Ravens NFL Flattie Crinkle Football Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 9.99,
#     bin_price: 11.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/ravens.jpeg")
# product.photos.attach(io: file, filename: "ravens.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Extreme Dog Toy - Treat Dispensing',
#     condition: 'New',
#     auction: true,
#     starting_price: 8.95,
#     bin_price: 11.95,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/extremetoy.jpeg")
# product.photos.attach(io: file, filename: "extremetoy.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Puppy Ring Chew Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 3.99,
#     bin_price: 6.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/puppyring.jpeg")
# product.photos.attach(io: file, filename: "puppyring.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Happy Birthday Tennis Ball Set',
#     condition: 'New',
#     auction: true,
#     starting_price: 2.99,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/bdaytennis.jpeg")
# product.photos.attach(io: file, filename: "bdaytennis.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Rosie The Rhino Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 3.99,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/rhino.jpeg")
# product.photos.attach(io: file, filename: "rhino.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Beaver Dog Toy - Stuffing Free',
#     condition: 'New',
#     auction: true,
#     starting_price: 2.89,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/beaver.jpeg")
# product.photos.attach(io: file, filename: "beaver.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Double Bond Chew Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 4.98,
#     bin_price: 9.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/doublebone.jpeg")
# product.photos.attach(io: file, filename: "doublebone.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Flying Disc Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 0.99,
#     bin_price: 2.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/frisby.jpeg")
# product.photos.attach(io: file, filename: "frisby.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Teddy Bear Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 1.99,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/teddybear.jpeg")
# product.photos.attach(io: file, filename: "teddybear.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Squeeze Stick Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 4.99,
#     bin_price: 7.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/squeezestick.jpeg")
# product.photos.attach(io: file, filename: "squeezestick.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Squeeze Ball Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 2.99,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/squeezeball.jpeg")
# product.photos.attach(io: file, filename: "squeezeball.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Puppy Chew Dental Dog Bone',
#     condition: 'New',
#     auction: true,
#     starting_price: 2.65,
#     bin_price: 2.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/dentalbone.jpeg")
# product.photos.attach(io: file, filename: "dentalbones.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Ali The Alligator Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 4.58,
#     bin_price: 5.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/alligator.jpeg")
# product.photos.attach(io: file, filename: "alligator.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Duck Dog Toy Plush Squeaker',
#     condition: 'New',
#     auction: true,
#     starting_price: 1.99,
#     bin_price: 3.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/duckdogtoy.jpeg")
# product.photos.attach(io: file, filename: "duckdogtoy.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Tennis Ball Set Squeaker Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 1.99,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/tennisballs.jpeg")
# product.photos.attach(io: file, filename: "tennisballs.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Elmer The Elephant Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 2.99,
#     bin_price: 5.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/elmer.jpeg")
# product.photos.attach(io: file, filename: "elmer.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Cozie Spunky Monkey Dog Toy',
#     condition: 'New',
#     auction: true,
#     starting_price: 4.99,
#     bin_price: 7.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/coziespunky.jpeg")
# product.photos.attach(io: file, filename: "coziespunky.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'CLassic Dog Toy-Treat Dispensor',
#     condition: 'New',
#     auction: true,
#     starting_price: 7.49,
#     bin_price: 19.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/treatdispensor.jpeg")
# product.photos.attach(io: file, filename: "treatdispensor.jpeg")

# product = Product.create(seller_id: 7, category_id: 3, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, 
#     title: 'Folding Toy Box',
#     condition: 'New',
#     auction: true,
#     starting_price: 2.99,
#     bin_price: 4.99,
#     quantity: 1,
#     description: 'The best pet toy ever made!'
# )

# file = File.open("app/assets/images/foldingtoybox.jpeg")
# product.photos.attach(io: file, filename: "foldingtoybox.jpeg")