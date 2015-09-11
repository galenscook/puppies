class User < ActiveRecord::Base
  has_many :hearts
  has_many :photos, through: :hearts

  validates :username, presence: true,
                       uniqueness: true
  validates :password, presence: true,
                       length: { minimum: 5 },
                       confirmation: true
end
