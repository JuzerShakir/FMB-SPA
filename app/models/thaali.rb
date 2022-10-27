class Thaali < ApplicationRecord
    enum :size, { small: 0, medium: 1, large: 2 }

    validates_presence_of :owner, :size

    validates :number, uniqueness: true, numericality: { greater_than_or_equal_to: 1 }

    validates :owner, format: { with: /\A[a-z .]+\z/i, message: "only alphabets allowed" }

    after_create_commit { broadcast_prepend_to "thaalis" }
    after_update_commit { broadcast_replace_to "thaalis" }
    after_destroy_commit { broadcast_remove_to "thaalis" }

    scope :in_sequence, -> { order(number: :asc) }
    scope :filter_by_owner, -> (owner_name) { where("owner ILIKE ?", "%#{owner_name}%") }
end
