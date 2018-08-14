# == Schema Information
#
# Table name: bids
#
#  id         :bigint(8)        not null, primary key
#  product_id :integer          not null
#  bid        :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  buyer_id   :integer          not null
#

class Bid < ApplicationRecord
    validates :bid, presence: true
    validate :ensure_highest_bid

    belongs_to :product,
        foreign_key: :product_id,
        class_name: :Product

    belongs_to :buyer,
        foreign_key: :buyer_id,
        class_name: :User

    def ensure_highest_bid
        bid = Bid.where('product_id = ?', self.product_id).order('bid DESC').limit(1).select('bid')

        if bid[0] && bid[0].bid >= self.bid
            errors.add(:bid, 'Bid must be higher than the previous bid')
        end 
    end

end
