class Thaali < ApplicationRecord
    enum :size, { small: 0, medium: 1, large: 2 }

    validates_presence_of :owner, :size

    validates :number, uniqueness: true, numericality: { greater_than_or_equal_to: 1 }

    scope :in_sequence, -> { order(number: :asc) }
end
