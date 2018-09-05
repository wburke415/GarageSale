@products.each do |product|
  json.set! product.id do 
    json.extract! product, :title
  end 
end