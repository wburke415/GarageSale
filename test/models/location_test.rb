# == Schema Information
#
# Table name: locations
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  country    :string           default("United States"), not null
#  state      :string           default("California"), not null
#  city       :string           default("San Francisco"), not null
#  address    :string           default("422 Not A Real Avenue"), not null
#  zip_code   :string           default("94111"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class LocationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
