# == Schema Information
#
# Table name: shipping_policies
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  location_id   :integer          not null
#  shipping_cost :float            default(3.5), not null
#  service       :string           default("Standard Shipping"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class ShippingPolicy < ApplicationRecord
    validates :shipping_cost, :service, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :location,
        foreign_key: :location_id,
        class_name: :Location
        
end
