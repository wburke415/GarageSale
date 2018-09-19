json.users do
  json.set! user.id do
    json.extract! user, :id, :firstname, :lastname, :email, :business, :username

    if user.listed_products
      listed_products = []

      user.listed_products.each do |product|
        listed_products.push(product.id)
      end 

      json.listedProducts listed_products
    end 
  
    if user.bidded_products
      bidded_products = []
      user.bidded_products.each do |product|
        bidded_products.push(product.id)
      end 

      json.biddedProducts bidded_products
    end 

    if user.purchased_products
      purchased_products = []
      user.purchased_products.each do |product|
        purchased_products.push(product.id)
      end 

      json.purchasedProducts purchased_products
    end 

    if user.watched_products
      watched_products = []
      user.watched_products.each do |product|
        watched_products.push(product.id)
      end 

      json.watchedProducts watched_products
    end 
  end   
end 

user.listed_products.each do |product|
  json.partial! "api/products/product.json.jbuilder", product: product
end

user.bidded_products.each do |product|
  json.partial! "api/products/product.json.jbuilder", product: product
end

user.purchased_products.each do |product|
  json.partial! "api/products/product.json.jbuilder", product: product
end

user.watched_products.each do |product|
  json.partial! "api/products/product.json.jbuilder", product: product
end

