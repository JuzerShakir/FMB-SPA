class Thaali < ApplicationRecord
    enum :size, { small: 0, medium: 1, large: 2 }

    validates_presence_of :number, :owner, :size

    validates :number, uniqueness: true
end
