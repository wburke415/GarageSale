@products.each do |product|
    json.partial! "api/products/product", product: product, action: 'index'
end