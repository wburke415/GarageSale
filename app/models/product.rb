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
#  title                 :string           not null
#  subtitle              :string
#  sku                   :string
#  condition             :string           not null
#  condition_description :string
#  auction               :boolean          default(TRUE), not null
#  duration              :integer          default(7), not null
#  starting_price        :float            not null
#  bin_price             :float
#  reserve_price         :float
#  quantity              :integer          default(1), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  description           :text             not null
#  sold                  :boolean          default(FALSE), not null
#  buyer_id              :integer
#  search_string         :string           not null
#

class Product < ApplicationRecord
    validates :title, :condition, :duration, :starting_price, :quantity, presence: true
    validates :auction, inclusion: { in: [true, false] }

    after_initialize :ensure_downcased_search_string

    has_many_attached :photos

    belongs_to :seller,
        foreign_key: :seller_id,
        class_name: :User

    # belongs_to :category,
    #     foreign_key: :category_id,
    #     class_name: :Category

    # belongs_to :payment_policy,
    #     foreign_key: :payment_policy_id,
    #     class_name: :PaymentPolicy

    belongs_to :shipping_policy,
        foreign_key: :shipping_policy_id,
        class_name: :ShippingPolicy

    # belongs_to :return_policy,
    #     foreign_key: :return_policy_id,
    #     class_name: :ReturnPolicy

    has_one :location,
        through: :shipping_policy,
        source: :location

    has_many :product_images,
        foreign_key: :product_id,
        class_name: :ProductImage

    has_many :bids,
        foreign_key: :product_id,
        class_name: :Bid

    def ensure_downcased_search_string
        self.search_string ||= self.title.downcase
    end

end
