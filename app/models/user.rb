require 'bcrypt'

class User < ActiveRecord::Base
  has_many :hearts
  has_many :comments
  has_many :photos, through: :comments
  has_many :photos, through: :hearts

  validates :username, presence: true,
                       uniqueness: true
  validates :password, presence: true,
                       length: { minimum: 5 },
                       confirmation: true

  def password
    @password ||= BCrypt::Password.new(encrypted_password)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.encrypted_password = @password
  end

  def authenticate(entered_password)
    self.password == entered_password
  end
end
