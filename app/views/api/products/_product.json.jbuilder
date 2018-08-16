
json.products do
    json.set! product.id do 
        json.extract! product, :id, :seller_id, :buyer_id, :sold, :shipping_policy_id, :title, :search_string, :subtitle, :sku, :condition, :condition_description, :auction, :duration, :starting_price, :bin_price, :reserve_price, :quantity, :description, :created_at

        product_image_ids = []
    
        if product.photos
            product.photos.each do |photo|
                product_image_ids.push(photo.id)
            end 
            json.productImageIds product_image_ids
        end 
    
        if product.bids 
            bid_ids = []
            product.bids.each do |bid|
                bid_ids.push(bid.id)
            end 
            json.bidIds bid_ids
        end 
    end 
end 

if product.photos
    json.productImages do
        product.photos.each do |photo|
            json.set! photo.id do
                json.id  photo.id
                json.imageUrl url_for(photo)
            end 
        end 
    end 
end 

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
            json.extract! product.seller, :id, :username
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