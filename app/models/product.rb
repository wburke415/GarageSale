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
#  starting_price        :float
#  bin_price             :float
#  quantity              :integer          default(1), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  description           :text             not null
#  search_string         :string           not null
#  ends_at               :datetime         not null
#

class Product < ApplicationRecord
  validates :title, :condition, :quantity, :search_string, :ends_at, presence: true
  validates :auction, inclusion: { in: [true, false] }
  validates :duration, numericality: { only_integer: true, allow_nil: true }
  validate :ensure_valid_price

  after_initialize :ensure_downcased_search_string

  has_many_attached :photos

  attr_reader :duration

  belongs_to :seller,
    foreign_key: :seller_id,
    class_name: :User

  # belongs_to :buyer,
  #   foreign_key: :buyer_id,
  #   class_name: :User

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

  has_many :product_watches,
    foreign_key: :product_id,
    class_name: :ProductWatch

  has_many :watchers,
    through: :product_watches,
    source: :watcher

  def ensure_downcased_search_string
    self.search_string ||= self.title.downcase
  end

  def ensure_valid_price
    if (self.auction) 
      errors.add('Auctions must have a starting price') unless self.starting_price
    else
      errors.add('Listing must have a price') unless self.bin_price
    end 
  end 

  def duration=(duration)
    @duration = duration
    self.ends_at ||= DateTime.now + self.duration.to_i.days
  end

end
