# == Schema Information
#
# Table name: product_images
#
#  id         :bigint(8)        not null, primary key
#  product_id :integer          not null
#  image_url  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
#

class ProductImage < ApplicationRecord
  validates :image_url, presence: true

  belongs_to :product,
    foreign_key: :product_id,
    class_name: :Product
        
end
