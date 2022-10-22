class ThaalisController < ApplicationController
    def index
        @thaalis = Thaali.all
        @thaali = Thaali.new
    end

    def new
        @thaali = Thaali.new
    end

    def create
        @thaali = Thaali.new(thaali_params)

        if @thaali.save
            render turbo_stream: [
                turbo_stream.prepend("thaalis", @thaali ),
                turbo_stream.replace("new-thaali-form", partial: "thaalis/form", locals: { thaali: Thaali.new })
            ]
        else
            render turbo_stream: [
                turbo_stream.replace(@thaali, partial: "thaalis/form", locals: { thaali: @thaali } )
            ]
        end
    end

    private
        def thaali_params
            params.require(:thaali).permit(:number, :owner, :size)
        end
end