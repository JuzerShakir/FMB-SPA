class Thaali < ApplicationRecord
    enum :size, { small: 0, medium: 1, large: 2 }
end
