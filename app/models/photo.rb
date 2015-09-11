class Photo < ActiveRecord::Base
  has_many :hearts
  has_many :users, through: :hearts
end
