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

require 'test_helper'

class BidTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
