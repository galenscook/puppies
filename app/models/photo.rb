class Photo < ActiveRecord::Base
  has_many :hearts
  has_many :users, through: :hearts

  validates :url, presence: true, uniqueness: true

  def heart_count
    self.hearts.count
  end
end
