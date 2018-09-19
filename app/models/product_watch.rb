class ProductWatch < ApplicationRecord
  
  belongs_to :product,
    foreign_key: :product_id,
    class_name: :Product

  belongs_to :watcher,
    foreign_key: :watcher_id,
    class_name: :User
end