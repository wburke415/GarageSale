# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  firstname       :string           not null
#  lastname        :string           not null
#  username        :string           not null
#  email           :string           not null
#  business        :boolean          default(FALSE), not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
