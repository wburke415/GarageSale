# == Schema Information
#
# Table name: products
#
#  id                    :bigint(8)        not null, primary key
#  seller_id             :integer          not null
#  category_id           :integer          not null
#  payment_policy_id     :integer          not null
#  shipping_policy_id    :integer          not null
#  return_policy_id      :integer          not null
#  location_id           :integer          not null
#  title                 :string           not null
#  subtitle              :string
#  sku                   :string
#  condition             :integer          not null
#  condition_description :string
#  auction               :boolean          default(TRUE), not null
#  duration              :integer          default(7), not null
#  starting_price        :float            not null
#  bin_price             :float
#  reserve_price         :float
#  quantity              :integer          default(1), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Product < ApplicationRecord
    validates :title, :condition, :duration, :starting_price, :quantity, presence: true
    validates :auction, inclusion: { in: [true, false] }

    belongs_to :seller,
        foreign_key: :seller_id,
        class_name: :User

    # belongs_to :category,
    #     foreign_key: :category_id,
    #     class_name: :Category

    # belongs_to :payment_policy,
    #     foreign_key: :payment_policy_id,
    #     class_name: :PaymentPolicy

    # belongs_to :shipping_policy,
    #     foreign_key: :shipping_policy_id,
    #     class_name: :ShippingPolicy

    # belongs_to :return_policy,
    #     foreign_key: :return_policy_id,
    #     class_name: :ReturnPolicy

    # belongs_to :location,
    #     foreign_key: :location_id,
    #     class_name: :Location

end
