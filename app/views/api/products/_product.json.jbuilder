
json.products do
  json.set! product.id do 
    json.extract! product, :id, :seller_id, :buyer_id, :shipping_policy_id, :category_id, :title, :subtitle, :search_string, :sku, :condition, :condition_description, :auction, :ends_at, :starting_price, :bin_price, :quantity, :description

    product_images = []
    product.photos.each { |photo| product_images.push(url_for(photo)) }
    product.product_images.each { |image| product_images.push(image.image_url) }
    json.productImages product_images
  end 
end

# if product.photos || product.product_images
#   json.productImages do
#     product.photos.each do |photo|
#       json.set! photo.id do
#         json.id  photo.id
#         json.imageUrl url_for(photo)
#       end 
#     end 

#     product.product_images.each do |image|
#       json.set! image.id do 
#         json.id image.id
#         json.imageUrl image.image_url
#       end 
#     end 
#   end 
# end 

if product.bids 
  json.bids do
    product.bids.each do |bid|
      json.set! bid.id do
        json.extract! bid, :id, :product_id, :buyer_id, :bid
      end 
    end 
  end 
end 

if product.shipping_policy 
  json.shippingPolicies do
    json.set! product.shipping_policy.id do
      json.extract! product.shipping_policy, :id, :user_id, :location_id, :shipping_cost, :service
    end 
  end 
end 

if product.seller
  json.sellers do
    json.set! product.seller.id do 
      json.extract! product.seller, :id, :username, :business
    end 
  end 
end 


if product.location 
  json.locations do
    json.set! product.location.id do
      json.extract! product.location, :id, :user_id, :country, :state, :city, :address, :zip_code
    end 
  end 
end