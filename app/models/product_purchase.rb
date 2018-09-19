# == Schema Information
#
# Table name: product_purchases
#
#  id         :bigint(8)        not null, primary key
#  product_id :integer          not null
#  buyer_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProductPurchase < ApplicationRecord
  validates :product_id, :buyer_id, presence: true

  belongs_to :product,
    foreign_key: :product_id,
    class_name: :Product

  belongs_to :buyer,
    foreign_key: :buyer_id,
    class_name: :User
end
