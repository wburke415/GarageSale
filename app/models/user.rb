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

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && valid_password?(password)
    user
  end


  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save
    self.session_token
  end

  private

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

  def generate_unique_session_token
    loop do
      token = SecureRandom.urlsafe_base64(16)
      return token if User.where(session_token: token).length == 0
    end
  end

end
