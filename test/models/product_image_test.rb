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

require 'test_helper'

class ProductImageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
