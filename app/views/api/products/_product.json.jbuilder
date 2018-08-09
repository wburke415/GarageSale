
json.product do
    json.extract! product, :id, :title, :subtitle, :sku, :condition, :condition_description, :auction, :duration, :starting_price, :bin_price, :reserve_price, :quantity, :created_at
    product_image_ids = []
    product.product_images.each do |image|
        product_image_ids.push(image.id)
    end 
    json.productImageIds product_image_ids

    bid_ids = []
    product.bids.each do |bid|
        bid_ids.push(bid.id)
    end 
    json.bidIds bid_ids
    # will need to add foreign keys of other tables in the future
end 

json.productImages do
    product.product_images.each do |image|
        json.set! image.id do
            json.extract! image, :id, :product_id, :image_url
            # json.productId image.product_id
            # json.imageUrl image.image_url
        end 
    end 
end 

json.bids do
    product.bids.each do |bid|
        json.set! bid.id do
            json.extract! bid, :id, :product_id, :buyer_id, :bid
            # json.productId bid.product_id
            # json.buyerId bid.buyer_id
            # json.bid bid.bid
        end 
    end 
end 