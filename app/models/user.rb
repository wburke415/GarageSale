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

class User < ApplicationRecord
  validates :firstname, :lastname, :password_digest, presence: true
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :business, inclusion: { in: [true, false] }
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token, :ensure_username

  attr_reader :password

  has_many :bids,
    foreign_key: :buyer_id,
    class_name: :Bid

  has_many :listed_products,
    foreign_key: :seller_id,
    class_name: :Product

  has_many :purchased_products,
    foreign_key: :buyer_id,
    class_name: :Product

  has_many :shipping_policies,
    foreign_key: :user_id,
    class_name: :ShippingPolicy

  has_many :locations,
    foreign_key: :user_id,
    class_name: :Location

  has_many :bidded_products,
    through: :bids,
    source: :product

  def self.find_by_credentials(emailOrUsername, password)
    user = (User.find_by(email: emailOrUsername) || User.find_by(username: emailOrUsername))
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save
    self.session_token
  end

  def ensure_username
    self.username ||= generate_unique_username
  end

  private

  def generate_unique_username
    prefix = self.firstname.slice(0,3).downcase + self.lastname.slice(0,3).downcase

    loop do
      suffix = rand(10 ** 4).to_s
      username = prefix + suffix
      return username if User.where(username: self.username).empty?
    end
  end

  def generate_unique_session_token
    loop do
      token = SecureRandom.urlsafe_base64(16)
      return token if User.where(session_token: token).empty?
    end
  end

end
