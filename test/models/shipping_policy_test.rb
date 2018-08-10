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

require 'test_helper'

class ShippingPolicyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
