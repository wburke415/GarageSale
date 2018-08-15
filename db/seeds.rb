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

Location.create(user_id: 1)
ShippingPolicy.create(user_id: 1, location_id: 1)


(1..10).each do |i|
    product = Product.create(seller_id: 1, category_id: 1, payment_policy_id: 1, shipping_policy_id: 1, return_policy_id: 1, title: "Call of Duty 4 Modern Warfare (Xbox 360 2008)", subtitle: "The best of all the call of duty games", sku: "22700001", condition: "Like New", condition_description: "Game is in great condition. Case and manual included.", auction: true, duration: 30, starting_price: 19.99, bin_price: 24.99, quantity: 1, description: "Product Information
    Developer Infinity Ward returns with its third full installment in the Call of Duty series (Treyarch having developed Call of Duty 3) with Call of Duty 4: Modern Warfare. Eschewing the traditional WWII setting that has been the hallmark of the series, Call of Duty 4 takes on the more nebulous world of modern warfare. Nazi storm troopers and kamikaze pilots have been replaced by a patchwork group of terrorists and insurgents, and traditional WWII weapons have been jettisoned in favor of more than 70 modern armaments. Though the story is a departure from the previous games, Call of Duty 4 still features intense mission-based first-person shooter gameplay that should be familiar to fans.

    The plot centers on two megalomaniacal madmen who are fomenting unrest around the world in an attempt to cement their own power. Imran Zakhaev is a one-armed Russia nationalist who longs to return his country to a Soviet Union style of government by seizing a stockpile of nuclear weapons. Zakhaev has support from several divisions of the Russian army, but, knowing that the United States would quickly come to the aid of the Russian government, he funds a coup in the Middle East to divert attention. Led by Zakhaev ally Khaled Al-Asad, the Middle Eastern coup results in intense fighting which eventually leads to the launch of a Russian nuclear missile toward American soil. Players fight through this chaos as both Sergeant John MacTavish, a British SAS operative doing battle in Russia, and Sergeant Paul Jackson, a U.S. Marine fighting in the Middle East.

    Call of Duty 4 aims to capture the challenges of modern war by pitting the superior technology of the U.S Marines and British SAS against the cunning guerilla tactics of a terrorist group. In addition to close quarters combat, players will be called upon to perform fast-rope helicopter drops, provide air support from an AH-1 Super Cobra helicopter, call in precision air strikes, and man the turret of an AC-130 Spectre Gunship to engage enemy fighters from the sky. Gamers also join a two man sniper team on a flashback mission in which players head to the Chernobyl Zone of Alienation on a mission to assassinate a younger Zakhaev.

    Modern Warfare features an expansive set of online multiplayer modes. Players will be able to choose from Assault, Special Ops, Light Machine Gunner, Demolitions, and Sniper classes, or create up to five special classes with customizable weapons and perks. Gamers can then take their fighters through a dozen different multiplayer modes like Free-for-All, Team Deathmatch, Search and Destroy, Headquarters, Domination, and Sabotage. Players who frequently battle online will be able to accrue experience points, unlock special weapons and gear, and eventually unlock Prestige Mode in which gamers can trade in their rank for special insignias.")

    # file = File.open("/Users/whitman/Desktop/GarageSale/app/assets/images/cod4image1.jpg")
    file = File.open("app/assets/images/cod4image1.jpg")
    product.photos.attach(io: file, filename: "cod4image1.jpg")
    # file = File.open("/Users/whitman/Desktop/GarageSale/app/assets/images/cod4image2.jpg")
    file = File.open("app/assets/images/cod4image2.jpg")
    product.photos.attach(io: file, filename: "cod4image2.jpg")
    # file = File.open("/Users/whitman/Desktop/GarageSale/app/assets/images/cod4image3.jpg")
    file = File.open("app/assets/images/cod4image3.jpg")
    product.photos.attach(io: file, filename: "cod4image3.jpg")
    # file = File.open("/Users/whitman/Desktop/GarageSale/app/assets/images/cod4image4.jpg")
    file = File.open("app/assets/images/cod4image4.jpg")
    product.photos.attach(io: file, filename: "cod4image4.jpg")
end 