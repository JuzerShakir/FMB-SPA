class ThaalisController < ApplicationController
    def index
        @thaalis = Thaali.all
    end
end