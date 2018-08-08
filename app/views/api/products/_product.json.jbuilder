
json.product do
    json.extract! product, :id, :title, :subtitle, :sku, :condition, :condition_description, :auction, :duration, :starting_price, :bin_price, :reserve_price, :quantity
    product_image_ids = []
    product.product_images.each do |image|
        product_image_ids.push(image.id)
    end 
    json.productImageIds product_image_ids
    # will need to add foreign keys of other tables in the future
end 

json.productImages do
    product.product_images.each do |image|
        json.set! image.id do
            json.productId image.product_id
            json.imageUrl image.image_url
        end 
    end 
end 