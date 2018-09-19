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

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
